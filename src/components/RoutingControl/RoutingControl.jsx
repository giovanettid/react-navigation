import { createControlComponent } from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

const CreateRoutineMachineControl = ({ router, geocoder, geolocator }) => {
  const control = L.Routing.control({
    serviceUrl: '',
    router,
    geocoder,
  });

  geolocator(useMap(), (latlng) => control.setWaypoints(latlng));

  return control;
};

const RoutingControl = createControlComponent(CreateRoutineMachineControl);

export default RoutingControl;
