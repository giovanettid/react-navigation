import PropTypes from 'prop-types';

import 'components/Application.scss';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { useState } from 'react';

function Application({ configuration }) {
  const [state] = useState(configuration());

  const {
    center, initialZoom, urlTilesTemplate, attribution,
  } = state;

  return (
    <MapContainer center={center} zoom={initialZoom} scrollWheelZoom={false}>
      <TileLayer
        url={urlTilesTemplate}
        attribution={attribution}
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

Application.propTypes = {
  configuration: PropTypes.func.isRequired,
};

export default Application;
