import React, { createContext, useEffect, useState } from 'react';
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
  recentlyLang: any
}
function load(lang_str: string, setOutter: any, setRecently: any) {
  if (lang_str === "ja") {
    fetch("/locales/outter/ja.json").then((res) => res.text().then((tx) => {
      if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
        console.log("can't fetch \"outter\" json file");
      } else {
        setOutter(JSON.parse(tx));
      }
    }));
    fetch("/locales/recently/ja.json").then((res) => res.text().then((tx) => {
      if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
        console.log("can't fetch \"recently\" json file");
      } else {
        setRecently(JSON.parse(tx));
      }
    }));
  } else {
    fetch("/locales/outter/en.json").then((res) => res.text().then((tx) => {
      if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
        console.log("can't fetch \"outter\" json file");
      } else {
        setOutter(JSON.parse(tx));
      }
    }));
    fetch("/locales/recently/en.json").then((res) => res.text().then((tx) => {
      if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
        console.log("can't fetch \"recently\" json file");
      } else {
        setRecently(JSON.parse(tx));
      }
    }));
  }
}
const initialValue = { category: "2023", lang: "ja", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null }
export const stateContext = createContext<SharedState>(initialValue);
function App() {
  const [lang, setLang] = useState("ja");
  const [outterLang, setOutterLang] = useState();
  const [recentlyLang, setRecentlyLang] = useState();
  const [category, setCategory] = useState("2023");
  const cookieLang = Cookies.get('lang');
  const browserLang = navigator.language.trim();
  useEffect(() => {
    //初回訪問時はブラウザの言語設定を読み取り、それが日本語か英語であればそのままブラウザの言語を使用するが、もし他の言語であれば英語とする。
    //もし再訪問であればクッキーの値をそのまま使用する。
    let actualLanguage = cookieLang ? cookieLang : (browserLang == "ja" || browserLang == "en") ? browserLang : "en";
    Cookies.set('lang', actualLanguage);
    load(actualLanguage, setOutterLang, setRecentlyLang);
  }, [lang])

  function changeLang(lang: string) {
    Cookies.set('lang', lang);
    setLang(lang);
  }
  return (
    <stateContext.Provider value={{ category: category, lang: lang, setCategory: setCategory, outterLang: outterLang, recentlyLang: recentlyLang }}>
      <div className='language-switcher-outter'>
        <div onClick={() => changeLang("ja")} className={'language-switcher-inner' + (lang === "ja" ? " selected" : " unselected")}>JP</div>
        <div onClick={() => changeLang("en")} className={'language-switcher-inner' + (lang === "en" ? " selected" : " unselected")}>EN</div>
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
          {/*2020年度とのパス互換性*/}
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
        <div style={{ backgroundColor: "white", paddingTop: "120px" }}>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </div>
      </Outter>
    </>
  );
}
export default App;
