import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./TED.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/LatestInfoList";
/**
 * こちらはTEDについてのページのコンポーネントです。
 * @returns TEDについてのページの内容
 */
export const TED = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    /**
     * こちらでマークダウンファイル/about/ted_<en/ja>.mdを読み込みます。
     */
    useEffect(() => {
        fetch("/about/ted_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang]);//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。
    /**
     * 表示部
     */
    return <Outter>
        <div className="ted-title-outter">
            <div className="ted-title">
                {context.outterLang && context.outterLang["header"]["about"]["TEDx"]}
            </div>
        </div>
        <div className="ted-contents-outter">
            <div className="ted-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}