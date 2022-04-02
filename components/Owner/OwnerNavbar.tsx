import Link from 'next/link';
import FCM from "../../lib/FCM";


export default function OwnerNavbar() {

    return (
        <>
            <nav id='menu'>
                <ul>
                    <li className='dropdown-arrow'>
                        <Link href={'/owner'}><a>대시보드</a></Link>
                        <ul className='sub-menus'>
                            <li><Link href={'/owner'}><a>메인</a></Link></li>
                            <li><Link href={'/owner/ownerdashf'}><a>판매</a></Link></li>
                            <li><Link href={'/owner/ownerdashs'}><a>기타</a></Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link href={'/owner/addproduct'}><a>상품등록</a></Link>
                    </li>
                    <li>
                        <Link href={'/owner/goodsview'}><a>상품조회</a></Link>
                    </li>
                    <li>
                        <Link href={'/owner/reservationview'}><a>예약현황</a></Link>
                    </li>
                    <li>
                        <Link href={'/owner/unsubscribe'}><a>이용해지신청</a></Link>
                    </li>
                </ul>
                <li><FCM/></li>
            </nav>
        </>


    )
}
