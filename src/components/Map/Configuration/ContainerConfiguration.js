import L from 'leaflet';

export default class ContainerConfiguration {
  constructor() {
    this.center = L.latLng(48.856, 2.352);
    this.zoom = 13;
    this.renderer = L.svg() ?? new L.SVG();
  }
}
