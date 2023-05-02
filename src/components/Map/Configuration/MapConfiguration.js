import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

const bikeProfile = 'bike';
const isBikeProfile = (pathname) => pathname?.split('/')[1] === bikeProfile;
export default class MapConfiguration {
  constructor(pathname) {
    this.center = L.latLng(48.856, 2.352);
    this.initialZoom = 13;
    this.renderer = L.svg() ?? new L.SVG();

    this.urlTilesTemplate = '/{s}/tile/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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
