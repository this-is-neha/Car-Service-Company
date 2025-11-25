import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RoutingConfig from './Routing/routing.js';

import './index.css';

createRoot(document.getElementById('root')!).render(
  
    
      <BrowserRouter>
      <RoutingConfig />
      </BrowserRouter>
    
  
);


