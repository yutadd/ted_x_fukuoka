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
            const result: { link: string, file: string }[][] = [];
            for (const els of json["partners"]) {
                if (result[els["index"]]) {
                    result[els["index"]].push({ link: els["link"], file: els["file"] })
                } else {
                    result[els["index"]] = [{ link: els["link"], file: els["file"] }]
                }
            }
            const resultElement: JSX.Element[] = []
            for (let i = 0; i < result.length; i++) {
                let resultelements = result[i];
                if (resultelements.length > 1) {
                    for (let partner_card of resultelements) {
                        resultElement.push(<a key={partner_card.file} className="partner-link" href={partner_card.link}><img className="partner-logo-img" src={"/images/" + partner_card.file} alt={partner_card.file} /> </a>);
                    }
                    resultElement.push(<br />);
                } else {
                    resultElement.push(<a key={resultelements[0].file} className="partner-link-big" href={resultelements[0].link}><img className="partner-logo-img" src={"/images/" + resultelements[0].file} alt={resultelements[0].file} /> </a>);
                    resultElement.push(<br />);
                }
            }
            setLogoEls(resultElement);
        }));
    }, [])

    return <Outter>
        <div className="partners-title-outter">
            <div className="partners-title">
                {context.outterLang["header"]["about"]["partners"]}
            </div>
        </div>
        <div className="partners-contents-outter">
            <div className="partners-contents-inner">
                <a key="https://internet-biz.jp/" className="partner-link" href="https://internet-biz.jp/"><img className="partner-logo-img" src={"/images/iba.webp"} alt="/images/iba.webp" /> </a>
                {/*logoEls*/}
            </div>
        </div>

        <Recently />
    </Outter>
}