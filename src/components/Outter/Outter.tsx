import React from "react";
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
    prepare();
    return (
        <div>
            <header className="header">
                <h1>
                    {lang["header"]["home"]}
                </h1>
            </header>
            {props.children}
            <footer>

            </footer>
        </div>
    )
}