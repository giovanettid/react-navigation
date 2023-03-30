export default class Configuration {
  constructor() {
    this.center = [48.856, 2.352];
    this.initialZoom = 13;
    this.urlTilesTemplate =
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  }
}
