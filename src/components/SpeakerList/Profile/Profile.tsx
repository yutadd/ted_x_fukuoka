import { useParams } from "react-router-dom";
import { Outter } from "../../Outter/Outter";
import { Recently } from "../../home/Recently";
import scss from './Profile.module.css'
import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../../App";
export const Profile = (props: any) => {
    const { speaker } = useParams<{ speaker: any }>();
    console.log(speaker);
    const [speakerJsonObject, setSpeakerJsonObject] = useState<any>();
    const context = useContext(stateContext);
        /**
     * こちらで登壇者情報が含まれるjsonファイル/locales/speakers/<en/ja>.jsonを読み込みsetSpeakerJsonでspeakerJsonに値を設定します。
     */
        useEffect(() => {
            fetch("/locales/speakers/" + context.lang + ".json").then((res) => res.text().then((tx) => {
                if (!tx.startsWith("{")) {
                    console.log("can't fetch \"speaker\" json file");
                } else {
                    for (const _SpeakerObject of JSON.parse(tx)['speakers']){
                        if(_SpeakerObject['file']==speaker){
                            setSpeakerJsonObject(_SpeakerObject);
                        }
                    }
                    

                }
            }));
        }, [context.category, context.lang]);
        
    return(<Outter>
         <div style={{ backgroundColor: "white", paddingTop: "120px" }}>
        {
            speakerJsonObject!=null?<>
                <img src={"/public/images/speakers/"+speakerJsonObject["file"]} alt="" />
                <h1 className={scss.ProfileTitle}>
                    {speakerJsonObject["name"]}
                </h1>
                </>:
                <h1 className={scss.ProfileTitle}>No such speaker</h1>
        }
        </div>
        <Recently />
    </Outter>)
}