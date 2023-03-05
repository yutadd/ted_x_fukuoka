import { useEffect, useState } from 'react';
import { JsxEmit, visitEachChild } from 'typescript';
import "./DropDownMenu.css";
export const DropDownMenu = (props: any): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [inner_elements, setElements] = useState<JSX.Element[]>([]);
    // メニューがクリックされたときにisOpenを反転する関数
    useEffect(() => {
        let vec = [];
        if (!props.isSingle) {
            for (let i = 0; i < props.inner_texts.length; i++) {
                vec.push(<a href={props.inner_links[i]} key={props.inner_texts[i]} className="menu inner">{props.inner_texts[i]}
                </a>)
            }
            setElements(vec);
        }
    }, [])
    return (
        <>
            <div className={props.isDirect ? 'menu-outter' : "menu-outter indirect"}>
                {/* メニューのトリガーとなるボタン */}
                {props.isSingle ? (<><div className={props.isDirect ? 'direct' : ''}><a className='menu' href={props.link}>{props.text}</a></div></>) : (
                    <><div className={props.isDirect ? "direct" : ""} onClick={() => { setIsOpen(!isOpen); }}>{props.text}</div>
                        {/* isOpenがtrueのときだけメニューを表示 */}
                        {isOpen ? inner_elements : <></>}</>)}

            </div >
        </>
    );

}