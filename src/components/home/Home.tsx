import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTileList } from "./SpeakerTileList";
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
            <SpeakerTileList/>
            <Recently />
        </Outter >
    )
}