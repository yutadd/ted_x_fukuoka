import { useEffect, useState } from "react";
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
export const Recently = (props: any): JSX.Element => {
    prepare();
    const [contexts, setContexts] = useState<JSX.Element[]>([]);
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        const result = [];
        for (const els of lang["events"]) {
            result.push(<div key={els["title"]} className="recently-context-outter"><a className="recently-context" href={els["link"]}>{els["title"]}</a></div>);
        }
        setContexts(result);
        setTitle(lang["title"]);
    }, [])


    return (
        <div className="recently-contents-outter">
            <hr />
            <div className="recently-title-outter">
                <div className="recently-title">
                    {title}
                </div>
            </div>
            <div className="recently-contexts">
                {contexts}
            </div>
        </div>
    )
}