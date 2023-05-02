import L from 'leaflet';

import ContainerConfiguration from 'components/Map/Configuration/ContainerConfiguration';

describe('ContainerConfiguration', () => {
  const configuration = new ContainerConfiguration();

  describe('new instance', () => {
    it('property center to be Paris latitude, longitude', () => {
      expect(configuration.center).toEqual({
        lat: 48.856,
        lng: 2.352,
      });
    });

    it('property zoom is 13 (initial zoom)', () => {
      expect(configuration.zoom).toBe(13);
    });

    it('property renderer is instance of SVG renderer', () => {
      expect(configuration.renderer).toBeInstanceOf(L.SVG);
    });
  });
});
