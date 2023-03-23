import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./DropDownMenu.css";
export const DropDownMenu = (props: any): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    let menues = [];
    if (!props.isSingle) {
        for (let i = 0; i < props.inner_texts.length; i++) {
            menues.push(
                (props.inner_links[i].startsWith('http') || window.location.pathname.endsWith(props.link)) ?
                    <a href={props.inner_links[i]} key={props.inner_texts[i]} className="menu inner">
                        {props.inner_texts[i]}
                    </a>
                    :
                    <Link to={props.inner_links[i]} key={props.inner_texts[i]} className="menu inner">
                        {props.inner_texts[i]}
                    </Link>
            )
        }
    }
    return (
        <>
            <div className={props.isDirect ? 'menu-outter' : "menu-outter indirect"}>
                {/* メニューのトリガーとなるボタン */}
                {props.isSingle ? (
                    <>
                        <div onClick={props.onClick} className={props.isDirect ? 'direct' : ''}>{(props.link.startsWith('http') || window.location.pathname.endsWith(props.link)) ?
                            <a className='menu' href={props.link}>
                                {props.text}
                            </a>
                            :
                            <Link className='menu' to={props.link}>
                                {props.text}
                            </Link>}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={props.isDirect ? "direct" : ""} onMouseLeave={() => { setIsOpen(!isOpen); }} onMouseEnter={() => { setIsOpen(!isOpen); }}>
                            {props.text}
                            {/* isOpenがtrueのときだけメニューを表示 */}
                            {isOpen ? menues : <></>}
                        </div>
                    </>)}
            </div >
        </>
    );

}