import { createRoot } from 'react-dom/client';

import MapConfiguration from 'components/Map/Configuration/MapConfiguration';
import Map from 'components/Map/Map';

import 'styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Map configuration={() => ({ ...new MapConfiguration() })} />);
