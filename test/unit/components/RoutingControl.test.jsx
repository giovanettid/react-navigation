import L from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { render, screen, waitFor } from '@testing-library/react';

import RoutingControl from 'components/RoutingControl';

import * as routingResponse from './routing-response.json';
import * as reverseStartResponse from './reverse-start-response.json';
import * as reverseEndResponse from './reverse-end-response.json';

describe('RoutingControl', () => {
  let server;

  const setupFakeServer = () => {
    server = sinon.fakeServer.create();

    server.respondWith('GET', /\/driving\//, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(routingResponse),
    ]);

    server.respondWith('GET', /\/reverse\/\?lat=48.01&lon=2.54/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(reverseStartResponse),
    ]);

    server.respondWith('GET', /\/reverse\/\?lat=48.02&lon=2.56/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(reverseEndResponse),
    ]);
  };

  const setup = (waypoints) => {
    setupFakeServer();

    document.body.innerHTML = '';

    const utils = render(
      <MapContainer center={[48.01, 2.55]} zoom={13} renderer={new L.SVG()}>
        <RoutingControl
          routingServiceUrl="http://localhost"
          geocodingServiceUrl="http://localhost"
          waypoints={waypoints}
        />
      </MapContainer>
    );

    return {
      ...utils,
    };
  };

  afterEach(() => {
    server.restore();
    sinon.restore();
  });

  describe('when pass waypoints', () => {
    const waypoints = [
      [48.01, 2.54],
      [48.02, 2.56],
    ];

    it('should display start and end markers', () => {
      setup(waypoints);

      server.respond();

      expect(screen.getByAltText('start way point')).toBeInTheDocument();
      expect(screen.getByAltText('end way point')).toBeInTheDocument();
    });

    it('should reverse way points', async () => {
      setup(waypoints);

      server.respond();

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
          'Rue de la Santé, Paris, Île-de-France, France'
        );
      });
      expect(screen.getByPlaceholderText('End')).toHaveDisplayValue(
        "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
      );
    });

    it('should call geocooding (reverse) and routing services', () => {
      setup(waypoints);

      server.respond();

      expect(server.requests).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status: 200,
            url: expect.stringMatching('lat=48.01&lon=2.54'),
          }),
          expect.objectContaining({
            status: 200,
            url: expect.stringMatching('lat=48.02&lon=2.56'),
          }),
          expect.objectContaining({
            status: 200,
            url: expect.stringMatching('2.54,48.01;2.56,48.02'),
          }),
        ])
      );
    });
  });

  describe('when no waypoints', () => {
    it('should display start and end placeholders with empty inputs', () => {
      setup();

      expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue('');
      expect(screen.getByPlaceholderText('End')).toHaveDisplayValue('');
    });
  });
});
