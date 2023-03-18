import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/home/Home';
import { Profiles } from './components/Profile/Profiles';

export type SharedState = {
  category: string
  setCategory: any
  outterLang: any
  speakerLang: any
  recentlyLang: any
}
let outterLang: any;
let speakerLang: any;
let recentlyLang: any;
function prepare() {
  var userLang = navigator.language;
  if (userLang.trim() === "ja") {
    outterLang = require("./locales/outter/ja.json");
    recentlyLang = require("./locales/recently/ja.json");
    speakerLang = require("./locales/speakers/ja.json");
  } else {
    outterLang = require("./locales/outter/en.json");
    recentlyLang = require("./locales/recently/en.json");
    speakerLang = require("./locales/speakers/en.json");
  }
}
const initialValue = { category: "2023", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null }
export const stateContext = createContext<SharedState>(initialValue);
function App() {
  prepare();
  const [category, setCategory] = useState("2023");
  return (
    <stateContext.Provider value={{ category: category, setCategory: setCategory, outterLang: outterLang, recentlyLang: recentlyLang, speakerLang: speakerLang }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profiles' component={Profiles} />
          <Route component={NotFound} />
        </Switch>
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
