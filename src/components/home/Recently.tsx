import { useEffect } from "react";
import "./Recently.css";
let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../../locales/recently/ja.json");
    } else {
        lang = require("../../locales/recently/en.json");
    }
}
export const Recently = (): JSX.Element => {
    useEffect(() => {
        prepare();
    }, [])
    return (<>
        <div className="recently-outter">
            <div className="recently-title">
                2023 最新情報!
            </div>
        </div>
    </>)
}