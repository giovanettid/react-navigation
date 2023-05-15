import { render } from '@testing-library/react';
import { MapContainer, useMap } from 'react-leaflet';

import Geolocator from 'components/Geolocator/Geolocator';

import {
  setupFakeGeolocationSuccess,
  setupFakeGeolocationError,
} from './fakes/geolocation';

describe('Geolocator', () => {
  const sandbox = sinon.createSandbox();

  const DummyComponent = ({ geolocator, controlCallback }) => {
    const map = useMap();

    geolocator(map, controlCallback);
  };

  const DummyComponentVerifyLocate = ({ geolocator, expect }) => {
    sandbox.restore();
    const map = useMap();
    const spyLocate = sandbox.spy(map, 'locate');

    geolocator(map, () => {});

    expect(spyLocate);
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('geolocation found', () => {
    it('should call control callback', () => {
      setupFakeGeolocationSuccess();
      const spyControlCallback = sandbox.spy();

      render(
        <MapContainer>
          <DummyComponent
            geolocator={Geolocator(15)}
            controlCallback={spyControlCallback}
          />
        </MapContainer>
      );

      expect(spyControlCallback).toHaveBeenCalledOnce();
    });

    it('should locate with correct options', () => {
      setupFakeGeolocationSuccess();

      render(
        <MapContainer>
          <DummyComponentVerifyLocate
            geolocator={Geolocator(15)}
            expect={(spyLocate) =>
              expect(spyLocate).toHaveBeenCalledWith({
                setView: true,
                maxZoom: 15,
              })
            }
          />
        </MapContainer>
      );
    });
  });

  describe('geolocation error', () => {
    it('should display alert message', () => {
      setupFakeGeolocationError();
      const spyAlert = sandbox.spy(window, 'alert');

      render(
        <MapContainer>
          <DummyComponent geolocator={Geolocator(15)} />
        </MapContainer>
      );

      expect(spyAlert).toHaveBeenCalledWithMatch('geolocation error');
    });
  });
});
