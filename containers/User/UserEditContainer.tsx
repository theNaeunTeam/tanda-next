import React, {useEffect, useLayoutEffect, useState} from 'react';
import {client} from "../../lib/api/client";
import history from "next/router";
import UserEdit from "../../components/User/UserEdit";
import {useSweetAlert} from "../../lib/useSweetAlert";


export default function UserEditContainer() {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const initValue = {
        u_id: '',
        u_pw: '',
        pwConfirm: '',
        u_cellPhone: '',
        u_email: '',
        u_gender: '',
        u_age: '',
        emailConfirm: '',
    };
    const {fireSweetAlert} = useSweetAlert();

    useLayoutEffect(() => {
        if (!localStorage.getItem('userToken')) history.replace('/err');
    }, []);


    const [userForm, setUserForm] = useState(initValue);

    const [u_id, setU_id] = useState(false);
    const [u_pw, setU_pw] = useState(false);
    const [u_cellPhone, setU_cellPhone] = useState(false);
    const [pwConfirm, setPwConfirm] = useState(false);
    const [u_email, setU_email] = useState(false);
    const [emailConfirm, setEmailConfirm] = useState(false);
    const [pwCompare, setPwCompare] = useState(false);
    const [emailCompare, setEmailCompare] = useState(false);

    const formValidate = (): boolean => {
        if (userForm.u_id.length < 5) {
            setU_id(true);
            return false;
        }
        setU_id(false);
        if (userForm.u_cellPhone.length < 11) {
            setU_cellPhone(true);
            return false;
        }
        setU_cellPhone(false);
        if (userForm.u_pw === null) {
            setU_pw(true);
            return false;
        }
        if (userForm.u_pw.length < 5) {
            setU_pw(true);
            return false;
        }
        setU_pw(false);
        if (userForm.pwConfirm.length < 5) {
            setPwConfirm(true);
            return false;
        }
        setPwConfirm(false);
        if (userForm.u_pw !== userForm.pwConfirm) {
            setPwConfirm(true);
            setU_pw(true);
            setPwCompare(true);
            return false;
        }
        setPwConfirm(false);
        setU_pw(false);
        setPwCompare(false);
        if (!regEmail.test(userForm.u_email)) {
            setU_email(true);
            return false;
        }
        setU_email(false);
        if (!regEmail.test(userForm.emailConfirm)) {
            setEmailConfirm(true);
            return false;
        }
        setEmailConfirm(false)
        if (userForm.emailConfirm !== userForm.u_email) {
            setEmailConfirm(true);
            setU_email(true);
            setEmailCompare(true);
            return false;
        }
        setEmailConfirm(false);
        setEmailCompare(false);
        setU_email(false);

        return true;
    };

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const tagName = (e.target as HTMLFormElement).name;
        if (tagName === 'u_cellPhone') {
            setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value.replace(/[^0-9]/g, '')});
            return false;
        }
        setUserForm({...userForm, [tagName]: (e.target as HTMLFormElement).value});
    }

    // ?????? ?????? ????????????
    const submitForm = async () => {
        if (!formValidate()) {
            fireSweetAlert({title: '?????? ????????? ????????? ?????????', icon: 'error'});
            return false;
        }

        const URL = '/user/userUpdate'
        try {
            const res = await client.post(URL, userForm);
            if (res.data === 1) {
                fireSweetAlert({title: '?????? ?????? ????????? ?????????????????????.', icon: 'success'});
                history.replace('/user')
            } else {
                alert('?????? ?????? ????????? ??????????????????.');
                history.back();
            }
        } catch (e: any) {
            if (e.response.status === 500) {
                fireSweetAlert({title: '?????? ?????? ??? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});
            } else if (e.response.status === 400) {
                fireSweetAlert({title: e.response.data.error,icon: 'error'});
            } else {
                alert('????????? ?????? ????????? ?????? ?????? ?????? ????????? ?????????????????????.\n?????? ??? ?????? ?????? ????????????.');
            }
        }
    };
    useEffect(() => {
        formValidate();
    }, [userForm]);
    useEffect(() => {
        userData();
    }, [])

    // ?????? ????????? ????????????
    const userData = async () => {
        const URL = '/user/userData';

        try {
            const res = await client.get(URL);
            setUserForm({...userForm, ...res.data});
            // setUserEmail(res.data);
        } catch (e: any) {
            if (e.response) {
                if (e.response.status === 500) {
                    fireSweetAlert({title: '?????? ?????? ??? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});

                } else if (e.response.status === 400) {
                    fireSweetAlert({title: e.response.data.error,icon: 'error'});
                } else {
                    fireSweetAlert({title: '???????????? ??????????????? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});
                }
            }
        }
    };
    return (
        <UserEdit handleFormChange={handleFormChange} u_id={u_id} userForm={userForm} u_cellPhone={u_cellPhone}
                  u_pw={u_pw} pwCompare={pwCompare} pwConfirm={pwConfirm} u_email={u_email} emailCompare={emailCompare}
                  emailConfirm={emailConfirm} setUserForm={setUserForm} submitForm={submitForm}/>
    )
}
