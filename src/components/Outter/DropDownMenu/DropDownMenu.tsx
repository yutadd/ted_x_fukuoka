import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./DropDownMenu.css";
/**
 * こちらはハンバーガーメニュー内のドロップダウンメニューのコンポーネントです
 * @returns ハンバーガーメニュー内のドロップダウンメニューのコンポーネント
 */
export const DropDownMenu = (props: any): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    let amountOfChildren=0
    if(props.children!=undefined){
        amountOfChildren=props.children.length;
    }
    //
    /**
     * 表示部
     */
    return (
        <>
            <div className="dropdownmenu-outter ">
                {amountOfChildren==0 ? (
                        <div onClick={props.onClick} className="dropdownmenu-inner">{
                            <Link className='menu' to={props.link}>
                                {props.text}
                            </Link>}
                        </div>
                ) : (
                    <>
                        <div className="dropdownmenu-inner" onClick={() => { setIsOpen(!isOpen); }}>
                            <div className='menu'>
                                {props.text}
                            </div>
                            {isOpen ? props.children : <></>}
                        </div>
                    </>)}
            </div >
        </>
    );

}