import "./SpeakerCard.css";
export const SpeakerCard = (props: any) => {
    return (<>
        <div key={props.image} className="card-container">
            <img src={props.image} alt={props.image} className="card-image" />
            <div className="card-text-outter">
                <div className="card-text">
                    {props.text}
                </div>
            </div>
        </div>
    </>)
}