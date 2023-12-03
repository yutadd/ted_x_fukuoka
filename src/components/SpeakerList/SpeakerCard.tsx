import { Link } from "react-router-dom";
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
            <Link to={generateUrl()}>
                <img src={props.file} alt={props.file} className="card-image" />
            </Link>
            <div className="card-text-outter">
                <Link to={generateUrl()} className="card-name">
                    {props.name}
                </Link>
                <Link to={generateUrl()} className="card-text">
                    {props.text}
                </Link>
            </div>
        </div >
    </>)
}