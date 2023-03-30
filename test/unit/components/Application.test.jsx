import Application from 'components/Application';
import Configuration from 'components/Configuration';

import { render, screen, fireEvent } from '@testing-library/react';

describe('Application', () => {
  it('should display popup when click marker', async () => {
    render(<Application configuration={() => ({ ...new Configuration() })} />);

    fireEvent.click(screen.getByRole('button', { name: 'Marker' }));

    const popup = await screen.findByText('A pretty CSS3 popup', {
      exact: false,
    });
    expect(popup).toBeInTheDocument();
  });
});
