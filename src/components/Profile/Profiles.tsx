import { useEffect, useState } from 'react';
import { unified } from 'unified';
// markdown をパースする
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Outter } from '../Outter/Outter';
import "./Profile.css";
import { SpeakerCard } from './SpeakerCard';
let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../../locales/speakers/ja.json");
    } else {
        lang = require("../../locales/speakers/en.json");
    }
}
export const Profiles = (props: any) => {
    prepare();
    let result = [];
    for (const elm of lang["speakers"]) {

        result.push(<SpeakerCard key={"/images/" + elm["file"]} file={"/images/" + (elm["file"] ? elm["file"] : "unknown.png")} name={elm["name"]} text={elm["profile"]} />);
    }

    return (
        <>
            <Outter>
                <div className='profile-title'><div className='profile-title-text'>LiveSpeakers</div><div className='profile-title-subtext'>Speakers on TEDxFukuoka</div></div>
                {result}
            </Outter>
        </>
    );
}