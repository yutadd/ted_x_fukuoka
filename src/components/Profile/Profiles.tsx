import { useContext, useEffect } from 'react';
import { Outter } from '../Outter/Outter';
import "./Profile.css";
import { SpeakerCard } from './SpeakerCard';
import { stateContext } from '../../App';
export const Profiles = () => {
    const context = useContext(stateContext);
    const lang = context.speakerLang;
    let result = [];
    for (const elm of lang["speakers"]) {
        if (elm["category"] === context.category) {
            result.push(
                <SpeakerCard key={"/images/" + elm["file"] + elm["name"]} file={(elm["file"] ? elm["file"] : "unknown.png")} name={elm["name"]} text={elm["profile"]} />
            );
        }
    }
    useEffect(() => {
        setTimeout(() => {
            const targetEl = document.getElementById(window.location.hash.split('#')[1]);
            console.log(window.location.hash.split('#')[1]);
            console.log("scrolling to " + targetEl);
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
                {result}
            </Outter>
        </>
    );
}