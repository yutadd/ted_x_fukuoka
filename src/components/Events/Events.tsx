import { Link, useParams } from "react-router-dom"
import { Outter } from "../Outter/Outter";
import "./Events.css"
import { JSXElementConstructor, ReactElement, ReactFragment, useContext, useEffect, useState } from 'react';
// markdown をパースする
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';
import { stateContext } from "../../App";
import { Recently } from "../home/Recently";
export const Events = () => {
    const context = useContext(stateContext);
    const [text, setText] = useState("");
    const { event } = useParams<{ event: any }>();
    const events: JSX.Element[] = [];
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

        for (const elm of context.recentlyLang["events"]) {
            events.push(
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
    }, [context.lang])

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
            <div className="event-others-outter">
                <div className="event-others-title">{context.recentlyLang["other_events"]}</div>
                {events}
            </div>
            <Recently />
        </Outter>
    );
}