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
import { TEDxFukuoka } from './components/About/TEDxFukuoka/TEDxFukuoka';
import { Partners } from './components/About/Partners/Partners';
import { Outter } from './components/Outter/Outter';
import { Profile } from './components/SpeakerList/Profile/Profile'

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
  speakerListJsonObject:any
}
/**Contextの初期値を定義します */
const initialValue = { category: "2023", lang: "ja", setCategory: null, outterLang: null, recentlyLang: null, speakerLang: null,speakerListJsonObject:null }
/**
 * 他のコンポーネントで使用できるcontextインスタンスを作成します
 */
export const stateContext = createContext<SharedState>(initialValue);


/**
 * ページのurlに基づいてルーティングを行ったり、共有する言語情報そのものを定義するコンポーネントです
 */
function App() {

  const [lang, setLang] = useState("ja");
  const [outterLangJsonObject, setOutterLangJsonObject] = useState();
  const [speakerListJsonObject,setSpeakerListJsonObject]=useState();
  const [recentlyLangJsonObject, setRecentlyLangJsonObject] = useState();
  const [Year, setYear] = useState("2023");

/**
 * 引数に渡された言語情報をもとに言語の対応表を読み込む
 */
function refleshLanguageData(lang_str: string) {
  setLang(lang_str)
  fetch("/locales/outter/"+lang_str+".json").then((res) => res.text().then((tx) => {
    if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
      console.log("can't fetch \"outter\" json file");
    } else {
      setOutterLangJsonObject(JSON.parse(tx));
    }
  }));
  fetch("/locales/recently/"+lang_str+".json").then((res) => res.text().then((tx) => {
    if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
      console.log("can't fetch \"recently\" json file");
    } else {
      setRecentlyLangJsonObject(JSON.parse(tx));
    }
  }));
  fetch("/locales/speakers/"+lang_str+".json").then((res) => res.text().then((tx) => {
    if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
      console.log("can't fetch \"recently\" json file");
    } else {
      setSpeakerListJsonObject(JSON.parse(tx));
    }
  }));
}
function readLanguageSetting(){
  const cookieLang = Cookies.get('lang');
  const browserLang = navigator.language.trim();
  if (cookieLang==undefined){
    if(browserLang == "ja" || browserLang == "en"){
      return browserLang
    }else{
      return "ja";
    }
  }else{
    return cookieLang
  }
}
function saveLangageSetting(language_str:string){
  Cookies.set('lang', language_str);
}
  useEffect(() => {
    let actualLanguage=readLanguageSetting()
    refleshLanguageData(actualLanguage)
  },[])

  /**
   * コンポーネント内のreturnがそのコンポーネントの表示部を担当します
   */
  return (
    <stateContext.Provider value={{ category: Year, lang: lang, setCategory: setYear, outterLang: outterLangJsonObject, recentlyLang: recentlyLangJsonObject,speakerListJsonObject:speakerListJsonObject }}>
      <div className='language-switcher-outter'>
        <div onClick={() => {refleshLanguageData("ja");saveLangageSetting("ja")}} className={'language-switcher-inner' + (lang === "ja" ? " selected" : " unselected")}>JP</div>
        <div onClick={() => {refleshLanguageData("en");saveLangageSetting("en")}} className={'language-switcher-inner' + (lang === "en" ? " selected" : " unselected")}>EN</div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/SpeakerList/Profile' Component={Profile} />
          <Route path='/SpeakerList' Component={SpeakerList} />
          <Route path='/event/:event' Component={Events} />
          <Route path='/cc' Component={CC} />
          <Route path='/contact' Component={Contact} />
          <Route path='/media' Component={Media} />
          <Route path='/TED' Component={TED} />
          <Route path='/TEDx' Component={TEDx} />
          <Route path='/TEDxFukuoka' Component={TEDxFukuoka} />
          <Route path='/Partners' Component={Partners} />
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
