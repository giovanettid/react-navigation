import L from 'leaflet';

import MapEnvironment from './MapEnvironment';

export default class MapConfiguration {
  constructor() {
    this.center = L.latLng(48.856, 2.352);
    this.initialZoom = 13;
    this.renderer = L.svg() ?? new L.SVG();

    this.environment = new MapEnvironment();
  }
}
