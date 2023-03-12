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
    return (
        <>
            <Outter>

            </Outter>

        </>
    );
}