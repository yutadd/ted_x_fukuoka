import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./Contact.css"
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import { Recently } from "../../home/Recently";
export const Contact = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    useEffect(() => {
        fetch("/about/Contact_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            setText(tx);
        }));
    }, [context.lang])

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