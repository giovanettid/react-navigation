import { createRoot } from 'react-dom/client';

import Application from './Application';
import Configuration from './Configuration';

import 'styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application configuration={() => ({ ...new Configuration() })} />);
