import { useContext, useEffect, useState } from 'react';
import { Outter } from '../Outter/Outter';
import "./Profile.css";
import { SpeakerCard } from './SpeakerCard';
import { stateContext } from '../../App';
import { Recently } from '../home/Recently';
export const Profiles = () => {
    const context = useContext(stateContext);
    const [cardList, setCardList] = useState<JSX.Element[]>([]);
    useEffect(() => {
        const lang = context.speakerLang;
        let result: { session: string, card: JSX.Element }[][] = [];
        let intermission = 1;
        let session = 1;
        for (const elm of lang["speakers"]) {
            if (elm["category"] === context.category) {
                let found = false;
                const session: string = elm["session"];
                for (let i = 0; i < result.length; i++) {
                    if (result[i][0].session === session) {
                        found = true
                        result[i].push({ session: session, card: <SpeakerCard key={(elm["profile"] ? "session" : "intermission") + intermission++} file={(elm["file"] ? elm["file"] : "unknown.webp")} name={elm["name"]} text={elm["profile"]} /> })
                        break;
                    }
                }
                if (!found) {
                    result.push([{ session: session, card: <SpeakerCard key={(elm["profile"] ? "session" : "intermission") + intermission++} file={(elm["file"] ? elm["file"] : "unknown.webp")} name={elm["name"]} text={elm["profile"]} /> }])
                }
            }
        }
        const _cards: JSX.Element[] = [];
        intermission = 1;
        for (const cards of result) {
            _cards.push(<div key={cards[0].card.key?.toString() + "alpha"} className='profile-session-title'>{cards[0].card.key?.toString().startsWith("inter") ? "" : "Session" + session++ + ":"} {cards[0].session ? cards[0].session : "All"}</div>)
            for (const card of cards) {
                _cards.push(card.card)
            }
        }
        setCardList(_cards);
    }, [context.category])

    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1]);
            targetEl?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }, []);
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