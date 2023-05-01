import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./CC.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Recently } from "../../home/Recently";
export const CC = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    useEffect(() => {
        fetch("/about/CC_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang]);

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