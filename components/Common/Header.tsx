import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import LoginFormContainer from "../../containers/Common/LoginFormContainer";
import Backdrop from '@mui/material/Backdrop';
import ScrollToTop from "../../lib/ScrollToTop";
import history from "next/router";
import {RootState} from "../../store";
import Link from 'next/link';

const DivWrap = styled.div`
  color: black;
  width: 100%;
  overflow: hidden;
  position: relative;
  line-height: 35px;
`;

const DivMaster = styled.div`
  float: left;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

const Info = styled.div`
  float: right !important;
`;

const UL = styled.ul`
  float: left;
  list-style: none;
  display: block;

  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

export default function Header() {

    const dispatch = useDispatch();
    const {showLoginModal, authReducer} = useSelector((state: RootState) => state);

    const logout = () => {
        dispatch({type: 'logoutAll'});
        history.push('/');
    };

    const First = () => {
        return (
            <>
                <li onClick={() => dispatch({type: true})} style={{cursor: 'pointer'}}>
                    로그인
                </li>
                <li>
                    <Link href={'/user/register'}><a>회원가입</a></Link>
                </li>
                <li>
                    <Link href={'/owner/register'}><a>입점신청</a></Link>
                </li>
            </>
        )
    };

    const Login = () => {
        return (
            <>
                <li>
                    {authReducer.isOwner ? authReducer.o_sNumber + ' 점주님 반갑습니다.'
                        : null}
                    {authReducer.isUser ? authReducer.u_id + " 님 반갑습니다."
                        : null}
                    {authReducer.isMaster ? "관리자로 로그인 되었습니다."
                        : null}
                </li>
                <li>
                    {authReducer.isOwner || authReducer.isMaster ?
                        <button onClick={logout} className={'button'}>로그아웃</button>
                        : null}
                    {authReducer.isUser ?
                        <User/>
                        : null}
                </li>
            </>
        )
    };
    const User = () => {
        return (
            <>
                <li>
                    <Link href={'/user'}><a>마이페이지</a></Link>
                </li>
                <li><Link href={'/user/shoppingcart'}><a>장바구니</a></Link></li>
                <li>
                    <button onClick={logout} className={'button'}>로그아웃</button>
                </li>
            </>
        )
    }
    return (
        <>
            <Backdrop
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={showLoginModal}
            >
                {showLoginModal && <LoginFormContainer/>}
            </Backdrop>
            <ScrollToTop/>
            <DivWrap className='header'>
                <DivMaster>
                    <Link href={'/master'}><a style={{marginRight: '20px'}}>관리자 인증</a></Link>
                    <Link href={'/owner'}><a>가게 인증</a></Link>
                </DivMaster>
                <Info>
                    <UL>
                        {!authReducer.isOwner && !authReducer.isUser && !authReducer.isMaster
                            ? <First/>
                            : <Login/>}
                    </UL>
                </Info>
            </DivWrap>

        </>
    )
}
