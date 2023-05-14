import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./Recently";
import { stateContext } from "../../App";
import { Link } from "react-router-dom";

/**
 * path:/
 * ・ヘッダー
 * ・トップ画像
 * ・スピーカータイル
 * ・最新情報
 * ・フッター
 * をひとまとめにした要素
 */
export const Home = (): JSX.Element => {
    //表示のモードを取得・設定できる共有された変数の取得。
    const context = useContext(stateContext);
    const [speakerJson, setSpeakerJson] = useState<any>();
    const [speakers, setspeakers] = useState([]);
    useEffect(() => {
        const _category = context.category;
        fetch("/locales/speakers/" + context.lang + ".json").then((res) => res.text().then((tx) => {
            if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
                console.log("can't fetch \"speaker\" json file");
            } else {
                setSpeakerJson(JSON.parse(tx));
            }
        }));
    }, [context.category, context.lang]);
    useEffect(() => {
        const _category = context.category;
        if (speakerJson) {
            setspeakers(
                speakerJson["speakers"]
                    .filter((speaker: any) => speaker.category === _category && speaker.profile)//休憩情報などを表示しないためにプロファイルが埋められているもののみ表示する。
                    .map((speaker: any) => (
                        <SpeakerTile
                            key={speaker.name}
                            name={speaker.name}
                            category={speaker.category}
                            file={speaker.file}
                        />
                    )));
        }
    }, [speakerJson])
    //読み込み終了後200ミリ秒後にURLのハッシュがある位置にスクロールする
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1])
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }, [window.location.hash]);
    return (
        <Outter>
            <div className="top" >
                <Link to={(context.category == "2023" ? "/event/tedxfukuoka2023" : "/event/tedxfukuoka2020")} className="top-inner">
                    <img className="background-image" src={"/images/components/" + (context.category == "2023" ? "concept-image.webp" : "concept-image2020.webp")} alt="" />
                </Link>
            </div>
            {speakers}
            <div id="recently">
                <Recently />
            </div>
        </Outter >
    )
}