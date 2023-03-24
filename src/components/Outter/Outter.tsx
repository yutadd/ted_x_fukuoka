import { useContext } from "react";
import { stateContext } from "../../App";
import { HamburgerMenu } from "./HamburgerMenu";
import "./Outter.css";
export const Outter = (props: any): JSX.Element => {
    const context = useContext(stateContext);
    const lang = context.outterLang;
    return (
        <div id="top">
            <div className="header">
                <div className="header-logo-outter">
                    <img width="auto"  className="header-logo-img" src="/images/TEDxFukuoka_logo_k_RGB450.jpg" alt="TEDxFukuoka_logo" />
                </div>
                <HamburgerMenu />
            </div>
            {props.children}
            <div className="footer-outter">
                <div className="footer-left-panel">
                    <img className="footer-logo-image" src="/images/TEDxFukuoka_logo_k_RGB450.jpg" alt="TEDxFukuoka_logo" />
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
                <div className="footer-item">Copyright ©  TEDxFukuoka</div>
            </div>
        </div>
    )
}