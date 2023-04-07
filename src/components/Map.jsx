import { useState } from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

import RoutingControl from './RoutingControl';

import './Map.scss';

function Map({ configuration }) {
  const [state] = useState(configuration());

  const {
    center,
    initialZoom,
    renderer,
    urlTilesTemplate,
    attribution,
    routingServiceUrl,
    geocodingServiceUrl,
  } = state;

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      scrollWheelZoom={false}
      renderer={renderer}
    >
      <TileLayer url={urlTilesTemplate} attribution={attribution} />
      <RoutingControl
        routingServiceUrl={routingServiceUrl}
        geocodingServiceUrl={geocodingServiceUrl}
      />
    </MapContainer>
  );
}

Map.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Map;
