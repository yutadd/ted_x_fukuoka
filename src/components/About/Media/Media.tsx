import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./Media.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/Recently";
export const Media = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    useEffect(() => {
        fetch("/about/Media_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang]);

    return <Outter>
        <div className="media-title-outter">
            <div className="media-title">
                {context.outterLang && context.outterLang["footer"]["media"]}
            </div>
        </div>
        <div className="media-contents-outter">
            <div className="media-contents-inner">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {text}
                </ReactMarkdown>
            </div>
        </div>
        <Recently />
    </Outter>
}