import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import { HamburgerMenu } from "./HamburgerMenu";
import "./Outter.css";
import { Link, useParams } from "react-router-dom";
export const Outter = (props: any): JSX.Element => {


    const context = useContext(stateContext);
    let [lang, setLang] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (context.outterLang) {
            setIsLoaded(true)
            setLang(context.outterLang);
        } else {
            console.log("not ready")
        }

    }, [context.outterLang])
    return (
        <div id="top">
            <div className="header">
                <div className="header-logo-outter">
                    <Link to="/"><img width="auto" className="header-logo-img" src="/images/components/tedxfukuoka-logo-k-rgb450.webp" alt="TEDxFukuoka_logo" /></Link>
                </div>
                <HamburgerMenu />
            </div>
            {props.children}
            <ul className="outter-sns-links">
                <li><a href="https://www.youtube.com/@TEDxFukuoka/playlists"><i className="fa-brands fa-youtube"></i></a></li>
                <li><a href="https://www.flickr.com/photos/tedxfukuoka"><i className="fa-brands fa-flickr"></i></a></li>
                <li><a href="https://twitter.com/TEDx_Fukuoka"><i className="fa-brands fa-twitter"></i></a></li>
                <li><a href="https://www.facebook.com/TEDxFukuoka"><i className="fa-brands fa-facebook"></i></a></li>
            </ul>
            <div className="footer-outter">
                <div className="footer-left-panel">
                    <div className="footer-copyright">
                        This independent TEDx event is operated under license from TED.<br />
                        TED CONFERENCES, LLC Some Rights Reserved | TEDxFukuoka 2023
                    </div>
                </div>
                <div className="footer-right-panel">
                    {isLoaded && <>
                        <a href="/cc/" className="footer-right-item">
                            {lang["footer"]["cc"]}
                        </a>
                        <a href="/partners" className="footer-right-item">
                            {lang["header"]["about"]["partners"]}
                        </a>
                        <a href="/contact" className="footer-right-item">
                            {lang["footer"]["contact"]}
                        </a>
                        <a href="/media" className="footer-right-item">
                            {lang["footer"]["media"]}
                        </a></>}
                </div>
            </div>
        </div>
    )
}