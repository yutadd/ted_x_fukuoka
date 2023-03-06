import React from "react";
import { Outter } from "../Outter/Outter";
import { SpeakerCard } from "./SpeakerCard";
import "./Home.css";
export const Home = (): JSX.Element => {

    return (
        <Outter>
            <div className="top" >
                <a href="/" className="top-inner">
                    <img className="background-image" src="https://tedxfukuoka.com/wp/wp-content/uploads/27398884_1623103614404643_848331791_o.jpg" alt="" />
                </a>
            </div>
            <a href="#top" className="toTop">TOP</a>
            <SpeakerCard />
        </Outter >
    )
}