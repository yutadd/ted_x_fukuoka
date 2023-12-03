import { Outter } from "../../Outter/Outter";
import { Recently } from "../../home/Recently";
import scss from './Profile.module.css'
import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../../App";
export const Profile = () => {
    const speakerImageFile = window.location.hash.split('#')[1];
    const [speakerJsonObject, setSpeakerJsonObject] = useState<any>();
    const context = useContext(stateContext);
    const [speakerImageList, setSpeakerImageList] = useState<JSX.Element[]>([]);
    /**
     * こちらで登壇者情報が含まれるjsonファイル/locales/speakers/<en/ja>.jsonを読み込みsetSpeakerJsonでspeakerJsonに値を設定します。
     */
    useEffect(() => {
        fetch("/locales/speakers/" + context.lang + ".json").then((res) => res.text().then((tx) => {
            if (!tx.startsWith("{")) {
                console.error("Can't fetch Speaker Json List")
            } else {
                for (const _SpeakerObject of JSON.parse(tx)['speakers']) {
                    if (_SpeakerObject['file'] == speakerImageFile) {
                        setSpeakerJsonObject(_SpeakerObject);
                    }
                }


            }
        }));
    }, [context.category, context.lang]);

    const generateSpeakerProfile = () => {
        if (speakerJsonObject != null) {
            return (<>
                <h1 className={scss.ProfileTitle}>
                    {speakerJsonObject["name"]}
                </h1>
                <img src={speakerJsonObject["flicker"]} className={scss.ProfileImage} alt="" />
                <div className={scss.Profiledescription}>{speakerJsonObject["profile"]}<br /><a className={scss.YoutubeLink} href={speakerJsonObject["youtube"]}>{speakerJsonObject["youtube"]}</a></div>
            </>)
        } else {
            <h1 className={scss.NoSpeakerFound}>No such speaker</h1>
        }
    }

    return (<Outter>
        <div style={{ backgroundColor: "white", paddingTop: "120px" }}>
            {generateSpeakerProfile()}
        </div>
        <Recently />
    </Outter>)
}