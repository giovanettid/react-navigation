import L from 'leaflet';
import 'leaflet-control-geocoder';

export default class MapConfiguration {
  constructor() {
    this.center = L.latLng(48.856, 2.352);
    this.initialZoom = 13;
    this.renderer = L.svg() ?? new L.SVG();

    this.urlTilesTemplate = '/{s}/tile/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    this.router = undefined;
    this.geocoder = L.Control.Geocoder.photon({
      serviceUrl: `/api/`,
      reverseUrl: `/reverse/`,
    });
  }
}
