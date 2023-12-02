import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./App.css"
import { Home } from './components/home/Home';
import { SpeakerList } from './components/SpeakerList/SpeakerList';
import { Events } from './components/Events/Events';
import { CC } from './components/About/CC/CC';
import { Contact } from './components/About/Contact/Contact';
import { Media } from './components/About/Media/Media';
import { TED } from './components/About/TED/TED';
import { TEDx } from './components/About/TEDx/TEDx';
import { Partners } from './components/About/Partners/Partners';
import { Outter } from './components/Outter/Outter';
import {Profile} from './components/SpeakerList/Profile/Profile'

/**
 * ルーティング処理と、言語情報などを他のコンポーネントと共有するためのContextというものを定義しているファイルです。
 */

/**
 * コンテキストの型を定義
 */
export type SharedState = {
  lang: string
  category: string
  setCategory: any
  outterLang: any
  recentlyLang: any
}
/**
 * 引数に渡された言語情報をもとに言語の対応表を読み込み、set***で読み込んだ対応表グローバル
 */
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
/**Contextの初期値を定義します */
const initialValue = { category: "2023", lang: "ja", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null }
/**
 * 他のコンポーネントで使用できるcontextインスタンスを作成します
 */
export const stateContext = createContext<SharedState>(initialValue);
/**
 * ページのurlに基づいてルーティングを行ったり、共有する言語情報そのものを定義するコンポーネントです
 */
function App() {

  const [lang, setLang] = useState("ja");
  const [outterLang, setOutterLang] = useState();
  const [recentlyLang, setRecentlyLang] = useState();
  const [category, setCategory] = useState("2023");
  const cookieLang = Cookies.get('lang');
  const browserLang = navigator.language.trim();

  /**
     * 言語情報をクッキーに登録し、setLangで言語情報を更新し、useEffectを発火させ、言語情報の更新を促します。
     */
  function changeLang(lang: string) {
    Cookies.set('lang', lang);
    setLang(lang);
  }
  /**
   * 言語情報をset***で更新することで、画面の更新も促されます。
   */
  useEffect(() => {
    let actualLanguage = cookieLang ? cookieLang : (browserLang == "ja" || browserLang == "en") ? browserLang : "en";
    Cookies.set('lang', actualLanguage);
    load(actualLanguage, setOutterLang, setRecentlyLang);
  }, [lang])
  /**
   * コンポーネント内のreturnがそのコンポーネントの表示部を担当します
   */
  return (
    <stateContext.Provider value={{ category: category, lang: lang, setCategory: setCategory, outterLang: outterLang, recentlyLang: recentlyLang }}>
      <div className='language-switcher-outter'>
        <div onClick={() => changeLang("ja")} className={'language-switcher-inner' + (lang === "ja" ? " selected" : " unselected")}>JP</div>
        <div onClick={() => changeLang("en")} className={'language-switcher-inner' + (lang === "en" ? " selected" : " unselected")}>EN</div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/SpeakerList/Profile/:speaker' Component={Profile} />
          <Route path='/SpeakerList' Component={SpeakerList} />
          <Route path='/event/:event' Component={Events} />
          <Route path='/cc' Component={CC} />
          <Route path='/contact' Component={Contact} />
          <Route path='/media' Component={Media} />
          <Route path='/ted' Component={TED} />
          <Route path='/tedx' Component={TEDx} />
          <Route path='/partners' Component={Partners} />
          {/*2020年度とのパス互換性のため、どの条件にも当てはまらなかった場合、以下のルーティングで/イベント名の形式のルーティングだと解釈します。*/}
          <Route path='/:event' Component={Events} />

          {/**
           * urlのルート/以下がイベント名でもなかった場合、最終的に404エラーを表示します。ただし、reactがクライアントサイドレンダリングである仕様上、404のエラーコードで返すのは不可能であるため
           * ブラウザには200が返ります。以下のコンポーネントは単純に存在しないページだということを表示するためのコンポーネントに過ぎません。 */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </stateContext.Provider>

  );
}
/**存在しないページだということを表示するためのコンポーネント */
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
