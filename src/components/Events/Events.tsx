import { Link, useParams } from "react-router-dom"
import { Outter } from "../Outter/Outter";
import "./Events.css"
import { JSXElementConstructor, ReactElement, ReactFragment, useContext, useEffect, useState } from 'react';
// markdown をパースする
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import { stateContext } from "../../App";
import { Recently } from "../home/LatestInfoList";
/**
 * こちらはイベント記事のページのコンポーネントです。
 * @returns イベント記事のページの内容
 */
export const Events = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    const { event } = useParams<{ event: any }>();
    const [events, setEvents] = useState<JSX.Element[]>();
    const [isLoaded, setIsLoaded] = useState(false);
    /**
     * こちらでマークダウンファイル/events/:evet名_<en/ja>.mdを読み込みます。
     */
    useEffect(() => {
        fetch("/events/" + event + "_" + context.lang + ".md").then((res) => res.text().then((tx) => {
            if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
                console.log("404")
                setText("404 not found");
            } else {
                console.log(tx)
                setText(tx);
            }
        }));
    }, [context.lang])//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。
    /**
     * 表示部
     */
    useEffect(() => {
        const _events = []
        if (context.recentlyLang) {
            for (const elm of context.recentlyLang["events"]) {
                _events.push(
                    elm["link"].startsWith("http") ?
                        <a key={elm["title"]} className="event-others-link" href={elm["link"]}>
                            {elm["title"]}
                        </a>
                        :
                        <Link key={elm["title"]} className="event-others-link" to={elm["link"]}>
                            {elm["title"]}
                        </Link>
                )
            }
            setEvents(_events);
            setIsLoaded(true)
        }
    }, [context.recentlyLang]);

    return (
        <Outter>
            <div className="event-title-outter">
                <div className="event-title">Event</div>
            </div>
            <div className="event-contents-outter">
                <div className="event-contents">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {text}
                    </ReactMarkdown>
                </div>
            </div>
            {
                isLoaded && <div className="event-others-outter">
                    <div className="event-others-title">{context.recentlyLang["other_events"]}</div>
                    {events}
                </div>
            }
            <Recently />
        </Outter>
    );
}