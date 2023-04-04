import { MapContainer } from 'react-leaflet';
import L from 'leaflet';

import { render, screen } from '@testing-library/react';

import RoutingControl from 'components/RoutingControl';

import * as routingResponse from './routing-response.json';

describe('RoutingControl', () => {
  let server;

  const setup = () => {
    const utils = render(
      <MapContainer center={[48, 2.5]} zoom={13} renderer={new L.SVG()}>
        <RoutingControl
          serviceUrl="http://localhost"
          start={[48, 2.5]}
          end={[49, 2.6]}
        />
      </MapContainer>
    );

    return {
      ...utils,
    };
  };

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    server.respondWith('GET', /\/driving\//, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(routingResponse),
    ]);
  });

  afterEach(() => {
    server.restore();
    sinon.restore();
  });

  it('should display start and end markers', () => {
    setup();

    expect(screen.getByAltText('start way point')).toBeInTheDocument();
    expect(screen.getByAltText('end way point')).toBeInTheDocument();
  });

  it('should call routing service', () => {
    setup();

    expect(server.requests).toHaveLength(1);
    expect(server.requests[0].status).toBe(200);
    expect(server.requests[0].url).toContain('2.5,48;2.6,49');
  });
});
