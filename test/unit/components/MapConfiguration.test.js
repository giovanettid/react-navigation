import L from 'leaflet';

import MapConfiguration from 'components/Map/Configuration/MapConfiguration';

describe('MapConfiguration', () => {
  const configuration = new MapConfiguration();

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

    it('property urlTilesTemplate contains openstreetmap placeholders', () => {
      expect(configuration.urlTilesTemplate).toBe('/{s}/tile/{z}/{x}/{y}.png');
    });

    it('property attribution is openstreetmap copyright', () => {
      expect(configuration.attribution).toBe(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      );
    });
  });
});
