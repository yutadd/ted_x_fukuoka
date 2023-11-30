import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./DropDownMenu.css";
/**
 * こちらはハンバーガーメニュー内のドロップダウンメニューのコンポーネントです
 * @returns ハンバーガーメニュー内のドロップダウンメニューのコンポーネント
 */
export const DropDownMenu = (props: any): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    let menues = [];
    if (!props.isSingle) {//ドロップダウンメニュー内部のメニューを全て表示する
        for (let i = 0; i < props.inner_texts.length; i++) {
            menues.push(
                (props.inner_links[i].startsWith('http') || window.location.pathname.endsWith(props.link)) ?//もし外部のページであればaタグを使い、内部ページであればLinkコンポーネントを使用することで、遷移することなく表示を切り替えられ、応答速度を早められる
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
    /**
     * 表示部
     */
    return (
        <>
            <div className="dropdownmenu-outter ">
                {/* メニューのトリガーとなるボタン */}
                {props.isSingle ? (
                    <>
                        <div onClick={props.onClick} className="dropdownmenu-inner">{(props.link.startsWith('http') || window.location.pathname.endsWith(props.link)) ?
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
                        <div className="dropdownmenu-inner" onClick={() => { setIsOpen(!isOpen); }}>
                            <div className='menu'>
                                {props.text}
                            </div>
                            {/* isOpenがtrueのときだけメニューを表示 */}
                            {isOpen ? menues : <></>}
                        </div>
                    </>)}
            </div >
        </>
    );

}