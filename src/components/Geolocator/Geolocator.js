export default (maxZoom) => (map, controlCallback) => {
  map.on('locationfound', (e) => controlCallback(e.latlng));
  map.on('locationerror', (e) => alert(e.message));

  map.locate({ setView: true, maxZoom });
};
