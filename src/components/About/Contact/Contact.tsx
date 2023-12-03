import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./Contact.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/LatestInfoList";
/**
 * こちらはお問い合わせのページのコンポーネントです。
 * @returns お問い合わせのページの内容
 */
export const Contact = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    /**
     * こちらでマークダウンファイル/about/Contact_<en/ja>.mdを読み込みます。
     */
    useEffect(() => {
        fetch("/about/Contact_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang])//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。
    /**
     * 表示部
     */
    return <Outter>
        <div className="contact-title-outter">
            <div className="contact-title">
                {context.outterLang && context.outterLang["footer"]["contact"]}
            </div>
        </div>
        <div className="contact-contents-outter">
            <div className="contact-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}