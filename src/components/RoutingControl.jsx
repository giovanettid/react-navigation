import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

import { createControlComponent } from '@react-leaflet/core';

const createRoutineMachineControl = ({
  routingServiceUrl,
  geocodingServiceUrl,
  waypoints,
}) => {
  const createMarker = (i, waypoint) =>
    L.marker(waypoint.latLng, {
      alt: `${i === 0 ? 'start' : 'end'} way point`,
    });

  const geocoder = L.Control.Geocoder.photon({
    serviceUrl: `${geocodingServiceUrl}/api/`,
    reverseUrl: `${geocodingServiceUrl}/reverse/`,
  });

  return L.Routing.control({
    serviceUrl: routingServiceUrl,
    waypoints,
    geocoder,
    createMarker,
  });
};

const RoutingControl = createControlComponent(createRoutineMachineControl);

export default RoutingControl;
