import { useContext, useEffect, useState } from "react";
import { stateContext } from "../../App";
import { DropDownMenu } from "./DropDownMenu/DropDownMenu";
import "./HamburgerMenu.css"
/**
 * こちらはハンバーガーメニューのコンポーネントです。
 * @returns ハンバーガーメニューの内容
 */
export const HamburgerMenu = () => {
    const context = useContext(stateContext);
    let [lang, setLang] = useState<any>();
    useEffect(() => {
        setLang(context.outterLang);
    }, [context.outterLang])//もし途中で言語が変更されたときのため、言語情報をhookに登録しておくことで、言語情報に変更が入ったらこのuseEffectがもう一度呼ばれ、切り替え後の言語を読み込み、表示します。

    const [showInsideHamburgerMenu, setShowInsideHamburgerMenu] = useState(false);
    const path = window.location.pathname;
    /**
     * 表示部
     */
    return (
        <>
            <a onClick={() => setShowInsideHamburgerMenu(!showInsideHamburgerMenu)} className="HamburgerMenu">
                <img width="auto" className="hamburger-img" src="/images/components/hamburger.png" alt="" />
            </a>
            {showInsideHamburgerMenu ?
                <div>
                    <DropDownMenu isSingle={true} link={"/"} text={lang["header"]["home"]} />
                    <DropDownMenu isSingle={true} link="/event/tedxfukuoka2023" text={lang["header"]["latest"]["latest"]} />
                    <DropDownMenu isSingle={false} link="/" text={lang["header"]["about"]["about"]} inner_texts={[lang["header"]["about"]["TED"], lang["header"]["about"]["TEDx"], lang["header"]["about"]["TEDxFukuoka"], lang["header"]["about"]["partners"],]} inner_links={["/ted", "/tedx","/TEDxFukuoka", "/partners"]} />
                    {(path === "/" || path === "/profiles") ?
                        <DropDownMenu onClick={() => {
                            context.setCategory(context.category === "2023" ? "2020" : "2023");
                            console.log(context.category === "2023" ? "switching to 2020" : "switching to 2023")
                        }} isSingle={true} link={"#_"} text={lang["header"][context.category === "2023" ? "switchTo2020" : "switchTo2023"]}
                        /> : <></>}
                </div>
                :
                <></>
            }
        </>
    );
}