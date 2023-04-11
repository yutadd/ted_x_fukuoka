import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./Recently";
import { stateContext } from "../../App";

/**
 * トップ画面のすべての要素をひとまとめにする要素
 * ・ヘッダー
 * ・トップ画像
 * ・スピーカータイル
 * ・最新情報
 * ・フッター
 */
export const Home = (): JSX.Element => {
    //表示のモードを取得・設定できる共有された変数の取得。
    const context = useContext(stateContext);
    const [speakers, setspeakers] = useState([]);
    //登壇者タイルに表示される言語情報の読み込み
    const lang = context.speakerLang;
    //登壇者パネルの準備
    useEffect(() => {
        setspeakers(lang["speakers"]
            .filter((speaker: any) => speaker.category === context.category)
            .map((speaker: any) => (
                <SpeakerTile
                    key={speaker.name}
                    name={speaker.name}
                    category={speaker.category}
                    file={speaker.file}
                />
            )));
    }, []);
    // Use map instead of for loop
    //読み込み終了後200ミリ秒後にURLのハッシュがある位置にスクロールする
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1])
            console.log(window.location.hash.split('#')[1]);
            console.log("scrolling to " + targetEl);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }, [window.location.hash]);
    return (
        <Outter>
            <div className="top" >
                <a href={(context.category == "2023" ? "http://bit.ly/3Jfx83D" : "/event/tedxfukuoka2020")} className="top-inner">
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