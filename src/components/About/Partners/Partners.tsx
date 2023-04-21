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
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://lovelabmusic.com/">
                    <img style={{ width: "30%" }} src={"/images/love-lab-music.webp"} alt="/images/love-lab-music.webp" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://internet-biz.jp/">
                    <img style={{ width: "30%" }} src={"/images/iba.webp"} alt="/images/iba.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.fsm.ac.jp/">
                <img style={{ width: "70%" }} src={"/images/fsm_logo.jpg"} alt="/images/fsm_logo.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.fca.ac.jp/">
                <img style={{ width: "60%" }} src={"/images/tech_c.jpg"} alt="/images/tech_c.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.amadaman.com/">
                <img style={{ width: "55%" }} src={"/images/adamanda.webp"} alt="/images/tech_c.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.asahipress.com/special/glents/">
                    <img style={{ width: "30%" }} src={"/images/cnn_glents.jpg"} alt="/images/cnn_glents.jpg" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://oltana.jp/">
                    <img style={{ width: "20%" }} src={"/images/oltana.webp"} alt="/images/oltana.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.adachicoffee.com/">
                    <img style={{ width: "30%" }} src={"/images/adachicoffee.png"} alt="/images/adachicoffee.png" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://organicpapa.org/">
                    <img style={{ width: "30%" }} src={"/images/organicpapa.png"} alt="/images/organicpapa.png" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.facebook.com/kawasakiseichaen/about/?ref=page_internal&locale=ja_JP">
                    <img style={{ width: "20%" }} src={"/images/kawasakien.jpg"} alt="/images/kawasakien.jpg" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://printio.me/">
                    <img style={{ width: "35%" }} src={"/images/printio.jpg"} alt="/images/printio.jpg" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://peatix.com/?lang=ja">
                    <img style={{ width: "30%" }} src={"/images/peatix.webp"} alt="/images/peatix.webp" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://lolipop.jp/">
                    <img style={{ width: "30%" }} src={"/images/lolipop.webp"} alt="/images/lolipop.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.city.fukuoka.lg.jp/">
                    <img style={{ width: "30%" }} src={"/images/fukuoka-city.png"} alt="/images/fukuoka-city.png" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://www.fukuoka-now.com/ja/">
                    <img style={{ width: "20%" }} src={"/images/fukuokanow.png"} alt="/images/fukuokanow.png" />
                </a>
            </div>
            {/*logoEls*/}
        </div>

        <Recently />
    </Outter >
}