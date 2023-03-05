import React, { useEffect, useState } from "react";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import "./Outter.css";

let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("./locales/ja.json");
    } else {
        lang = require("./locales/en.json");
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
    }, []);
    useEffect(() => {
        setShowHamburgerMenu(windowWidth < 768); // 768px以下の場合はメニューを表示する
    }, [windowWidth]);
    prepare();
    return (
        <div>
            <div className="header">
                <div className="header-inner">
                    <a href="/" className="logo_outter"><img width="auto" height="50px" src="https://tedxfukuoka.com/wp/wp-content/uploads/TEDxFukuoka_logo_k_RGB450.jpg?1677835120" alt="TEDxFukuoka_logo" /></a>
                    {showHamburgerMenu ? (
                        <a href="#_" onClick={() => { setShowInnerMenu(!showInnerMenu) }} className="HamburgerMenu">
                            <img width="auto" height="32px" src="hamburger.png" alt="" />
                            {showInnerMenu ? <DropDownMenu isDirect={false} isSingle={true} link={"/"} text={lang["header"]["home"]} />
                                : <></>}</a>)
                        :
                        (<>
                            <DropDownMenu isDirect={true} isSingle={true} link="/" text={lang["header"]["home"]} />
                            <DropDownMenu isDirect={true} isSingle={false} link="/" text={"中身あり"} inner_texts={["中身1", "中身2"]} />
                        </>
                        )
                    }

                </div>
            </div>
            {props.children}
            <footer>

            </footer>
        </div>
    )
}