import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import "./Recently.css";

/**
 * 最新情報の表示を行う要素
 */
export const Recently = (): JSX.Element => {
    //イベント情報読み込み
    const context = useContext(stateContext);
    const [lang, setLang] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState<JSX.Element[]>();
    useEffect(() => {
        const _lang = context.recentlyLang
        const _result = [];
        if (_lang) {
            for (const els of _lang["events"]) {
                _result.push(
                    <a key={els["title"]} href={els["link"]} className="recently-panel-outter">
                        <img className="recently-panel-logo" src={"/images/components/" + els["logo"]} alt="" />
                        <div className="recently-title">
                            {els["title"]}
                        </div>
                        <div className="recently-added-date">{els["added_date"]}</div>
                    </a>
                );
            }
            setResult(_result)
            setIsLoaded(true)
            setLang(_lang)
        }
    }, [context.recentlyLang])


    return (
        <div className="recently-outter">
            <div className="recently-title-outter">{isLoaded && lang["title"]}</div>
            <div className="recently-events-outter">{result}</div>
        </div>
    )
}