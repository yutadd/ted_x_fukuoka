import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import "./HamburgerMenu.css"
export const HamburgerMenu = () => {
    const context = useContext(stateContext);
    let [lang, setLang] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        console.log("changed")
        console.log(context.outterLang)
        if (context.outterLang) {
            console.log("loaded")
            setIsLoaded(true)
            setLang(context.outterLang);
        } else {
            console.log("not ready")
        }

    }, [context.outterLang])

    const [showInsideHamburgerMenu, setShowInsideHamburgerMenu] = useState(false);
    const path = window.location.pathname;
    return (
        <>

            <>
                <a onClick={() => setShowInsideHamburgerMenu(!showInsideHamburgerMenu)} className="HamburgerMenu">
                    <img width="auto" className="hamburger-img" src="/images/components/hamburger.png" alt="" />
                </a>
                {showInsideHamburgerMenu && isLoaded ?
                    <div>
                        <DropDownMenu isSingle={true} link={"/"} text={lang["header"]["home"]} />
                        <DropDownMenu isSingle={true} link="/event/tedxfukuoka2023" text={lang["header"]["latest"]["latest"]} />
                        <DropDownMenu isSingle={false} link="/" text={lang["header"]["about"]["about"]} inner_texts={[lang["header"]["about"]["TED"], lang["header"]["about"]["TEDx"], lang["header"]["about"]["partners"]]} inner_links={["/ted", "/tedx", "/partners"]} />
                        {(path === "/" || path === "/profiles") ? <DropDownMenu onClick={() => { context.setCategory(context.category === "2023" ? "2020" : "2023"); console.log(context.category === "2023" ? "switching to 2020" : "switching to 2023") }} isSingle={true} link={"#_"} text={lang["header"][context.category === "2023" ? "switchTo2020" : "switchTo2023"]} /> : <></>}
                    </div>
                    :
                    <></>
                }
            </>
        </>
    );
}