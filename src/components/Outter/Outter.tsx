import React, { useEffect, useState } from "react";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import "./Outter.css";

let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../../locales/outter/ja.json");
    } else {
        lang = require("../../locales/outter/en.json");
    }
}


export const Outter = (props: any): JSX.Element => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const [showInnerMenu, setShowInnerMenu] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        const targetEl = document.getElementById(window.location.hash.split('#')[1])
        console.log(window.location.hash.split('#')[1]);
        targetEl?.scrollIntoView({ behavior: 'smooth' })
    }, []);
    useEffect(() => {
        setShowHamburgerMenu(windowWidth < 768); // 768px以下の場合はメニューを表示する
    }, [windowWidth]);
    prepare();
    return (
        <div id="top">
            <div className="header">
                <div className="header-inner" style={{ "display": showInnerMenu ? "block" : "flex" }}>{/*ハンバーガーメニューを開いた際は一行だと見にくいので、ヘッダー内部の要素が複数行になるようにする。*/}
                    <div className="logo_outter"><img width="auto" height="50px" src="https://tedxfukuoka.com/wp/wp-content/uploads/TEDxFukuoka_logo_k_RGB450.jpg?1677835120" alt="TEDxFukuoka_logo" />
                        <a style={{ display: showHamburgerMenu ? "inline-block" : "none" }} onClick={() => { setShowInnerMenu(!showInnerMenu) }} className="HamburgerMenu">
                            <img width="auto" height="32px" src="/hamburger.png" alt="" />
                        </a>
                    </div>
                    {showHamburgerMenu ? (
                        <>
                            {showInnerMenu ? <><DropDownMenu isDirect={false} isSingle={true} link={"/"} text={lang["header"]["home"]} />
                                <DropDownMenu isDirect={true} isSingle={false} link="/" text={lang["header"]["latest"]["latest"]} inner_texts={[lang["header"]["latest"]["upcoming"], lang["header"]["latest"]["past"], lang["header"]["latest"]["blog"]]} inner_links={["/#recently", "https://tedxfukuoka.com/category/past/", "https://tedxfukuoka.com/category/blog/"]} />
                                <DropDownMenu isDirect={true} isSingle={false} link="/" text={lang["header"]["about"]["about"]} inner_texts={[lang["header"]["about"]["TED"], lang["header"]["about"]["TEDx"], lang["header"]["about"]["partners"]]} inner_links={["https://tedxfukuoka.com/aboutted/", "https://tedxfukuoka.com/abouttedx/", "https://tedxfukuoka.com/partners-2/"]} /></>

                                : <></>}</>)
                        :
                        (<>
                            <DropDownMenu isDirect={true} isSingle={true} link="/" text={lang["header"]["home"]} />
                            <DropDownMenu isDirect={true} isSingle={false} link="/" text={lang["header"]["latest"]["latest"]} inner_texts={[lang["header"]["latest"]["upcoming"], lang["header"]["latest"]["past"], lang["header"]["latest"]["blog"]]} inner_links={["/#recently", "https://tedxfukuoka.com/category/past/", "https://tedxfukuoka.com/category/blog/"]} />
                            <DropDownMenu isDirect={true} isSingle={false} link="/" text={lang["header"]["about"]["about"]} inner_texts={[lang["header"]["about"]["TED"], lang["header"]["about"]["TEDx"], lang["header"]["about"]["partners"]]} inner_links={["https://tedxfukuoka.com/aboutted/", "https://tedxfukuoka.com/abouttedx/", "https://tedxfukuoka.com/partners-2/"]} />
                        </>
                        )
                    }

                </div>
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