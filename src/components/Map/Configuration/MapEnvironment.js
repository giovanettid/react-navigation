export default class MapEnvironment {
  constructor() {
    this.urlTilesTemplate =
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    this.routingServiceUrl = 'https://router.project-osrm.org/route/v1';
    this.geocodingServiceUrl = 'https://photon.komoot.io';
  }
}
