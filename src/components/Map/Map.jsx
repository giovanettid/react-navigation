import { useState } from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

import RoutingControl from 'components/RoutingControl/RoutingControl';

import './Map.scss';

function Map({ configuration }) {
  const [state] = useState(configuration());

  const { center, initialZoom, renderer, environment } = state;

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      scrollWheelZoom={false}
      renderer={renderer}
    >
      <TileLayer
        url={environment.urlTilesTemplate}
        attribution={environment.attribution}
      />
      <RoutingControl
        routingServiceUrl={environment.routingServiceUrl}
        geocodingServiceUrl={environment.geocodingServiceUrl}
      />
    </MapContainer>
  );
}

Map.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Map;
