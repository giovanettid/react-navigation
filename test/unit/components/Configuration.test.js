import L from 'leaflet';

import Configuration from 'components/Configuration';

describe('Configuration', () => {
  const configuration = new Configuration();

  describe('new instance', () => {
    it('property center to be Paris latitude, longitude', () => {
      expect(configuration.center).toEqual({ lat: 48.856, lng: 2.352 });
    });

    it('property initialZoom is 13', () => {
      expect(configuration.initialZoom).toBe(13);
    });

    it('property renderer is instance of SVG renderer', () => {
      expect(configuration.renderer).toBeInstanceOf(L.SVG);
    });

    it('property urlTilesTemplate is public openstreetmap template', () => {
      expect(configuration.urlTilesTemplate).toBe(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      );
    });

    it('property attribution is openstreetmap copyright', () => {
      expect(configuration.attribution).toBe(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      );
    });

    it('property routingServiceUrl to be osrm url', () => {
      expect(configuration.routingServiceUrl).toBe(
        'https://router.project-osrm.org/route/v1'
      );
    });

    it('property geocodingServiceUrl to be photon url', () => {
      expect(configuration.geocodingServiceUrl).toBe(
        'https://photon.komoot.io'
      );
    });
  });
});
