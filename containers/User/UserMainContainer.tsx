import React, {useEffect, useState} from 'react';
import history from "next/router";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import {useSelector} from "react-redux";
import {carouselType, recommendType, shopList} from "../../lib/types";
import {RootState} from "../../store";
import UserMain from "../../components/User/UserMain/UserMain";


const UserMainContainer: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<carouselType[]>([]);
    const [recommends, setRecommends] = useState<recommendType[]>([]);
    const {userLocalMap} = useSelector((state: RootState) => state);
    const [shopList, setShopList] = useState<shopList[]>([]);

    useEffect(() => {
        fetchBanner();
        fetchRecommendList();
        fetchLocalList();
    }, [userLocalMap]);

    const fetchBanner = () => {
        const URL = '/common/banner';
        axios.get(URL)
            .then(res => {
                setItems(res.data)
                setLoading(false);
            })
            .catch(err => {
                alert('페이지 초기화 실패');
            })
    }

    const fetchRecommendList = () => {
        const URL = '/common/recommendList';
        axios.get(URL)
            .then(res => {
                setRecommends(res.data);
                setLoading(false);
            })
            .catch(err => {
            })
    }
    const fetchLocalList = () => {
        if (userLocalMap.lat != 0 && userLocalMap.lon != 0) {
            axios.get('/common/localList?LAT=' + userLocalMap.lat + '&LON=' + userLocalMap.lon)
                .then(res => {
                    setShopList(res.data);
                    setLoading(false);
                })
                .catch(err => {

                })
        } else {

        }
    }

    return (
        <>
            <UserMain loading={loading} items={items} shopList={shopList} recommends={recommends} history={history}/>
        </>
    )
}

export default UserMainContainer;
