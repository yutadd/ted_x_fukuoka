import { useContext, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./TEDx.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/Recently";
export const TEDx = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    fetch("/about/tedx_" + context.lang + ".md").then((res) => res.text().then((tx) => {
        setText(tx);
    }));
    return <Outter>
        <div className="tedx-title-outter">
            <div className="tedx-title">
                {context.outterLang["header"]["about"]["TEDx"]}
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