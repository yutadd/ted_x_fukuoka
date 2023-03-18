import { Link, NavLink } from "react-router-dom";
import "./SpeakerTile.css";
export const SpeakerTile = (props: any): JSX.Element => {
    return (
        <>
            <div className="box">
                <NavLink to={{ pathname: "/profiles", hash: props.file }} ><img className="image" width="100%" height="auto" src={props.file == "" ? "images/unknown.png" : "images/" + props.file} alt="" >
                </img></NavLink>
                <a href="" className="category">{props.category}</a>
                <div className="title">
                    <a className="title-inner" href="" >{props.name}</a>
                </div>
            </div>
        </>
    )
}