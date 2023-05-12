import 'leaflet-defaulticon-compatibility';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import RoutingControl from 'components/RoutingControl/RoutingControl';

import './Map.scss';

const geolocator = (map, controlCallback) => {
  map.on('locationfound', (e) => controlCallback(e.latlng));
  map.on('locationerror', (e) => alert(e.message));

  map.locate({ setView: true, maxZoom: 16 });
};

function Map({ configuration }) {
  const [state] = useState(configuration());

  const { container, layer, control } = state;

  return (
    <MapContainer
      center={container.center}
      zoom={container.zoom}
      renderer={container.renderer}
      scrollWheelZoom={false}
    >
      <TileLayer url={layer.url} attribution={layer.attribution} />
      <RoutingControl
        router={control.router}
        geocoder={control.geocoder}
        geolocator={geolocator}
      />
    </MapContainer>
  );
}

Map.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Map;
