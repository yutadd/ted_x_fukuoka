import React, { useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./Recently";


let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../../locales/speakers/ja.json");
    } else {
        lang = require("../../locales/speakers/en.json");
    }
}
export const Home = (): JSX.Element => {
    prepare();
    const [speakers, setSpeakers] = useState<JSX.Element[]>([]);
    const init = () => {
        let result = [];
        for (const elm of lang["speakers"]) {
            result.push(<SpeakerTile key={elm["name"]} name={elm["name"]} category={elm["category"]} file={elm["file"]} />);
        }
        setSpeakers(result);
    }
    useEffect(() => {
        init();
    }, []);
    return (
        <Outter>
            <div className="top" >
                <a href="/" className="top-inner">
                    <img className="background-image" src="/images/concept_image.jpg" alt="" />
                </a>
            </div>
            {speakers}
            <div id="recently"><Recently /></div>
        </Outter >
    )
}