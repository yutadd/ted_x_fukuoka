import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import "./Recently.css";

/**
 * 最新情報の表示を行う要素
 */
export const Recently = (): JSX.Element => {
    //最新情報やイベント情報の言語情報読み込み
    const context = useContext(stateContext);
    const lang = context.recentlyLang;
    //イベント情報の読み込み
    const result = [];
    for (const els of lang["events"]) {
        result.push(
            <a key={els["title"]} href={els["link"]} className="recently-panel-outter">
                <img className="recently-panel-logo" src={"/images/" + els["logo"]} alt="" />
                <div className="recently-title">
                    {els["title"]}
                </div>
                <div className="recently-added-date">{els["added_date"]}</div>
            </a>
        );
    }

    return (
        <div className="recently-outter">
            <div className="recently-title-outter">{lang["title"]}</div>
            <div className="recently-events-outter">{result}</div>
        </div>
    )
}