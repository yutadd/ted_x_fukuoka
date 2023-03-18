import React, { useContext, useEffect, useState } from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerTile } from "./SpeakerTile";
import "./Home.css";
import { Recently } from "./Recently";
import { stateContext } from "../../App";


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
    const context = useContext(stateContext);
    prepare();
    let speakers = [];
    for (const elm of lang["speakers"]) {
        if (elm["category"] === context.category) {
            speakers.push(<SpeakerTile key={elm["name"]} name={elm["name"]} category={elm["category"]} file={elm["file"]} />);
        }
    }
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1])
            console.log(window.location.hash.split('#')[1]);
            console.log("scrolling to " + targetEl);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }, []);
    return (
        <Outter>
            <div className="top" >
                <a href="/" className="top-inner">
                    <img className="background-image" src={"/images/" + (context.category == "2023" ? "concept_image.jpg" : "concept_image2020.jpg")} alt="" />
                </a>
            </div>
            {speakers}
            <div id="recently"><Recently /></div>
        </Outter >
    )
}