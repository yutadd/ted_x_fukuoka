import { useContext, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./Partners.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/Recently";
export const Partners = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    fetch("/about/partners_" + context.lang + ".md").then((res) => res.text().then((tx) => {
        setText(tx);
    }));
    return <Outter>
        <div className="partners-title-outter">
            <div className="partners-title">
                {context.outterLang["header"]["about"]["partners"]}
            </div>
        </div>
        <div className="partners-contents-outter">
            <div className="partners-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}