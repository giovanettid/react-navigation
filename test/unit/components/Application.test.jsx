import Application from 'components/Application';
import Configuration from 'components/Configuration';

import { render, screen } from '@testing-library/react';

describe('Application', () => {
  it('should display js starter template', () => {
    render(<Application configuration={() => ({ ...new Configuration() })} />);

    expect(screen.getByText('js starter...')).toBeInTheDocument();
  });
});
