import { Link, NavLink } from "react-router-dom";
import styles from "./SpeakerTile.module.css";
/**
 * トップページの登壇者のタイル１枚分 
 */
export const SpeakerTile = (props: any): JSX.Element => {
    return (
        <NavLink className={styles.SpeakerTileContainer} to={{ pathname: "/SpeakerList", hash: props.file }} >
            <img className={styles.image} width="100%" height="auto" src={props.file} alt="" />
            <p className={styles.year}>{props.year}</p>
            <div className={styles.name}>
                <p className={styles.nameText} >{props.name}</p>
            </div>
        </NavLink>

    )
}