import { createRoot } from 'react-dom/client';

import Application from './Application';
import MapConfiguration from './MapConfiguration';

import 'styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Application configuration={() => ({ ...new MapConfiguration() })} />
);
