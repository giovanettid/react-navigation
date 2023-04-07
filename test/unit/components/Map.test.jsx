import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Map from 'components/Map';
import MapConfiguration from 'components/MapConfiguration';

import * as routingResponse from './fakes/routing-response.json';
import * as searchStartResponse from './fakes/search-start-response.json';
import * as searchEndResponse from './fakes/search-end-response.json';

describe('Map', () => {
  let server;

  const setupFakeServer = () => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    server.respondWith('GET', /\/driving\//, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(routingResponse),
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
  };

  const setup = () => {
    const configuration = new MapConfiguration();
    configuration.routingServiceUrl = 'http://localhost';
    configuration.geocodingServiceUrl = 'http://localhost';
    configuration.urlTilesTemplate = 'https://{s}.localhost/{z}/{x}/{y}.png';

    setupFakeServer();

    document.body.innerHTML = '';

    const user = userEvent.setup();
    const utils = render(<Map configuration={() => ({ ...configuration })} />);

    return {
      ...utils,
      user,
    };
  };

  afterEach(() => {
    server.restore();
    sinon.restore();
  });

  describe('startup display', () => {
    it('should display zoom', () => {
      setup();

      expect(screen.getByTitle('Zoom in')).toBeInTheDocument();
      expect(screen.getByTitle('Zoom out')).toBeInTheDocument();
    });

    it('should display attribution layer', () => {
      setup();

      expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
    });

    it('should display start and end placeholders', () => {
      setup();

      expect(screen.getByPlaceholderText('Start')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End')).toBeInTheDocument();
    });
  });

  describe('user type itinerary', () => {
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

    it('should geocode inputs search and display route', async () => {
      // Given
      const { user } = setup();

      // When
      await typeAndSelectGeocodeResult(
        user,
        'Start',
        'quai',
        "Quai de l'Hôtel de Ville"
      );
      // Then display result instead of placeholder
      expect(screen.getByPlaceholderText('Start')).toHaveDisplayValue(
        "Quai de l'Hôtel de Ville, Paris, Île-de-France, France"
      );

      // When
      await typeAndSelectGeocodeResult(user, 'End', 'sant', 'Rue de la Santé');
      // Then display result instead of placeholder
      expect(screen.getByPlaceholderText('End')).toHaveDisplayValue(
        'Rue de la Santé, Paris, Île-de-France, France'
      );

      // And finally display itinerary and markers
      await waitFor(() => {
        expect(
          screen.getAllByText('You have arrived at your destination', {
            exact: false,
          })
        ).toHaveLength(2); // 1 visible + 1 alternative
      });
      expect(
        screen.getAllByAltText('way point', { exact: false })
      ).toHaveLength(2);
    });

    it('should call geocooding and routing services', async () => {
      // Given
      const { user } = setup();

      // When
      await typeAndSelectGeocodeResult(
        user,
        'Start',
        'quai',
        "Quai de l'Hôtel de Ville"
      );
      await typeAndSelectGeocodeResult(user, 'End', 'sant', 'Rue de la Santé');

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
});
