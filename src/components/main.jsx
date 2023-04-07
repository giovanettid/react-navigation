import { createRoot } from 'react-dom/client';

import Map from './Map';
import MapConfiguration from './MapConfiguration';

import 'styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Map configuration={() => ({ ...new MapConfiguration() })} />);
