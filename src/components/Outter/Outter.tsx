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
                <HamburgerMenu />
            </div>
            {props.children}
            <div className="footer-outter">
                <a href="https://tedxfukuoka.com/cc/" className="footer-item border-right">
                    {lang["footer"]["cc"]}
                </a>
                <a href="https://tedxfukuoka.com/contact/" className="footer-item border-right">
                    {lang["footer"]["contact"]}
                </a>
                <a href="https://tedxfukuoka.com/media/" className="footer-item border-right">
                    {lang["footer"]["media"]}
                </a>
                <div className="footer-item">Copyright ©  TEDxFukuoka</div>
            </div>
            <a href="#top" className="toTop">↑ TOP ↑</a>
        </div>
    )
}