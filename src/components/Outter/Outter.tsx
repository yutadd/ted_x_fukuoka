import { useContext } from "react";
import { stateContext } from "../../App";
import { HamburgerMenu } from "./HamburgerMenu";
import "./Outter.css";
import { Link, useParams } from "react-router-dom";
export const Outter = (props: any): JSX.Element => {


    const context = useContext(stateContext);
    const lang = context.outterLang;
    return (
        <div id="top">
            <div className="header">
                <div className="header-logo-outter">
                    <Link to="/"><img width="auto" className="header-logo-img" src="/images/tedxfukuoka-logo-k-rgb450.webp" alt="TEDxFukuoka_logo" /></Link>
                </div>
                <HamburgerMenu />
            </div>
            {props.children}
            <div className="footer-outter">
                <div className="footer-left-panel">
                    <div className="footer-copyright">
                        This independent TEDx event is operated under license from TED.<br />
                        TED CONFERENCES, LLC Some Rights Reserved | TEDxFukuoka 2023
                    </div>
                </div>
                <div className="footer-right-panel">
                    <a href="/cc/" className="footer-right-item">
                        {lang["footer"]["cc"]}
                    </a>
                    <a href="/contact" className="footer-right-item">
                        {lang["footer"]["contact"]}
                    </a>
                    <a href="/media" className="footer-right-item">
                        {lang["footer"]["media"]}
                    </a>
                </div>
            </div>
        </div>
    )
}