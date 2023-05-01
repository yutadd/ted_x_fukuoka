import { useContext, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./TED.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/Recently";
export const TED = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    fetch("/about/ted_" + context.lang + ".md").then((res) => res.text().then((tx) => {
        setText(tx);
    }));
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