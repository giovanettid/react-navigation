import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import ControlConfiguration from 'components/Map/Configuration/ControlConfiguration';

describe('ControlConfiguration', () => {
  const configuration = new ControlConfiguration('/bike');

  describe('new instance', () => {
    describe('path /bike', () => {
      it('property router is instance of GraphHopper', () => {
        expect(configuration.router).toBeInstanceOf(L.Routing.GraphHopper);
      });

      it('router options contains service and urlParameters', () => {
        expect(configuration.router.options).toEqual(
          expect.objectContaining({
            serviceUrl: '/route',
            urlParameters: { profile: 'bike', algorithm: 'alternative_route' },
          })
        );
      });
    });

    describe('other paths', () => {
      it('property router is undefined(default osrm)', () => {
        expect(new ControlConfiguration('/').router).toBeUndefined();
        expect(new ControlConfiguration('').router).toBeUndefined();
        expect(new ControlConfiguration().router).toBeUndefined();
      });
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
  });
});
