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
import YouTube from 'react-youtube';
let lang: any;
function prepare() {
    var userLang = navigator.language;
    if (userLang.trim() === "ja") {
        lang = require("../../locales/speakers/ja.json");
    } else {
        lang = require("../../locales/speakers/en.json");
    }
}
function youtubePanel(name: string) {
    prepare();
    const elms: JSX.Element[] = [];
    for (const elm of lang["speakers"]) {
        if (elm["name"] == name) {
            for (const vids of elm["youtube"]) {
                elms.push(<div key={vids} className="youtube-outter"><YouTube videoId={vids}></YouTube></div>)
            }
            return (elms);
        }
    }
    console.log("name not found");
    return (elms);

}
export const Profile = (props: any) => {

    const [text, setText] = useState("");
    let name = props.match.params.name;
    fetch("/profiles/" + name + ".md").then((res) => res.text().then((tx) => {
        setText(tx);
    }));
    return (
        <>
            <Outter>
                <div className='page_title_outter'>
                    <h1 className='profile-title'>
                        LiveSpeakers
                    </h1>
                    <h4 className='profile-subtitle'>
                        Speakers on TEDxFukuoka
                    </h4>
                </div>
                <div className='profile-outter'>
                    <div className='contexts-outter'>
                        {text ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {text}
                            </ReactMarkdown>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='embedding-outter'>
                        {youtubePanel(name)}
                    </div>
                </div>

            </Outter>

        </>
    );
}