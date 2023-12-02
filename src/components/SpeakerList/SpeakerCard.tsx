import "./SpeakerCard.css";
/**
 * こちらは登壇者の情報(写真とプロフィール文章のペア)一つ分のコンポーネントです。
 * @returns 登壇者の情報(写真とプロフィール文章のペア)一つ分の内容
 */
export const SpeakerCard = (props: any) => {
    return (<>
        <div key={props.file} id={props.file} className="card-container">
            <img src={props.file} alt={props.file} className="card-image" />
            <div className="card-text-outter">
                <div className="card-name">
                    {props.name}
                </div>
                <div className="card-text">
                    {props.text}
                </div>
            </div>
        </div>
    </>)
}