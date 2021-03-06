import React, {useEffect, useLayoutEffect, useState} from "react";
import history from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";
import {orderFormType, orderSubmitType} from "../../lib/types";
import {client} from "../../lib/api/client";
import Order from "../../components/User/Order";
import {RootState} from "../../store";

export default function OrderContainer() {
    const today = new Date();

    const defaultValue = {
        who: ' 제가 직접 받아요 ',
        time: '18:00',
        r_customOrder: '',
        payment: 'self',
        tumbler: '',
        kudasai: '',
        r_firstDate: `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
    }

    const dispatch = useDispatch();
    const {cartReducer, authReducer} = useSelector((state: RootState) => state);
    const [orderForm, setOrderForm] = useState<orderFormType>(defaultValue);
    const [cookies, setCookie, removeCookie] = useCookies(['cart']); // 건들지 말것
    const [o_sNumber, setO_sNumber] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
        if (cartReducer[0] === undefined) history.replace('/err');
    }, []);

    useEffect(() => {
        setO_sNumber(cookies.cart[0].o_sNumber);
        return () => {
            dispatch({type: 'orderOut'});
        }
    }, []);

    const submitForm = () => {
        setLoading(true);

        const URL = '/user/orderConfirm';

        const arr: orderSubmitType[] = [];

        for (let i = 0; i < cartReducer.length; i++) {
            const data: orderSubmitType = {
                r_firstDate: orderForm.r_firstDate,
                r_u_id: authReducer.u_id,
                r_g_code: cartReducer[i].g_code,
                r_firstTime: orderForm.time,
                r_count: cartReducer[i].g_count,
                r_customOrder: orderForm.who + orderForm.tumbler + orderForm.r_customOrder + orderForm.kudasai,
                r_owner: o_sNumber,
                r_pay: cartReducer.reduce((acc, cur) => acc + cur.g_discount * cur.g_count, 0),
            }
            arr.push(data);
        }

        client.post(URL, arr)
            .then(res => {
                dispatch({type: 'orderOut'});
                // removeCookie('cart', {path: '/'});
                if (res.data === false) {
                    alert('노쇼 카운트 5 이상이므로 주문 불가능 합니다. ');
                } else {
                    history.replace({
                        pathname: '/user/orderSuccess',
                        state: {
                            arr: arr,
                            orderForm: orderForm,
                            cartReducer: cartReducer,
                        }
                    })
                }
                // history.replace('/');

            })
            .catch(err => {
                alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {

        const tagName = (e.target as HTMLFormElement).id;

        if (tagName === 'kudasai' || tagName === 'tumbler') {
            if (!(e.target as HTMLFormElement).checked) (e.target as HTMLInputElement).value = '';
        }
        setOrderForm({...orderForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    return (
        <>
            <Order handleFormChange={handleFormChange} cartReducer={cartReducer} history={history} orderForm={orderForm}
                   today={today} submitForm={submitForm} o_sNumber={o_sNumber} loading={loading}/>
        </>
    )
}
