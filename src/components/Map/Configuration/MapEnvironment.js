export default class MapEnvironment {
  constructor() {
    this.urlTilesTemplate = '/{s}/tile/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    this.routingServiceUrl = '';
    this.geocodingServiceUrl = '';
  }
}
