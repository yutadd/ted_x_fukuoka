import "./SpeakerTile.css";
export const SpeakerTile = (props: any): JSX.Element => {
    return (
        <>
            <div className="box">
                <a href={"/profiles#" + props.file} ><img className="image" width="100%" height="auto" src={props.file == "" ? "images/unknown.png" : "images/" + props.file} alt="" >
                </img></a>
                <a href="" className="category">{props.category}</a>
                <div className="title">
                    <a className="title-inner" href="" >{props.name}</a>
                </div>
            </div>
        </>
    )
}