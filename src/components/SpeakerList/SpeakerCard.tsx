import "./SpeakerCard.css";
/**
 * こちらは登壇者の情報(写真とプロフィール文章のペア)一つ分のコンポーネントです。
 * @returns 登壇者の情報(写真とプロフィール文章のペア)一つ分の内容
 */
export const SpeakerCard = (props: any) => {
    function generateUrl() {
        if (props.name != null) {
            return "/SpeakerList/Profile/#" + props.file
        } else {
            return "javascripit:void(0)"
        }
    }
    return (<>
        <div key={props.file} id={props.file} className="card-container">
            <a href={generateUrl()}>
                <img src={props.file} alt={props.file} className="card-image" />
            </a>
            <div className="card-text-outter">
                <a href={generateUrl()} className="card-name">
                    {props.name}
                </a>
                <a href={generateUrl()} className="card-text">
                    {props.text}
                </a>
            </div>
        </div >
    </>)
}