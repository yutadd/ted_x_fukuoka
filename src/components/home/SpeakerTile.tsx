import { Link, NavLink } from "react-router-dom";
import "./SpeakerTile.css";
/**
 * スピーカータイル一枚分の要素
 */
export const SpeakerTile = (props: any): JSX.Element => {
    return (
        <NavLink className="box" to={{ pathname: "/profiles", hash: props.file }} >
            <div >
                <img className="image" width="100%" height="auto" src={props.file == "" ? "images/unknown.png" : "images/" + props.file} alt="" />
            </div>
            <p className="category">{props.category}</p>
            <div className="title">
                <p className="title-inner" >{props.name}</p>
            </div>
        </NavLink>

    )
}