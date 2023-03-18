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
        result.push(<div key={els["title"]} className="recently-context-outter"><a className="recently-context" href={els["link"]}>{els["title"]}</a></div>);
    }

    return (
        <div className="recently-contents-outter">
            <hr />
            <div className="recently-title">
                {lang["title"]}
            </div>
            <br />
            <div className="recently-contexts">
                {result}
            </div>
        </div>
    )
}