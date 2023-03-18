import React, { createContext, useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Profiles } from './components/Profile/Profiles';

export type SharedState = {
  category: string
  setCategory: any
}
const initialValue = { category: "2023", setCategory: null }
export const stateContext = createContext<SharedState>(initialValue);
function App() {
  const [category, setCategory] = useState("2023");
  return (
    <stateContext.Provider value={{ category: category, setCategory: setCategory }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profiles' component={Profiles} />
          <Route component={NotFound} />
        </Switch>
        {/*<Link to='/'>Back To Top</Link>*/}
      </BrowserRouter>
    </stateContext.Provider>

  );
}
export function NotFound() {
  return (

    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>

  );
}
export default App;
