import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                vec.push(<>{(props.inner_links[i].startsWith('http') || window.location.pathname.endsWith(props.link)) ? <a href={props.inner_links[i]} key={props.inner_texts[i]} className="menu inner">{props.inner_texts[i]}</a> : <Link to={props.inner_links[i]} key={props.inner_texts[i]} className="menu inner">{props.inner_texts[i]}
                </Link>}</>)
            }
            setElements(vec);
        }
    }, [])
    return (
        <>
            <div className={props.isDirect ? 'menu-outter' : "menu-outter indirect"}>
                {/* メニューのトリガーとなるボタン */}
                {props.isSingle ? (<><div className={props.isDirect ? 'direct' : ''}>{(props.link.startsWith('http') || window.location.pathname.endsWith(props.link)) ? <a className='menu' href={props.link}>{props.text}</a> : <Link className='menu' to={props.link}>{props.text}</Link>}</div></>) : (
                    <><div className={props.isDirect ? "direct" : ""} onMouseLeave={() => { setIsOpen(!isOpen); }} onMouseEnter={() => { setIsOpen(!isOpen); }}>
                        {props.text}
                        {/* isOpenがtrueのときだけメニューを表示 */}
                        {isOpen ? inner_elements : <></>}</div></>)}
            </div >
        </>
    );

}