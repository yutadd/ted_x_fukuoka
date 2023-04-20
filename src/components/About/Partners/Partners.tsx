import { useContext, useEffect, useState } from "react"
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
    const [logoEls, setLogoEls] = useState<JSX.Element[]>([]);
    useEffect(() => {
        fetch("/about/partners.json").then((res) => res.json().then((json) => {
            const result = [];
            for (const els of json["partners"]) {
                result.push(<a key={els["file"]} className="partner-link" href={els["link"]}><img className="partner-logo-img" src={"/images/" + els["file"]} alt={els["file"]} /> </a>)
            }
            setLogoEls(result);
        }));
    }, [])

    return <Outter>
        <div className="partners-title-outter">
            <div className="partners-title">
                {context.outterLang["header"]["about"]["partners"]}
            </div>
        </div>
        {/** 
        <div className="partners-contents-outter">
            <div className="partners-contents-inner">
                {logoEls}
            </div>
        </div>
       */
       }
        <Recently />
    </Outter>
}