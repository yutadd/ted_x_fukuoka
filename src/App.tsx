import React from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Home } from './components/home/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Link to='/'>Back To Top</Link>
      </BrowserRouter>
    </>
  );
}
function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
export default App;
