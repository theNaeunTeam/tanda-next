import React from "react";
import Link from 'next/link';
import logo from '../../lib/images/favicon.png'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {AiFillEdit} from "react-icons/ai";
import {BiStore} from "react-icons/bi";
import Image from 'next/image';
import {IconButton} from "@mui/material";

export default function MainBar() {
    /*
    const first = useRef(null);
    const second = useRef(null);

    const updateMenu = () => {
        if (first.current != null) {
            if ((first.current as HTMLInputElement).checked) {
                if (second.current) {
                    (second.current as HTMLElement).style.borderBottomRightRadius = '0';
                    (second.current as HTMLElement).style.borderBottomLeftRadius = '0';
                }
            } else {
                if (second.current) {
                    second.current.borderRadius =
                        '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">10</font></font>px';
                }
            }
        }
    }

     */
    return (
        <>
            <nav id='menu'>
                {/*<input type='checkbox' id='responsive-menu' onClick={updateMenu}/>*/}
                <input type='checkbox' id='responsive-menu'/>
                <label>&nbsp;&nbsp;&nbsp;&nbsp; 메뉴</label>
                <ul>
                    <li><Link href={'/'}><a><Image src={logo} height={20} width={20} alt="logo"/> HOME</a></Link></li>
                    <li>
                        <Link href={'/list'}><a><BiStore/> 근처 가게 찾기</a></Link>
                    </li>
                    <li><Link href={'/event'}>진행중인 이벤트</Link></li>
                    <li>
                        <Link href={'/mycompany'}><a>탄다오더 소개</a></Link>
                    </li>
                    <li className='dropdown-arrow'><Link href={'/user'}><a><AiFillEdit/> &nbsp; 마이페이지</a></Link>
                        <ul className='sub-menus'>
                            <li><Link href={'/user/userreserve'}><a>예약 내역</a></Link></li>
                            <li><Link href={'/user/favorstore'}><a>즐겨찾는 가게</a></Link></li>
                            <li><Link href={'/user/useredit'}><a>회원정보수정</a></Link></li>
                            <li><Link href={'/user/userexit'}><a>탈퇴하기</a></Link></li>
                        </ul>
                    </li>
                    {/*<li><Link to={'#'}>가맹안내</Link></li>*/}
                    <li>
                        <Link href={'/user/shoppingcart'}><a>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <AddShoppingCartIcon/>
                                </IconButton>
                            </a></Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
