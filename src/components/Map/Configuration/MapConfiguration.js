import ContainerConfiguration from './ContainerConfiguration';
import ControlConfiguration from './ControlConfiguration';
import LayerConfiguration from './LayerConfiguration';

export default class MapConfiguration {
  constructor(pathname) {
    this.container = new ContainerConfiguration();
    this.layer = new LayerConfiguration();
    this.control = new ControlConfiguration(pathname);
  }
}
