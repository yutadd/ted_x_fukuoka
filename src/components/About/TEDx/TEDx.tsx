import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./TEDx.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/LatestInfoList";
/**
 * こちらはTEDxについてのページのコンポーネントです。
 * @returns TEDxについてのページの内容
 */
export const TEDx = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    /**
     * こちらでマークダウンファイル/about/tedx_<en/ja>.mdを読み込みます。
     */
    useEffect(() => {
        fetch("/about/tedx_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang]);//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。
    /**
     * 表示部
     */
    return <Outter>
        <div className="tedx-title-outter">
            <div className="tedx-title">
                {context.outterLang && context.outterLang["header"]["about"]["TEDx"]}
            </div>
        </div>
        <div className="tedx-contents-outter">
            <div className="tedx-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}