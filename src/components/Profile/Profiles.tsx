import { useContext, useEffect, useState } from 'react';
import { Outter } from '../Outter/Outter';
import "./Profile.css";
import { SpeakerCard } from './SpeakerCard';
import { stateContext } from '../../App';
import { Recently } from '../home/Recently';
/**
 * こちらは登壇者情報ページのコンポーネントです。
 * @returns 登壇者情報ページの内容
 */
export const Profiles = () => {
    const context = useContext(stateContext);
    const [LangJsonObject, setSpeakerJson] = useState<any>()
    const [cardList, setCardList] = useState<JSX.Element[]>([]);
    /**
     * こちらで登壇者情報が含まれるjsonファイル/locales/speakers/<en/ja>.jsonを読み込みsetSpeakerJsonでspeakerJsonに値を設定します。
     */
    useEffect(() => {
        fetch("/locales/speakers/" + context.lang + ".json").then((res) => res.text().then((tx) => {
            if (tx.startsWith("<!DOCTYPE") || tx.startsWith("<!doctype")) {
                console.log("can't fetch \"speaker\" json file");
            } else {
                setSpeakerJson(JSON.parse(tx));
            }
        }));
    }, [context.category, context.lang]);
    /**
     * speakerJsonが変更(言語設定の変更など)されるたびに呼び出される登壇者情報のリスト要素を作るための関数 
     */
    useEffect(() => {
        let categorizedSpeakerJSXElements: { sessionName: string, speakerCardElement: JSX.Element }[][] = [];
        let CurrentIntermissionNumber = 1;
        let CurrentSessionNumber = 1;
        if (LangJsonObject!=null) {
            for (const SpeakerJsonElement of LangJsonObject["speakers"]) {
                if (SpeakerJsonElement["category"] === context.category) {
                    let found = false;
                    const session: string = SpeakerJsonElement["session"];
                    for (let i = 0; i < categorizedSpeakerJSXElements.length; i++) {
                        if (categorizedSpeakerJSXElements[i][0].sessionName === session) {
                            found = true
                            categorizedSpeakerJSXElements[i].push({ sessionName: session, speakerCardElement: <SpeakerCard key={(SpeakerJsonElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++} file={(SpeakerJsonElement["file"] ? SpeakerJsonElement["file"] : "unknown.webp")} name={SpeakerJsonElement["name"]} text={SpeakerJsonElement["profile"]} /> })
                            break;
                        }
                    }
                    if (!found) {
                        categorizedSpeakerJSXElements.push([{ sessionName: session, speakerCardElement: <SpeakerCard key={(SpeakerJsonElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++} file={(SpeakerJsonElement["file"] ? SpeakerJsonElement["file"] : "unknown.webp")} name={SpeakerJsonElement["name"]} text={SpeakerJsonElement["profile"]} /> }])
                    }
                }
            }
            const _speakerCards: JSX.Element[] = [];
            CurrentIntermissionNumber = 1;
            for (const speakerJSXElements of categorizedSpeakerJSXElements) {
                _speakerCards.push(<div key={speakerJSXElements[0].speakerCardElement.key?.toString() + "_inner"} className='profile-session-title'>
                    {speakerJSXElements[0].speakerCardElement.key?.toString().startsWith("inter") ? "" : "Session" + CurrentSessionNumber++ + ":"} 
                    {speakerJSXElements[0].sessionName!=null? speakerJSXElements[0].sessionName : "All"}
                    </div>)
                for (const card of speakerJSXElements) {
                    _speakerCards.push(card.speakerCardElement)
                }
            }
            setCardList(_speakerCards);
        }

    }, [LangJsonObject])
    /**
     * 500ms後にurlで指定されているオブジェクトの位置にスクロールする。
     */
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1]);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }, []);
    /**
     * 表示部
     */
    return (
        <>
            <Outter>
                <div className='profile-title'>
                    <div className='profile-title-text'>
                        LiveSpeakers
                    </div>
                    <div className='profile-title-subtext'>Speakers on TEDxFukuoka</div>
                </div>
                {cardList}
                <Recently />
            </Outter>
        </>
    );
}