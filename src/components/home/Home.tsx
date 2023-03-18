import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./Recently";
import { stateContext } from "../../App";



/**
 * ヘッダーに表示される日本語と英語が1対1で対応したjsonオブジェクトファイルを読み込み、lang変数に束縛する。
 */

/**
 * トップ画面のすべて
 * ・ヘッダー
 * ・トップ画像
 * ・スピーカータイル
 * ・最新情報
 * ・フッター
 */
export const Home = (): JSX.Element => {
    //表示のモードを取得・設定できる共有された変数の取得。
    const context = useContext(stateContext);

    //登壇者タイルに表示される言語情報の読み込み
    const lang = context.speakerLang;
    //登壇者パネルの準備
    let speakers = [];
    for (const elm of lang["speakers"]) {
        if (elm["category"] === context.category) {
            speakers.push(<SpeakerTile key={elm["name"]} name={elm["name"]} category={elm["category"]} file={elm["file"]} />);
        }
    }
    //読み込み終了後200ミリ秒後にURLのハッシュがある位置にスクロールする
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1])
            console.log(window.location.hash.split('#')[1]);
            console.log("scrolling to " + targetEl);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }, []);
    return (
        <Outter>
            <div className="top" >
                <a href="/" className="top-inner">
                    <img className="background-image" src={"/images/" + (context.category == "2023" ? "concept_image.jpg" : "concept_image2020.jpg")} alt="" />
                </a>
            </div>
            {speakers}
            <div id="recently">
                <Recently />
            </div>
        </Outter >
    )
}