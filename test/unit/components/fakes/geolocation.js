const setupFakeGeolocationSuccess = () => {
  navigator.geolocation = {
    getCurrentPosition: (successCallback) => {
      const position = {
        coords: {
          latitude: 48.8554966,
          longitude: 2.3522295,
          accuracy: 5,
        },
      };
      successCallback(position);
    },
  };
};

const setupFakeGeolocationError = () => {
  navigator.geolocation = {
    getCurrentPosition: (successCallback, errorCallback) => {
      errorCallback(new Error('geolocation error'));
    },
  };
};

export { setupFakeGeolocationSuccess, setupFakeGeolocationError };
