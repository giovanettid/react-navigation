import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MapConfiguration from 'components/Map/Configuration/MapConfiguration';
import Map from 'components/Map/Map';

import * as graphhopperRoutingResponse from './fakes/graphhopper-routing-response.json';
import * as osrmRoutingResponse from './fakes/osrm-routing-response.json';
import * as reverseResponse from './fakes/reverse-response.json';
import * as searchEndResponse from './fakes/search-end-response.json';
import * as searchStartResponse from './fakes/search-start-response.json';

describe('Map', () => {
  let server;

  const sandbox = sinon.createSandbox();

  const setupFakeServer = () => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    server.respondWith('GET', /\/driving\//, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(osrmRoutingResponse),
    ]);

    server.respondWith('GET', /\/route/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(graphhopperRoutingResponse),
    ]);

    server.respondWith('GET', /\/api\/\?q=quai/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(searchStartResponse),
    ]);

    server.respondWith('GET', /\/api\/\?q=sant/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(searchEndResponse),
    ]);

    server.respondWith('GET', /\/reverse\/\?lat=48.8554966&lon=2.3522295/, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(reverseResponse),
    ]);
  };

  const setupFakeGeolocationSuccess = () => {
    navigator.geolocation = {
      getCurrentPosition: (successCallback) => {
        const position = {
          coords: {
            latitude: 48.8554966,
            longitude: 2.3522295,
            accuracy: 5,
          },
        };
        successCallback(position);
      },
    };
  };

  const setupFakeGeolocationError = () => {
    navigator.geolocation = {
      getCurrentPosition: (successCallback, errorCallback) => {
        errorCallback(new Error('geolocation error'));
      },
    };
  };

  const setupMap = (path) => {
    document.body.innerHTML = '';

    const user = userEvent.setup();
    const utils = render(
      <Map configuration={() => ({ ...new MapConfiguration(path) })} />
    );

    return {
      ...utils,
      user,
    };
  };

  beforeEach(() => {
    setupFakeServer();
    setupFakeGeolocationSuccess();
  });

  afterEach(() => {
    server.restore();
    sandbox.restore();
    sinon.restore();
  });

  describe('startup display', () => {
    it('should display zoom', () => {
      setupMap();

      expect(screen.getByTitle('Zoom in')).toBeInTheDocument();
      expect(screen.getByTitle('Zoom out')).toBeInTheDocument();
    });

    it('should display attribution layer', () => {
      setupMap();

      expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
    });

    it('should display start and end placeholders', () => {
      setupMap();

      expect(screen.getByPlaceholderText('Start')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End')).toBeInTheDocument();
    });
  });

  describe('itinerary', () => {
    const typeAndSelectGeocodeResult = async (
      user,
      placeholder,
      search,
      suggest
    ) => {
      await user.type(screen.getByPlaceholderText(placeholder), search);
      await screen.findByText(suggest, { exact: false });
      await user.click(screen.getByText(suggest, { exact: false }));
    };

    const startItinerary = (user) =>
      typeAndSelectGeocodeResult(
        user,
        'Start',
        'quai',
        "Quai de l'Hôtel de Ville"
      );

    const endItinerary = (user) =>
      typeAndSelectGeocodeResult(user, 'End', 'sant', 'Rue de la Santé');

    const expectItineraryAndMarkers = async () => {
      await waitFor(() => {
        expect(
          screen.getAllByText('You have arrived at your destination', {
            exact: false,
          })
        ).toHaveLength(2); // 1 visible + 1 alternative
      });
      expect(screen.getAllByAltText('Marker')).toHaveLength(2);
    };

    describe('geolocate start, type end', () => {
      it('should display route', async () => {
        // Given
        const { user } = setupMap();

        // Display geolocation result instead of placeholder
        await waitFor(() => {
          expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
            "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
          );
        });

        // When
        await endItinerary(user);
        // Then display result instead of placeholder
        expect(screen.getByPlaceholderText('End')).toHaveDisplayValue(
          'Rue de la Santé, Paris, Île-de-France, France'
        );

        await expectItineraryAndMarkers();
      });

      it('should call geocoding and routing services', async () => {
        // Given
        const { user } = setupMap();

        // When
        await waitFor(() => {
          expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
            "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
          );
        });
        await endItinerary(user);

        // Then
        expect(server.requests).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              status: 200,
              url: expect.stringMatching('lat=48.8554966&lon=2.3522295'),
            }),
            expect.objectContaining({
              status: 200,
              url: expect.stringMatching('q=sant'),
            }),
            expect.objectContaining({
              status: 200,
              url: expect.stringMatching(
                '2.3522295,48.8554966;2.3415773,48.8346507'
              ),
            }),
          ])
        );
      });

      describe('geolocation error', () => {
        it('should display alert', () => {
          const spyAlert = sandbox.spy(window, 'alert');

          setupFakeGeolocationError();
          setupMap();

          expect(spyAlert).toHaveBeenCalledWithMatch('geolocation error');
        });
      });
    });

    describe('type start and end', () => {
      describe('osrm', () => {
        it('should display route', async () => {
          // Given
          const { user } = setupMap();

          // When
          await startItinerary(user);
          // Then display result instead of placeholder
          expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
            "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
          );

          // When
          await endItinerary(user);
          // Then display result instead of placeholder
          expect(screen.getByPlaceholderText('End')).toHaveDisplayValue(
            'Rue de la Santé, Paris, Île-de-France, France'
          );

          await expectItineraryAndMarkers();
        });

        it('should call geocoding and routing services', async () => {
          // Given
          const { user } = setupMap();

          // When
          await startItinerary(user);
          await endItinerary(user);

          // Then
          expect(server.requests).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                status: 200,
                url: expect.stringMatching('q=quai'),
              }),
              expect.objectContaining({
                status: 200,
                url: expect.stringMatching('q=sant'),
              }),
              expect.objectContaining({
                status: 200,
                url: expect.stringMatching(
                  '2.3522295,48.8554966;2.3415773,48.8346507'
                ),
              }),
            ])
          );
        });
      });

      describe('graphhopper', () => {
        it('should display route', async () => {
          // Given
          const { user } = setupMap('/bike');

          // When
          await startItinerary(user);
          await endItinerary(user);

          // Then
          await expectItineraryAndMarkers();
        });

        it('should call routing service', async () => {
          // Given
          const { user } = setupMap('/bike');

          // When
          await startItinerary(user);
          await endItinerary(user);

          // Then
          expect(server.requests).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                status: 200,
                url: expect.stringMatching(
                  'point=48.8554966,2.3522295&point=48.8346507,2.3415773'
                ),
              }),
            ])
          );
        });
      });
    });
  });
});
