import L from 'leaflet';

export default class Configuration {
  constructor() {
    this.center = L.latLng(48.856, 2.352);
    this.initialZoom = 13;
    this.renderer = L.svg() ?? new L.SVG();

    this.urlTilesTemplate =
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    this.routingServiceUrl = 'https://router.project-osrm.org/route/v1';
    this.geocodingServiceUrl = 'https://photon.komoot.io';
  }
}
