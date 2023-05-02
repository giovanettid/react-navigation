import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

const bikeProfile = 'bike';
const isBikeProfile = (pathname) => pathname?.split('/')[1] === bikeProfile;
export default class ControlConfiguration {
  constructor(pathname) {
    this.router = isBikeProfile(pathname)
      ? new L.Routing.GraphHopper(undefined, {
          serviceUrl: '/route',
          urlParameters: { profile: bikeProfile },
        })
      : undefined;
    this.geocoder = L.Control.Geocoder.photon({
      serviceUrl: `/api/`,
      reverseUrl: `/reverse/`,
    });
  }
}
