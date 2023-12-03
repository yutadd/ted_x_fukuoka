import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import styles from "./LatestInfoList.module.css";

/**
 * こちらは最新情報のコンポーネントです。
 * @returns 最新情報の内容
 */
export const Recently = (): JSX.Element => {
    const context = useContext(stateContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [latestInfoBlockListResult, setLatestInfoBlockListResult] = useState<JSX.Element[]>();
    /**
     * こちらで言語情報からイベントリストの
     */
    useEffect(() => {
        const _LatestInfoBlockListResult = [];
        if (context.recentlyLang) {
            let i = 0;//表示するのはeventsのjsonファイルの上から3つまで
            for (const latestEventObject of context.recentlyLang["events"]) {
                _LatestInfoBlockListResult.push(
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
            setLatestInfoBlockListResult(_LatestInfoBlockListResult)
            setIsLoaded(true)
        }
    }, [context.recentlyLang])

    /**
     * 表示部
     */
    return (
        <div className={styles.ListRoot}>
            <div className={styles.ListTitleContainer}>{isLoaded && context.recentlyLang["title"]}</div>
            <div className={styles.List}>{latestInfoBlockListResult}</div>
        </div>
    )
}