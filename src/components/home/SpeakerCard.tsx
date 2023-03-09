import "./SpeakerCard.css";
export const SpeakerCard = (props: any): JSX.Element => {
    return (
        <>
            <div className="box">
                <a href="" ><img className="image" width="100%" height="auto" src={props.file == "" ? "images/unknown.png" : "images/" + props.file} alt="" >
                </img></a>
                <a href="" className="category">{props.category}</a>
                <div className="title">
                    <a href="" >{props.name}</a>
                </div>
            </div>
        </>
    )
}