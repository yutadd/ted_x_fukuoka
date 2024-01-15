import { useContext, useEffect, useState } from 'react';
import { Outter } from '../Outter/Outter';
import scss from './SpeakerList.module.css';
import { SpeakerCard } from './SpeakerCard';
import { stateContext } from '../../App';
import { Recently } from '../home/LatestInfoList';
/**
 * こちらは登壇者情報ページのコンポーネントです。
 * @returns 登壇者情報ページの内容
 */
export const SpeakerList = () => {
    const context = useContext(stateContext);
    const speakerListJsonObject = context.speakerListJsonObject;
    const [speakerCardList, setSpeakerCardList] = useState<JSX.Element[]>([]);

    const generateSessionInfomationElement = (speakerJSXElements: any, CurrentSessionNumber: & number) => {
        return <div key={speakerJSXElements[0].speakerCardElement.key?.toString() + "_inner"} className={scss.SessionTitle}>
            {speakerJSXElements[0].speakerCardElement.key?.toString().startsWith("inter") ? "" : "Session" + CurrentSessionNumber++ + ":"}
            {speakerJSXElements[0].sessionName != null ? speakerJSXElements[0].sessionName : "All"}
        </div>
    }
    /**
     * URLで指定されたファイルが、現在のカテゴリに属する登壇者のファイルに存在しなければ、カテゴリを2020にしている。
     * speakerJsonが変更(言語設定の変更など)されるたびに呼び出される登壇者情報のリスト要素を作るための関数 
     */
    const [loadCount, setLoadCount] = useState(0)
    useEffect(() => {
        if (loadCount < 2) {
            switchCategoryByUrlHash()
            setLoadCount(value => value + 1)
        }
        let categorizedSpeakerJSXElementList: { sessionName: string, speakerCardElement: JSX.Element }[][] = [];
        let CurrentIntermissionNumber = 1;
        let CurrentSessionNumber = 1;
        if (speakerListJsonObject != null) {
            for (const SpeakerJsonElement of speakerListJsonObject["speakers"]) {
                if (SpeakerJsonElement["category"] === context.category) {
                    let found = false;
                    const sessionName: string = SpeakerJsonElement["session"];
                    for (let i = 0; i < categorizedSpeakerJSXElementList.length; i++) {
                        if (categorizedSpeakerJSXElementList[i][0].sessionName === sessionName) {
                            found = true
                            categorizedSpeakerJSXElementList[i].push(
                                {
                                    sessionName: sessionName,
                                    speakerCardElement:
                                        <SpeakerCard
                                            key={(SpeakerJsonElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++}
                                            file={(SpeakerJsonElement["file"] ? SpeakerJsonElement["file"] : "unknown.webp")}
                                            name={SpeakerJsonElement["name"]}
                                            text={SpeakerJsonElement["profile"]} />
                                })
                            break;
                        }
                    }
                    if (!found) {
                        categorizedSpeakerJSXElementList.push(
                            [{
                                sessionName: sessionName,
                                speakerCardElement:
                                    <SpeakerCard
                                        key={(SpeakerJsonElement["profile"] ? "session" : "intermission") + CurrentIntermissionNumber++}
                                        file={(SpeakerJsonElement["file"] ? SpeakerJsonElement["file"] : "unknown.webp")}
                                        name={SpeakerJsonElement["name"]}
                                        text={SpeakerJsonElement["profile"]} />
                            }]
                        )
                    }
                }
            }
            const _speakerCardList: JSX.Element[] = [];
            CurrentIntermissionNumber = 1;
            for (const speakerJSXElementList of categorizedSpeakerJSXElementList) {
                _speakerCardList.push(generateSessionInfomationElement(speakerJSXElementList, CurrentSessionNumber))
                for (const speakerJSXElement of speakerJSXElementList) {
                    _speakerCardList.push(speakerJSXElement.speakerCardElement)
                }
            }
            setSpeakerCardList(_speakerCardList);
        }
    }, [speakerListJsonObject, context.category])


    const switchCategoryByUrlHash = () => {
        console.log(speakerListJsonObject)
        const imageFileNameOnUrl = document.location.hash.split("#")[1]
        if (imageFileNameOnUrl && imageFileNameOnUrl.endsWith(".webp")) {
            if (speakerListJsonObject) {
                for (const speakerObject of speakerListJsonObject["speakers"]) {
                    if (imageFileNameOnUrl == speakerObject.file) {
                        context.setCategory(speakerObject.category)
                    }
                }
            } else {
                console.log("speakerListJsonObject is null")
            }
        } else {
            console.log("There is no hash on url. Or invalid format")
        }
        console.log("end of switch category function")
    }
    const [tryScrollCount, setTryScrollCount] = useState(0)
    const scrollToPictureFileOnUrlHash = () => {
        console.log("trying to scroll target element.")
        if (tryScrollCount < 4) {
            const targetElement = document.getElementById(window.location.hash.split('#')[1]);
            if (targetElement) {
                console.log("targetElement found going to scroll")
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log("targetElement not found")
                setTimeout(() => {
                    scrollToPictureFileOnUrlHash();
                }, 500);
            }
            setTryScrollCount(value => value + 1)
        }else{
            console.log("scroll try count reached to maximum try")
        }

    }
    /**
     * urlで指定されているオブジェクトの位置にスクロールする。
     */
    useEffect(() => {
        console.log("trying to call [trying to scroll to profile element] function")
        scrollToPictureFileOnUrlHash()
    }, []);
    /**
     * 表示部
     */
    return (
        <>
            <Outter>
                <div className={scss.TitleContaner}>
                    <div className={scss.TitleText}>
                        LiveSpeakers
                    </div>
                    <div className={scss.SubTitle}>Speakers on TEDxFukuoka</div>
                </div>
                {speakerCardList}
                <Recently />
            </Outter>
        </>
    );
}