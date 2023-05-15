import '@testing-library/jest-dom';
import 'jest-sinon';
import 'raf/polyfill';
import sinon from 'sinon';

global.sinon = sinon;
window.alert = () => {};
