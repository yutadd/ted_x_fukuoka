import { useParams } from "react-router-dom";
import { Outter } from "../../Outter/Outter";
import { Recently } from "../../home/Recently";

export const Profile = (props: any) => {
    const { event } = useParams<{ event: any }>();
    return(<Outter>
        <Recently />
    </Outter>)
}