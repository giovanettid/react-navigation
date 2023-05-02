import LayerConfiguration from 'components/Map/Configuration/LayerConfiguration';

describe('LayerConfiguration', () => {
  const configuration = new LayerConfiguration();

  describe('new instance', () => {
    it('property url contains openstreetmap placeholders', () => {
      expect(configuration.url).toBe('/{s}/tile/{z}/{x}/{y}.png');
    });

    it('property attribution is openstreetmap copyright', () => {
      expect(configuration.attribution).toBe(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      );
    });
  });
});
