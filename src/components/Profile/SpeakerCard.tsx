import "./SpeakerCard.css";
export const SpeakerCard = (props: any) => {
    return (<>
        <div key={props.file} id={props.file} className="card-container">
            <img src={"/images/" + props.file} alt={props.file} className="card-image" />
            <div className="card-text-outter">
                <div className="card-name">{props.name}</div>
                <div className="card-text">
                    {props.text}
                </div>
            </div>
        </div>
    </>)
}