import L from 'leaflet';

import MapConfiguration from 'components/Map/Configuration/MapConfiguration';
import MapEnvironment from 'components/Map/Configuration/MapEnvironment';

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

    it('property environment is instance of MapEnvironment', () => {
      expect(configuration.environment).toBeInstanceOf(MapEnvironment);
    });
  });
});
