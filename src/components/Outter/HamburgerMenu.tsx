import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import "./HamburgerMenu.css"
export const HamburgerMenu = () => {
    const context = useContext(stateContext);
    const lang = context.outterLang;
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
    const [showInnerMenu, setShowInnerMenu] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setShowHamburgerMenu(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        setShowHamburgerMenu(window.innerWidth < 768);
    }, []);
    return (
        <>
            {
                /**
                 * もし横が狭いなら、ハンバーガーメニューを表示し、
                 * メニューも縦に一つづつ並べるようにする
                 */
            }
            <div className="header-inner" style={{ "display": showInnerMenu && showHamburgerMenu ? "block" : "flex" }}>
                <div className="logo_outter">
                    <img width="auto" height="50px" src="https://tedxfukuoka.com/wp/wp-content/uploads/TEDxFukuoka_logo_k_RGB450.jpg?1677835120" alt="TEDxFukuoka_logo" />
                    <a style={{ display: showHamburgerMenu ? "inline-block" : "none" }} onClick={() => { setShowInnerMenu(!showInnerMenu) }} className="HamburgerMenu">
                        <img width="auto" height="32px" src="/hamburger.png" alt="" />
                    </a>
                </div>
                <>
                    {(showInnerMenu || !showHamburgerMenu) ?
                        <>
                            <DropDownMenu isDirect={!showHamburgerMenu} isSingle={true} link={"/"} text={lang["header"]["home"]} />
                            <DropDownMenu isDirect={!showHamburgerMenu} isSingle={false} link="/" text={lang["header"]["latest"]["latest"]} inner_texts={[lang["header"]["latest"]["upcoming"], lang["header"]["latest"]["past"], lang["header"]["latest"]["blog"]]} inner_links={["/#recently", "https://tedxfukuoka.com/category/past/", "https://tedxfukuoka.com/category/blog/"]} />
                            <DropDownMenu isDirect={!showHamburgerMenu} isSingle={false} link="/" text={lang["header"]["about"]["about"]} inner_texts={[lang["header"]["about"]["TED"], lang["header"]["about"]["TEDx"], lang["header"]["about"]["partners"]]} inner_links={["https://tedxfukuoka.com/aboutted/", "https://tedxfukuoka.com/abouttedx/", "https://tedxfukuoka.com/partners-2/"]} />
                            <DropDownMenu onClick={() => { context.setCategory(context.category === "2023" ? "2020" : "2023"); console.log(context.category === "2023" ? "switching to 2020" : "switching to 2023") }} isDirect={!showHamburgerMenu} isSingle={true} link={"#_"} text={lang["header"][context.category === "2023" ? "switchTo2020" : "switchTo2023"]} />
                        </>
                        :
                        <></>
                    }
                </>
            </div>
        </>
    );
}