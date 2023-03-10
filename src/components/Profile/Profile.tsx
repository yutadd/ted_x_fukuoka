import { useEffect, useState } from 'react';
import { unified } from 'unified';
// markdown をパースする
import ReactMarkdown from 'react-markdown';
// Support GFM (tables, autolinks, tasklists, strikethrough)
import remarkGfm from 'remark-gfm';

import { Outter } from '../Outter/Outter';
import "./Profile.css";
export const Profile = (props: any) => {
    
    const [text, setText] = useState("");
    const [analyzed, setAnalyzed] = useState("")
    let name = props.match.params.name;
    fetch("/profiles/" + name + ".md").then((res) => res.text().then((tx) => {
        setText(tx);
    }));
    return (
        <>
            <Outter>
                <div className='contexts-outter'>
                    {text ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {text}
                        </ReactMarkdown>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </Outter>

        </>
    );
}