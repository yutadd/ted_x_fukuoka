import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CC } from './components/About/CC/CC';
import { Contact } from './components/About/Contact/Contact';
import { Media } from './components/About/Media/Media';
import { Partners } from './components/About/Partners/Partners';
import { TED } from './components/About/TED/TED';
import { TEDx } from './components/About/TEDx/TEDx';
import { Events } from './components/Events/Events';
import { Home } from './components/home/Home';
import { Profiles } from './components/Profile/Profiles';

export type SharedState = {
  lang: string
  category: string
  setCategory: any
  outterLang: any
  speakerLang: any
  recentlyLang: any
}
let outterLang: any;
let speakerLang: any;
let lang: string;
let recentlyLang: any;
function prepare() {
  var userLang = navigator.language;
  if (userLang.trim() === "ja") {
    lang = "ja";
    outterLang = require("./locales/outter/ja.json");
    recentlyLang = require("./locales/recently/ja.json");
    speakerLang = require("./locales/speakers/ja.json");
  } else {
    lang = "en";
    outterLang = require("./locales/outter/en.json");
    recentlyLang = require("./locales/recently/en.json");
    speakerLang = require("./locales/speakers/en.json");
  }
}
const initialValue = { category: "2023", lang: "ja", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null }
export const stateContext = createContext<SharedState>(initialValue);
function App() {
  prepare();
  const [category, setCategory] = useState("2023");
  return (
    <stateContext.Provider value={{ category: category, lang: lang, setCategory: setCategory, outterLang: outterLang, recentlyLang: recentlyLang, speakerLang: speakerLang }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/event/:event' component={Events} />
          <Route exact path='/cc' component={CC} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/media' component={Media} />
          <Route exact path='/ted' component={TED} />
          <Route exact path='/tedx' component={TEDx} />
          <Route exact path='/partners' component={Partners} />
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
