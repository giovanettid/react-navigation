import { useState } from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

import RoutingControl from './RoutingControl';

import './Application.scss';

function Application({ configuration }) {
  const [state] = useState(configuration());

  const {
    center,
    initialZoom,
    renderer,
    urlTilesTemplate,
    attribution,
    routingServiceUrl,
    end,
  } = state;

  return (
    <MapContainer
      center={center}
      zoom={initialZoom}
      scrollWheelZoom={false}
      renderer={renderer}
    >
      <TileLayer url={urlTilesTemplate} attribution={attribution} />
      <RoutingControl serviceUrl={routingServiceUrl} start={center} end={end} />
    </MapContainer>
  );
}

Application.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Application;
