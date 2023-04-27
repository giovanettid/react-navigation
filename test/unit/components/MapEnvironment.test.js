import MapEnvironment from 'components/Map/Configuration/MapEnvironment';

describe('MapEnvironment', () => {
  const environment = new MapEnvironment();

  describe('new instance', () => {
    it('property urlTilesTemplate contains openstreetmap placeholders', () => {
      expect(environment.urlTilesTemplate).toBe('/{s}/tile/{z}/{x}/{y}.png');
    });

    it('property attribution is openstreetmap copyright', () => {
      expect(environment.attribution).toBe(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      );
    });

    it('property routingServiceUrl to be empty', () => {
      expect(environment.routingServiceUrl).toBe('');
    });

    it('property geocodingServiceUrl to be empty', () => {
      expect(environment.geocodingServiceUrl).toBe('');
    });
  });
});
