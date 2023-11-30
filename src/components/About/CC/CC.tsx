import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./CC.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
//import rehypeSanitize from "rehype-sanitize";このimportを有効化することで読み取ったmdのサニタイズが行なえますが、いくつかのhtmlタグが無効化されることと、今回は内部のmdを使用しているため、コメントアウトしております。
import { Recently } from "../../home/Recently";
/**
 * こちらはクリエイティブ・コモンズのページのコンポーネントです。
 * @returns クリエイティブ・コモンズのページの内容
 */
export const CC = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    /**
     * こちらでマークダウンファイル/about/CC_<en/ja>.mdを読み込みます。
     */
    useEffect(() => {
        fetch("/about/CC_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang]);//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。
    /**
     * 表示部
     */
    return <Outter>
        <div className="cc-title-outter">
            <div className="cc-title">
                {context.outterLang && context.outterLang["footer"]["cc"]}
            </div>
        </div>
        <div className="cc-contents-outter">
            <div className="cc-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}