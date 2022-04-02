import React, {useEffect, useState} from "react";
import firebase from "firebase/compat";
import {client} from "./api/client";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";
import {useSweetAlert} from "./useSweetAlert";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";

export default function FCM() {
    const history = useHistory();
    const {fireSweetAlert} = useSweetAlert();
    const dispatch = useDispatch();
    const {notificationReducer} = useSelector((state: RootState) => state);
    // const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    // const [notification, setNotification] = useState<{ title?: string, body?: string, etc?: string, img?: string, }>
    // ({
    //     title: '',
    //     body: '',
    //     etc: '',
    //     img: '',
    // });

    const firebaseConfig = {
        apiKey: "AIzaSyBMa0YeiEAbSBdEIyBipsrG_UW9hdyZyV8",
        authDomain: "final-4950c.firebaseapp.com",
        projectId: "final-4950c",
        storageBucket: "final-4950c.appspot.com",
        messagingSenderId: "1040933589559",
        appId: "1:1040933589559:web:3ea3ff6a096c2bbd2925b2",
        measurementId: "G-WN9HVPC304"
    };

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    const WEB_PUSH_CERT = 'BIjcgchJo47E2a7NKbJPqby0j5PcWJyh1kNW8VTTt1NqvVbUM2VwEyvF3VSdPwVWnfeBX3jezRQ2u4P_DFd2H9I';

    const getToken = () => {

        const URL = '/owner/pushToken';

        return messaging.getToken({vapidKey: WEB_PUSH_CERT})
            .then((currentToken) => {
                if (currentToken) {
                    setTokenFound(true);
                    client.post(URL, {token: currentToken})
                        .then(res => {
                        })
                        .catch(err => {
                        });
                } else {
                    setTokenFound(false);
                }
            }).catch((err) => {
            });
    }

    const onMessageListener = () =>
        new Promise((resolve) => {
            messaging.onMessage((payload) => {
                resolve(payload);
            });
        });

    onMessageListener()
        .then((payload: any) => {
            // setShow(true);
            fireSweetAlert({title: payload.data.title, text: payload.data.body, icon: 'info'});
            // setNotification({title: payload.data.title, body: payload.data.body});
            dispatch({type: 'received', payload: {show: true, title: payload.data.title, body: payload.data.body}});
        })
        .catch(err => {
        });

    useEffect(() => {
        getToken();
    }, [])

    return (
        <>
            {
                // isTokenFound || <Alert variant="outlined" color='error'>알림이 비활성화 상태입니다</Alert>
                isTokenFound || <Alert color="error">알림이 없습니다</Alert>
            }
            {
                notificationReducer.show ? <Alert severity="warning"
                                                  action={
                                                      <Button color="inherit" size="small"
                                                              onClick={() => history.push('/owner/reservationview')}>
                                                          보기
                                                      </Button>
                                                  }>
                        <AlertTitle>{notificationReducer.title}</AlertTitle>
                        {notificationReducer.body}
                    </Alert>
                    : isTokenFound && <Alert severity="success">알림이 없습니다</Alert>

            }

        </>
    )
}
