import { render, screen, waitFor } from '@testing-library/react';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { MapContainer } from 'react-leaflet';

import RoutingControl from 'components/RoutingControl/RoutingControl';

import { setupFakeGeolocationSuccess } from './fakes/geolocation';
import * as reverseResponse from './fakes/reverse-response.json';

describe('RoutingControl', () => {
  let server;

  const setupFakeServer = () => {
    server = sinon.fakeServer.create();

    server.respondWith('GET', /\/reverse\/\?lat=48.8554966&lon=2.3522295/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(reverseResponse),
    ]);
  };

  const setup = () => {
    setupFakeServer();

    document.body.innerHTML = '';

    setupFakeGeolocationSuccess();

    const geocoder = L.Control.Geocoder.photon({
      serviceUrl: `/api/`,
      reverseUrl: `/reverse/`,
    });

    const geolocator = (map, callback) => {
      map.on('locationfound', (e) => callback(e.latlng));
      map.locate({ setView: true, maxZoom: 16 });
    };

    const utils = render(
      <MapContainer center={[48.01, 2.55]} zoom={13} renderer={new L.SVG()}>
        <RoutingControl
          router={undefined}
          geocoder={geocoder}
          geolocator={geolocator}
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

  it('should geolocate start point', async () => {
    setup();

    server.respond();

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
        "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
      );
    });
    expect(screen.getByAltText('Marker')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('End')).toHaveDisplayValue('');
  });

  it('should call geocoding (reverse)', () => {
    setup();

    server.respond();

    expect(server.requests).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 200,
          url: expect.stringMatching('lat=48.8554966&lon=2.3522295'),
        }),
      ])
    );
  });
});
