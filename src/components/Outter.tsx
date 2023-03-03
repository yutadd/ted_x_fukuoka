import { init } from "i18next";
import React from "react"

let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../locales/outter/ja.json");;
    } else {
        lang = require("../locales/outter/en.json");
    }
}
export const Outter = (): JSX.Element => {
    prepare();
    return (
        <div>
            <h1>
                {lang["header"]["home"]}
            </h1>
        </div>
    )
}