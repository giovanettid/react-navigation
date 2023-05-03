import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';

const createRoutineMachineControl = ({ router, geocoder, waypoints }) => {
  const createMarker = (i, waypoint) =>
    L.marker(waypoint.latLng, {
      alt: `${i === 0 ? 'start' : 'end'} way point`,
    });

  return L.Routing.control({
    serviceUrl: '',
    router,
    waypoints,
    geocoder,
    createMarker,
  });
};

const RoutingControl = createControlComponent(createRoutineMachineControl);

export default RoutingControl;
