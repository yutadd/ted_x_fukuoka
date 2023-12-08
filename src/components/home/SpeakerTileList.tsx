import { Link, NavLink } from "react-router-dom";
import styles from "./SpeakerTile.module.css";
import { stateContext } from "../../App";
import { useContext, useEffect, useState } from "react";

export const SpeakerTileList = (props: any): JSX.Element => {
    const context = useContext(stateContext);
    const [speakers, setspeakers] = useState([]);
    const speakerListJsonObject=context.speakerListJsonObject;
    const category = context.category;
    useEffect(() => {
        if (speakerListJsonObject) {
            setspeakers(
                speakerListJsonObject["speakers"]
                    .filter((speaker: any) => speaker.category === category && speaker.profile)//休憩情報などを表示しないためにプロファイルが埋められているもののみ表示する。
                    .map((speaker: any) => (
                        <SpeakerTile
                            key={speaker.name}
                            name={speaker.name}
                            year={speaker.category}
                            file={speaker.file}
                        />
                    )));
        }
    }, [speakerListJsonObject,context.category])
    return(
    <>
        {speakers}
    </>
    )
}
function SpeakerTile(props:any){
    return (
        <Link className={styles.SpeakerTileContainer} to={{ pathname: "/SpeakerList/Profile", hash: props.file }} >
            <img className={styles.image} width="100%" height="auto" src={props.file} alt="" />
            <p className={styles.year}>{props.year}</p>
            <div className={styles.name}>
                <p className={styles.nameText} >{props.name}</p>
            </div>
        </Link>

    )
}