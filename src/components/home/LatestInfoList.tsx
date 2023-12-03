import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import styles from "./LatestInfoList.module.css";

/**
 * こちらは最新情報のコンポーネントです。
 * @returns 最新情報の内容
 */
export const Recently = (): JSX.Element => {
    const context = useContext(stateContext);
    const [latestInfoObject, setLang] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState<JSX.Element[]>();
    /**
     * こちらで言語情報からイベントリストの
     */
    useEffect(() => {
        const _LatestInfoObject = context.recentlyLang
        const _LatestInfoBlockResult = [];
        if (_LatestInfoObject) {
            let i = 0;//表示するのはeventsのjsonファイルの上から3つまで
            for (const latestEventObject of _LatestInfoObject["events"]) {
                _LatestInfoBlockResult.push(
                    <a key={latestEventObject["title"]} href={latestEventObject["link"]} className={styles.Block}>
                        <img className={styles.BlockThumbnail} src={"/images/components/" + latestEventObject["logo"]} alt="" />
                        <div className={styles.BlockTitle}>
                            {latestEventObject["title"]}
                        </div>
                        <div className={styles.UpdatedDate}>{latestEventObject["added_date"]}</div>
                    </a>
                );
                if (i > 3) break;
                i++;
            }
            setResult(_LatestInfoBlockResult)
            setIsLoaded(true)
            setLang(_LatestInfoObject)
        }
    }, [context.recentlyLang])

    /**
     * 表示部
     */
    return (
        <div className={styles.ListRoot}>
            <div className={styles.ListTitleContainer}>{isLoaded && latestInfoObject["title"]}</div>
            <div className={styles.List}>{result}</div>
        </div>
    )
}