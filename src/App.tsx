import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./App.css"
import { Home } from './components/home/Home';
import { Profiles } from './components/Profile/Profiles';
import { Events } from './components/Events/Events';
import { CC } from './components/About/CC/CC';
import { Contact } from './components/About/Contact/Contact';
import { Media } from './components/About/Media/Media';
import { TED } from './components/About/TED/TED';
import { TEDx } from './components/About/TEDx/TEDx';
import { Partners } from './components/About/Partners/Partners';
import { Outter } from './components/Outter/Outter';
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

function load(lang_str: string) {
  if (lang_str === "ja") {
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
function prepare() {
  const cookie_lang = Cookies.get('lang');
  if (cookie_lang != undefined) {
    load(cookie_lang);
  } else {
    var userBrowLang = navigator.language.trim();
    load(userBrowLang);
  }
}
function setCookieLangAndReload(setlang: string) {
  Cookies.set('lang', setlang);
  window.location.reload();
}
const initialValue = { category: "2023", lang: "ja", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null }
export const stateContext = createContext<SharedState>(initialValue);
function App() {
  prepare();
  const [category, setCategory] = useState("2023");
  return (
    <stateContext.Provider value={{ category: category, lang: lang, setCategory: setCategory, outterLang: outterLang, recentlyLang: recentlyLang, speakerLang: speakerLang }}>
      <div className='language-switcher-outter'>
        <div onClick={() => setCookieLangAndReload("ja")} className={'language-switcher-inner' + (lang === "ja" ? " selected" : " unselected")}>JP</div>
        <div onClick={() => setCookieLangAndReload("en")} className={'language-switcher-inner' + (lang === "en" ? " selected" : " unselected")}>EN</div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/profiles' Component={Profiles} />
          <Route path='/event/:event' Component={Events} />
          <Route path='/cc' Component={CC} />
          <Route path='/contact' Component={Contact} />
          <Route path='/media' Component={Media} />
          <Route path='/ted' Component={TED} />
          <Route path='/tedx' Component={TEDx} />
          <Route path='/partners' Component={Partners} />
          {/*パス互換性*/}
          <Route path='/:event' Component={Events} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </stateContext.Provider>

  );
}
export function NotFound() {
  console.log("404")
  return (
<>
<Outter>
    <div style={{backgroundColor:"white",paddingTop:"120px"}}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
    </Outter>
    </>
  );
}
export default App;
