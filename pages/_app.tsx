import '../styles/common.css';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import '../styles/UserMain.scss';
import '../styles/button.scss';
import '../styles/ShopStyle.scss';
import '../styles/ChangeBanner.scss';
import '../styles/event.scss';
import '../styles/Header.scss';
import '../styles/MasterLoginForm.scss';
import '../styles/masterOwnerDash.scss';
import '../styles/mycompany.scss';
import '../styles/nav.scss';
import '../styles/order.scss';
import '../styles/ScrollToTop.scss';
import '../styles/shopList.scss';
import '../styles/shoppingCart.scss';
import '../styles/table.scss';

import type {AppProps} from 'next/app'
import {RootState, wrapper} from "../store";
import {client} from "../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import Head from 'next/head';
import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import MasterNavbar from "../components/Master/MasterNavbar";
import OwnerNavbar from "../components/Owner/OwnerNavbar";
import MainBar from "../components/Common/MainBar";
import {useEffect} from "react";

function app({Component, pageProps}: AppProps) {

    const {authReducer} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => { // 웹페이지 최초 접속 시 자동로그인 시도
        autoLogin();
    }, []);

    const autoLogin = () => {
        let URL = '';
        if (localStorage.getItem('userToken')) {
            URL = '/user/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'userMode', payload: localStorage.getItem('u_id')
                })
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('ownerToken')) {
            URL = '/owner/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'ownerMode',
                    payload: localStorage.getItem('o_sNumber')
                });
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('masterToken')) {
            URL = '/master/tokencheck';
            client.get(URL).then(() => {
                dispatch({
                    type: 'masterMode'
                })
            }).catch(() => {
                localStorage.clear();
            })
        }
        if (localStorage.getItem('lat') && localStorage.getItem('lon')) {
            dispatch(
                {
                    type: 'getLocaled',
                    payload: {
                        lat: localStorage.getItem('lat'),
                        lon: localStorage.getItem('lon')
                    }
                })
        }
    };

    return (
        <>

            <Head>
                <title>탄다오더</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <div className='bodyWrapper'>
                <Header/>
                {authReducer.isMaster ? <MasterNavbar/>
                    : authReducer.isOwner ? <OwnerNavbar/>
                        : <MainBar/>}
                <div className='bodyContent'>
                    <Component {...pageProps} />
                </div>
                <Footer/>
            </div>
        </>
    )
}


export default wrapper.withRedux(app);
