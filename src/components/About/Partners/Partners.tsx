import { useContext, useEffect, useState } from "react"
import { stateContext } from "../../../App"
import { Outter } from "../../Outter/Outter"
import "./Partners.css"
// Support GFM (tables, autolinks, tasklists, strikethrough)
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
                {context.outterLang && context.outterLang["header"]["about"]["partners"]}
            </div>
        </div>
        <div className="partners-contents-outter">
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://lovelabmusic.com/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/love-lab-music.webp"} alt="/images/company-logo/2023/love-lab-music.webp" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://internet-biz.jp/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/iba.webp"} alt="/images/company-logo/2023/iba.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.fsm.ac.jp/">
                <img style={{ width: "70%" }} src={"/images/company-logo/2023/fsm_logo.jpg"} alt="/images/company-logo/2023/fsm_logo.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.fca.ac.jp/">
                <img style={{ width: "60%" }} src={"/images/company-logo/2023/tech_c.jpg"} alt="/images/company-logo/2023/tech_c.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <a href="https://www.amadaman.com/">
                <img style={{ width: "55%" }} src={"/images/company-logo/2023/adamanda.webp"} alt="/images/company-logo/2023/tech_c.jpg" />
            </a>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.asahipress.com/special/glents/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/cnn_glents.jpg"} alt="/images/company-logo/2023/cnn_glents.jpg" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://oltana.jp/">
                    <img style={{ width: "20%" }} src={"/images/company-logo/2023/oltana.webp"} alt="/images/company-logo/2023/oltana.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.adachicoffee.com/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/adachicoffee.png"} alt="/images/company-logo/2023/adachicoffee.png" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://organicpapa.org/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/organicpapa.png"} alt="/images/company-logo/2023/organicpapa.png" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.facebook.com/kawasakiseichaen/about/?ref=page_internal&locale=ja_JP">
                    <img style={{ width: "20%" }} src={"/images/company-logo/2023/kawasakien.jpg"} alt="/images/company-logo/2023/kawasakien.jpg" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://printio.me/">
                    <img style={{ width: "35%" }} src={"/images/company-logo/2023/printio.jpg"} alt="/images/company-logo/2023/printio.jpg" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://peatix.com/?lang=ja">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/peatix.webp"} alt="/images/company-logo/2023/peatix.webp" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://lolipop.jp/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/lolipop.webp"} alt="/images/company-logo/2023/lolipop.webp" />
                </a>
            </div>
            <div style={{ display: "block", height: "100px" }}></div>
            <div>
                <a href="https://www.city.fukuoka.lg.jp/">
                    <img style={{ width: "30%" }} src={"/images/company-logo/2023/fukuoka-city.png"} alt="/images/company-logo/2023/fukuoka-city.png" />
                </a>
                <div style={{ width: "23%", display: "inline-block" }}></div>
                <a href="https://www.fukuoka-now.com/ja/">
                    <img style={{ width: "20%" }} src={"/images/company-logo/2023/fukuokanow.png"} alt="/images/company-logo/2023/fukuokanow.png" />
                </a>
            </div>
            {/*logoEls*/}
        </div>

        <Recently />
    </Outter >
}