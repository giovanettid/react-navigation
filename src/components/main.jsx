import { createRoot } from 'react-dom/client';
import Application from 'components/Application';
import Configuration from 'components/Configuration';

import 'styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application configuration={() => ({ ...new Configuration() })} />);
