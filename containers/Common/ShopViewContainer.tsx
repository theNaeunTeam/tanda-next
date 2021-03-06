import React, {useEffect, useRef, useState} from 'react';
import {client} from "../../lib/api/client";
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";
import {aboutStoreType, categoryType, shopBtnColor, shopViewType} from "../../lib/types";
import {fetch_Category_Per_sNumber} from "../../lib/api/Fetch_Category_Per_sNumber";
import GoodsMode from "../../components/Common/ShopView/GoodsMode";
import ShopDetail from "../../components/Common/ShopView/ShopDetail";
import ShopView from "../../components/Common/ShopView/ShopView";
import {useSweetAlert} from "../../lib/useSweetAlert";
import {RootState} from "../../store";
import history from "next/router";
import {useRouteMatch} from "react-router";

export default function ShopViewContainer() {

    const {authReducer} = useSelector((state: RootState) => state);
    const initialSelect = useRef(null);
    const dispatch = useDispatch();
    const initColor = {
        case1: true,
        case2: false,
        case3: false,
        case4: false,
        case5: false,
        case6: false,
        case7: false,
    };

    const initColor2 = {
        case1: false,
        case2: false,
        case3: false,
        case4: false,
        case5: false,
        case6: false,
        case7: false,
    };

    const initGoods2 = [{
        g_owner: '',
        g_code: 0,
        g_name: '',
        g_count: 0,
        g_price: 0,
        g_discount: 0,
        g_detail: '',
        g_image: '',
        g_expireDate: '',
        g_status: 0,
        g_category: '',
        cooked: 0,
        drink: 0,
        freeze: 0,
        fresh: 0,
        gagong: 0,
        other: 0,
    }];

    const initStore = {
        o_sNumber: '',
        o_approval: 0,
        o_pw: '',
        token: '',
        o_phone: '',
        o_name: '',
        o_cellPhone: "",
        o_address: "",
        o_latitude: '',
        o_longitude: '',
        o_date: '',
        o_time1: "",
        o_time2: '',
        o_image: "",
    };

    const {fireSweetAlert} = useSweetAlert();
    const [aboutStore, setAboutStore] = useState<aboutStoreType>(initStore);
    const [modal, setModal] = useState(true);
    const [color, setColor] = useState<shopBtnColor>(initColor);
    const [rows, setRows] = useState<shopViewType[]>(initGoods2);
    const [temp, setTemp] = useState<shopViewType[]>([]);
    const [category, setCategory] = useState<categoryType>({
        gagong: 0,
        other: 0,
        freeze: 0,
        cooked: 0,
        fresh: 0,
        drink: 0,
        g_owner: '',
    });

    //?????? state
    const [favorites, setFavorites] = useState(false);


    const categoryChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        type keys = keyof shopBtnColor;
        const btnValue = (e.target as HTMLButtonElement).name as keys; // button??? name?????? ?????????
        setColor({...initColor2, [btnValue]: !color[btnValue]});

        switch (btnValue) {
            case 'case1':
                setRows([...temp]);
                break;
            case 'case2':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '?????????')]);
                break;
            case 'case3':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '????????????')]);
                break;
            case 'case4':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '????????????')]);
                break;
            case 'case5':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '????????????')]);
                break;
            case 'case6':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '??????/?????????')]);
                break;
            case 'case7':
                setRows([...temp.filter((x: shopViewType) => x.g_category === '????????? ??????')]);
                break
            default:
                break;
        }
    };

    interface ImatchParams {
        o_sNumber: string;
    }

    // ??????????????? GET???????????? match?????????
    const match = useRouteMatch<ImatchParams>();

    // ????????????api
    const gooodsTableInit = async () => {

        fetch_Category_Per_sNumber(match.params.o_sNumber)
            .then(res => {
                setCategory(res);
            })
            .catch(err => {
                alert('???????????? ?????? ???????????? ?????????????????????.');
            })

        const URL = '/common/storeGoodsView';

        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setRows(res.data);
            setTemp(JSON.parse(JSON.stringify(res.data)));
        } catch (e) {
        }
    };

    //???????????? api
    const storeTableInit = async () => {

        const URL = '/common/storeView';
        try {
            const res = await client.get(URL + '?o_sNumber=' + match.params.o_sNumber);
            setAboutStore(res.data);
        } catch (e) {
        }
    }

    useEffect(() => {
        favorCheck();
    }, [authReducer.isUser])

    // ???????????? ?????? api
    const favorCheck = async () => {
        if (!authReducer.isUser) {
            return false;
        }
        const URL = '/user/favorCheck';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id
        }
        try {
            const res = await client.post(URL, data);

            setFavorites(res.data);
        } catch (e) {
        }
    }


    // ???????????? ?????? api
    const favorInsert = async () => {
        if (!authReducer.isUser) {
            // fireSweetAlert({title: '???????????? ????????? ???????????????', text: '?????? ????????? ????????????', icon: 'warning'});
            dispatch({type: true});
            return false;
        }
        const URL = '/user/addFavor';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
            f_p_user_id: authReducer.u_id
        }
        try {
            const res = await client.post(URL, data);
            setFavorites(true);
            fireSweetAlert({title: '??????????????? ?????????????????????', text: '?????????????????? ???????????? ??? ????????????.', icon: 'success'});
        } catch (e) {
        }
    }
    // ???????????? ?????? api
    const favorOff = async () => {
        if (!authReducer.isUser) {
            // fireSweetAlert({title: '???????????? ????????? ???????????????', text: '?????? ????????? ????????????', icon: 'warning'});
            dispatch({type: true})
            return false;
        }
        const URL = '/user/FavorOff';
        const data = {
            f_o_sNumber: match.params.o_sNumber,
        }
        try {
            const res = await client.post(URL, data);
            setFavorites(false);
            fireSweetAlert({title: '?????????????????? ?????????????????????', text: '?????????????????? ???????????? ??? ????????????.', icon: 'success'});
        } catch (e) {
        }
    }

    // ?????? ???????????? ?????? ??????
    useEffect(() => {
        if (initialSelect.current) {
            (initialSelect.current as HTMLInputElement).focus();
        }
        gooodsTableInit();
        storeTableInit();
        window.scrollTo(0, 0);
    }, [])

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);

    // ??????????????? ??????
    const saveGoods = (e: React.FormEvent<HTMLFormElement>, max: number) => {
        e.preventDefault();
        let cntOver = false;
        if (!e.target) return false;
        const g_count = Number((e.target as unknown as any[])[0].value);
        const g_code = Number((e.target as unknown as any[])[1].value);

        if (!authReducer.isUser) {
            // fireSweetAlert({title: '???????????? ????????? ???????????????', text: '?????? ????????? ????????????', icon: 'warning'});
            dispatch({type: true});
            return false;
        }

        let cookieCart: any = [];

        if (cookies.cart) { // ????????? ?????? ??????
            cookieCart = [...cookies.cart];
            const findDiffOwner = cookieCart.filter((x: any) => x.o_sNumber != match.params.o_sNumber);

            if (findDiffOwner.length !== 0) { // ??????????????? ?????????????????? ?????? ?????????????????? ?????? ????????? ?????? ??????
                if (window.confirm('??????????????? ?????? ????????? ????????? ??????????????????. ?????????????????????????')) {
                    removeCookie('cart', {path: '/'});
                    // return false;
                    cookieCart = [{
                        g_count: g_count,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    }];
                } else {
                    return false;
                }

            } else {

                const findSameGoods = cookieCart.findIndex((x: any) => x.g_code == g_code);

                if (findSameGoods !== -1) { // ?????? ?????? ????????? ????????? ???????????? ?????? ??????

                    let acc = g_count + Number(cookieCart[findSameGoods].g_count);
                    if (acc > max) {
                        acc = max;
                        cntOver = true;
                        // alert(`??????????????? ?????? ??? ?????? ??????????????? "${acc}???"??? ?????????????????????`);
                        fireSweetAlert({
                            title: '?????? ????????? ??????????????????',
                            text: `??????????????? ?????? ??? ?????? ??????????????? "${acc}???"??? ?????????????????????`,
                            icon: 'info'
                        });
                    }
                    cookieCart[findSameGoods] = {
                        g_count: acc,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    }
                } else {
                    cookieCart.push({
                        g_count: g_count,
                        g_code: g_code,
                        id: authReducer.u_id,
                        o_sNumber: match.params.o_sNumber
                    });
                }
            }
        } else {
            cookieCart.push({
                g_count: g_count,
                g_code: g_code,
                id: authReducer.u_id,
                o_sNumber: match.params.o_sNumber
            });
        }
        setCookie('cart', cookieCart, {path: '/'});
        // if (window.confirm('??????????????? ?????????????????????????')) {
        //     history.push('/user/shoppingcart');
        // }
        if (!cntOver) fireSweetAlert({title: '??????????????? ?????????????????????', icon: 'success'});
    };

    return (
        <>
            <ShopView favorites={favorites} favorOff={favorOff} favorInsert={favorInsert} aboutStore={aboutStore}
                      setModal={setModal} initialSelect={initialSelect} topic={match.params.o_sNumber}/>
            {
                modal
                    ? <GoodsMode
                        color={color}
                        categoryChange={categoryChange}
                        category={category}
                        rows={rows}
                        saveGoods={saveGoods}
                    />
                    : <div className={'ShopViewDivContainerContainer'}>
                        <ShopDetail aboutStore={aboutStore} fireSweetAlert={fireSweetAlert}/>
                    </div>

            }
            <div style={{textAlign: 'center', marginBottom: '100px'}}>
                <button className='cartBtn' style={{width: '50%'}}
                        onClick={() => history.push('/user/shoppingcart')}>????????????
                    ??????
                </button>

            </div>
        </>
    );
};
