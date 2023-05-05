/* eslint-disable no-console */
export default function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js').then(
      (registration) => {
        console.log(`Service worker registration succeeded: ${registration}`);
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`);
      }
    );
  } else {
    console.error('Service workers are not supported.');
  }
}
