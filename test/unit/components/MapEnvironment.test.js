import MapEnvironment from 'components/MapEnvironment';

describe('MapEnvironment', () => {
  const environment = new MapEnvironment();

  describe('new instance', () => {
    it('property urlTilesTemplate is public openstreetmap template', () => {
      expect(environment.urlTilesTemplate).toBe(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      );
    });

    it('property attribution is openstreetmap copyright', () => {
      expect(environment.attribution).toBe(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      );
    });

    it('property routingServiceUrl to be osrm url', () => {
      expect(environment.routingServiceUrl).toBe(
        'https://router.project-osrm.org/route/v1'
      );
    });

    it('property geocodingServiceUrl to be photon url', () => {
      expect(environment.geocodingServiceUrl).toBe('https://photon.komoot.io');
    });
  });
});
