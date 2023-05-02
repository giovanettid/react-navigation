import L from 'leaflet';
import 'leaflet-control-geocoder';

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

    it('property geocoder is instance of Photon', () => {
      expect(configuration.geocoder).toBeInstanceOf(L.Control.Geocoder.Photon);
    });

    it('geocoder options contains service and reverse apis', () => {
      expect(configuration.geocoder.options).toEqual(
        expect.objectContaining({
          serviceUrl: `/api/`,
          reverseUrl: `/reverse/`,
        })
      );
    });

    it('property router is undefined', () => {
      expect(configuration.router).toBeUndefined();
    });
  });
});
