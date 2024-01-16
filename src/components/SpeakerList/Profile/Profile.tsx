import { Outter } from "../../Outter/Outter";
import { Recently } from "../../home/LatestInfoList";
import scss from './Profile.module.css'
import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../../App";
import { Link } from "react-router-dom";
export const Profile = () => {
    const speakerImageFile = window.location.hash.split('#')[1];
    const [speakerJsonObject, setSpeakerJsonObject] = useState<any>();
    const context = useContext(stateContext);
    let speakerListJsonObject=context.speakerListJsonObject
    /**
     * こちらで登壇者情報が含まれるjsonファイル/locales/speakers/<en/ja>.jsonを読み込みsetSpeakerJsonでspeakerJsonに値を設定します。
     */

    const [loadCount, setLoadCount] = useState(0)
    useEffect(() => {
        if (loadCount < 2) {
            switchCategoryByUrlHash()
            setLoadCount(value => value + 1)
        }
        if(context.speakerListJsonObject!=undefined){
            console.log("context updated:"+context.lang);
            for (const _SpeakerObject of context.speakerListJsonObject["speakers"]) {
                if (_SpeakerObject['file'] == speakerImageFile) {
                    setSpeakerJsonObject(_SpeakerObject);
                }
            }
        }
        },[context.speakerListJsonObject,]);
        
    const generateSpeakerProfile = () => {
        if (speakerJsonObject != null) {
            return (<>
            <Link className={scss.ReturnToSpeakerListButton}to={"/SpeakerList"+window.location.hash} >{context.lang=="ja"?"<登壇者一覧に戻る":"< Return To Speaker List"}</Link>
                <h1 className={scss.ProfileTitle}>
                    {speakerJsonObject["name"]}
                </h1>
                <img src={speakerJsonObject["flicker"]} className={scss.ProfileImage} alt={speakerJsonObject["name"]} />
                <div className={scss.Profiledescription}>{speakerJsonObject["profile"]}<br /><a className={scss.YoutubeLink} href={speakerJsonObject["youtube"]}>{speakerJsonObject["youtubeTitle"]}</a></div>
            </>)
        } else {
            <h1 className={scss.NoSpeakerFound}>No such speaker</h1>
        }
    }
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
    return (<Outter>

        <div style={{ backgroundColor: "white", paddingTop: "120px" }}>
            {generateSpeakerProfile()}
        </div>
        <Recently />
    </Outter>)
}