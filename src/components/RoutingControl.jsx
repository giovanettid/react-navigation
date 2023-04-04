import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineControl = ({ serviceUrl, start, end }) => {
  const createMarker = (i, waypoint) =>
    L.marker(waypoint.latLng, {
      alt: `${i === 0 ? 'start' : 'end'} way point`,
    });

  return L.Routing.control({
    serviceUrl,
    plan: L.Routing.plan([start, end], { createMarker }),
  });
};

const RoutingControl = createControlComponent(createRoutineMachineControl);

export default RoutingControl;
