import ContainerConfiguration from 'components/Map/Configuration/ContainerConfiguration';
import ControlConfiguration from 'components/Map/Configuration/ControlConfiguration';
import LayerConfiguration from 'components/Map/Configuration/LayerConfiguration';
import MapConfiguration from 'components/Map/Configuration/MapConfiguration';

describe('MapConfiguration', () => {
  const configuration = new MapConfiguration('/bike');

  describe('new instance', () => {
    it('property container is instance of ContainerConfiguration', () => {
      expect(configuration.container).toBeInstanceOf(ContainerConfiguration);
    });

    it('property layer is instance of LayerConfiguration', () => {
      expect(configuration.layer).toBeInstanceOf(LayerConfiguration);
    });

    it('property control is instance of ControlConfiguration', () => {
      expect(configuration.control).toBeInstanceOf(ControlConfiguration);
    });
  });
});
