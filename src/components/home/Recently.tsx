import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import "./Recently.css";

/**
 * こちらは最新情報のコンポーネントです。
 * @returns 最新情報の内容
 */
export const Recently = (): JSX.Element => {
    const context = useContext(stateContext);
    const [lang, setLang] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState<JSX.Element[]>();
    /**
     * こちらで言語情報からイベントリストの
     */
    useEffect(() => {
        const _lang = context.recentlyLang
        const _result = [];
        if (_lang) {
            let i = 0;//表示するのはeventsのjsonファイルの上から3つまで
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
                if (i > 3) break;
                i++;
            }
            setResult(_result)
            setIsLoaded(true)
            setLang(_lang)
        }
    }, [context.recentlyLang])

    /**
     * 表示部
     */
    return (
        <div className="recently-outter">
            <div className="recently-title-outter">{isLoaded && lang["title"]}</div>
            <div className="recently-events-outter">{result}</div>
        </div>
    )
}