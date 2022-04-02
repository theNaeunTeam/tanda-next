import React, {useRef} from "react";
import Link from 'next/link';

export default function MasterNavbar(props: any) {

    const navRef = useRef(null);
    const chkBoxRef = useRef(null);

    const updatemenu = () => {
        if (navRef.current != null) {
            if ((navRef.current as HTMLInputElement).checked) {
                if (chkBoxRef.current) {
                    (chkBoxRef.current as HTMLElement).style.borderBottomRightRadius = '0';
                    (chkBoxRef.current as HTMLElement).style.borderBottomLeftRadius = '0';
                }
            } else {
                if(chkBoxRef.current){
                    (chkBoxRef.current as HTMLElement).style.fontSize = '10';
                    // chkBoxRef.current.borderRadius = '<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">10</font></font>px';
                }
            }
        }
    }


    return (
        <>
            <nav id='menu' ref={chkBoxRef}>
                <input type='checkbox' id='responsive-menu' ref={navRef} onClick={updatemenu}/><label/>
                <ul>
                    <li><Link href={'/master'}>Home</Link></li>
                    <li className='dropdown-arrow'><Link href={'/master'}>점주/회원 관리</Link>
                        <ul className='sub-menus'>
                            <li><Link href={'/master'}><a>점주리스트</a></Link></li>
                            <li><Link href={'/master/masteruserlist'}><a>회원리스트</a></Link></li>
                        </ul>
                    </li>

                    <li className='dropdown-arrow'><Link href={'/master/approvalwaiting'}> 가맹점 관리 </Link>
                        <ul className='sub-menus'>
                            <li><Link href={'/master/approvalwaiting'}><a>입점승인대기</a></Link></li>
                            <li><Link href={'/master/approvalcompletion'}><a>입점승인완료</a></Link></li>
                            <li><Link href={'/master/terminationwaiting'}><a>해지승인대기</a></Link></li>
                            <li><Link href={'/master/terminationcompletion'}><a>해지승인완료</a></Link></li>
                        </ul>
                    </li>

                    <li className='dropdown-arrow'><Link href={'/master/masterchart'}><a>통계 자료</a></Link>
                        <ul className='sub-menus'>
                            <li><Link href={'/master/masterownerdash'}><a>오너현황</a></Link></li>
                            <li><Link href={'/master/userdash'}><a>유저현황</a></Link></li>
                            <li><Link href={'/master/masterchart'}><a>종합현황</a></Link></li>
                            <li></li>
                        </ul>
                    </li>
                    <li><Link href={'/master/changeBanner'}><a>배너변경</a></Link></li>
                </ul>
            </nav>
            <br/>
        </>
    )
}
