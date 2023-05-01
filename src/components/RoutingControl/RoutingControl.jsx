import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';

const createRoutineMachineControl = ({ waypoints }) => {
  const createMarker = (i, waypoint) =>
    L.marker(waypoint.latLng, {
      alt: `${i === 0 ? 'start' : 'end'} way point`,
    });

  const geocoder = L.Control.Geocoder.photon({
    serviceUrl: `/api/`,
    reverseUrl: `/reverse/`,
  });

  return L.Routing.control({
    serviceUrl: '',
    waypoints,
    geocoder,
    createMarker,
  });
};

const RoutingControl = createControlComponent(createRoutineMachineControl);

export default RoutingControl;
