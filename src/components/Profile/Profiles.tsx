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
    const [speakerJson, setSpeakerJson] = useState<any>()
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
        const lang = speakerJson;
        let resultElement: { sessionName: string, speakerCardElement: JSX.Element }[][] = [];
        let CurrentIntermissionNumber = 1;
        let CurrentSessionNumber = 1;
        if (lang!=null) {
            for (const SpeakerElement of lang["speakers"]) {
                if (SpeakerElement["category"] === context.category) {
                    let found = false;
                    const session: string = SpeakerElement["session"];
                    for (let i = 0; i < resultElement.length; i++) {
                        if (resultElement[i][0].sessionName === session) {
                            found = true
                            resultElement[i].push({ sessionName: session, speakerCardElement: <SpeakerCard key={(SpeakerElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++} file={(SpeakerElement["file"] ? SpeakerElement["file"] : "unknown.webp")} name={SpeakerElement["name"]} text={SpeakerElement["profile"]} /> })
                            break;
                        }
                    }
                    if (!found) {
                        resultElement.push([{ sessionName: session, speakerCardElement: <SpeakerCard key={(SpeakerElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++} file={(SpeakerElement["file"] ? SpeakerElement["file"] : "unknown.webp")} name={SpeakerElement["name"]} text={SpeakerElement["profile"]} /> }])
                    }
                }
            }
            const _speakerCards: JSX.Element[] = [];
            CurrentIntermissionNumber = 1;
            for (const cards of resultElement) {
                _speakerCards.push(<div key={cards[0].speakerCardElement.key?.toString() + "alpha"} className='profile-session-title'>
                    {cards[0].speakerCardElement.key?.toString().startsWith("inter") ? "" : "Session" + CurrentSessionNumber++ + ":"} 
                    {cards[0].sessionName!=null? cards[0].sessionName : "All"}
                    </div>)
                for (const card of cards) {
                    _speakerCards.push(card.speakerCardElement)
                }
            }
            setCardList(_speakerCards);
        }

    }, [speakerJson])
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