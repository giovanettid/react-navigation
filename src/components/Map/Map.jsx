import 'leaflet-defaulticon-compatibility';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import RoutingControl from 'components/RoutingControl/RoutingControl';

import './Map.scss';

function Map({ configuration }) {
  const [state] = useState(configuration());

  const {
    center,
    initialZoom,
    renderer,
    urlTilesTemplate,
    attribution,
    router,
    geocoder,
  } = state;

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      scrollWheelZoom={false}
      renderer={renderer}
    >
      <TileLayer url={urlTilesTemplate} attribution={attribution} />
      <RoutingControl router={router} geocoder={geocoder} />
    </MapContainer>
  );
}

Map.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Map;
