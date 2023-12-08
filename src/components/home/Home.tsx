import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./LatestInfoList";
import { stateContext } from "../../App";
import { Link } from "react-router-dom";

/**
 * こちらはトップページのコンポーネントです。
 * @returns トップページのコンポーネント
 */
export const Home = (): JSX.Element => {
    const context = useContext(stateContext);
    const speakerListJsonObject=context.speakerListJsonObject;
    const [speakers, setspeakers] = useState([]);
    /**
     * こちらは言語対応表が読み込まれた際にそれからJSX.Elementに変換するためのuseEffect関数です
     */
    useEffect(() => {
        const _category = context.category;
        if (speakerListJsonObject) {
            setspeakers(
                speakerListJsonObject["speakers"]
                    .filter((speaker: any) => speaker.category === _category && speaker.profile)//休憩情報などを表示しないためにプロファイルが埋められているもののみ表示する。
                    .map((speaker: any) => (
                        <SpeakerTile
                            key={speaker.name}
                            name={speaker.name}
                            year={speaker.category}
                            file={speaker.file}
                        />
                    )));
        }
    }, [speakerListJsonObject])
    //読み込み終了後200ミリ秒後にURLのハッシュがある位置にスクロールする
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1])
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }, [window.location.hash]);
    /**
     * 表示部
     */
    return (
        <Outter>
            <div className="top" >
                <Link to={(context.category == "2023" ? "/event/tedxfukuoka2023" : "/event/tedxfukuoka2020")} className="top-inner">
                    <img className="background-image" src={"/images/components/" + (context.category == "2023" ? "concept-image.webp" : "concept-image2020.webp")} alt="" />
                </Link>
            </div>
            {speakers}
            <Recently />
        </Outter >
    )
}