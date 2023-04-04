import { render, screen } from '@testing-library/react';

import Application from 'components/Application';
import Configuration from 'components/Configuration';

import * as routingResponse from './routing-response.json';

describe('Application', () => {
  let server;
  const setup = () => {
    const configuration = new Configuration();
    configuration.routingServiceUrl = 'http://localhost';
    configuration.urlTilesTemplate = 'https://{s}.localhost/{z}/{x}/{y}.png';

    const utils = render(
      <Application configuration={() => ({ ...configuration })} />
    );

    return {
      ...utils,
    };
  };

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    server.respondWith('GET', /\/driving\//, [
      200,
      { 'content-Type': 'application/json' },
      JSON.stringify(routingResponse),
    ]);
  });

  afterEach(() => {
    server.restore();
    sinon.restore();
  });

  it('should display zoom', () => {
    setup();

    expect(screen.getByTitle('Zoom in')).toBeInTheDocument();
    expect(screen.getByTitle('Zoom out')).toBeInTheDocument();
  });

  it('should display attribution layer', () => {
    setup();

    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });

  it('should display 2 way point markers', () => {
    setup();

    expect(screen.getAllByAltText('way point', { exact: false })).toHaveLength(
      2
    );
  });
});
