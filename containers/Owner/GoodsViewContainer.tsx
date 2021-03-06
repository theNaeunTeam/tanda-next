import React, {useEffect, useLayoutEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button} from "@mui/material";
import styled from "styled-components";
import {client} from "../../lib/api/client";
import {useDispatch, useSelector} from "react-redux";
import history from "next/router";
import {goodsViewType} from '../../lib/types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {GoodsViewTableBuilder} from "../../components/Owner/GoodsViewTableBuilder";
import {useSweetAlert} from "../../lib/useSweetAlert";
import {RootState} from "../../store";


const DivContainer = styled.div`

  justify-content: center;
  margin: 20px;
  padding: 10px;
  height: 100%;
  width: 100%;
  clear: both;
  text-align: center;
  justify-content: center;
`;

export default function GoodsViewContainer() {
    const {fireSweetAlert} = useSweetAlert();

    const dispatch = useDispatch();
    const {authReducer} = useSelector((state: RootState) => state);
    useLayoutEffect(() => {
        if (!localStorage.getItem('ownerToken')) history.replace('/err');
    }, []);


    const [list, setList] = useState<goodsViewType[]>([]);
    const [g_category, setG_category] = useState('');
    const [g_status, setG_status] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    useEffect(() => {
        if (localStorage.getItem('ownerToken')) {
            searchGoods();
        }
    }, [startIndex]);

    const searchGoods = async () => {
        const URL = '/owner/search';
        setLoading(true);
        if (g_category != '' || g_status != '' || searchInput != '') {
            setStartIndex(0);
        }
        try {
            const res = await client.get(`${URL}?g_category=${g_category}&g_status=${g_status}&searchInput=${searchInput}&startIndex=${startIndex}`);
            setList(res.data);

        } catch (e: any) {
            if (e.response.data.status === 500) {
                fireSweetAlert({title: '?????? ?????? ??? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});
            } else {
                fireSweetAlert({title: '???????????? ??????????????? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});
            }

        }
        setLoading(false);

    };
    const modifyGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name;
        const idx = list.findIndex((x) => x.g_code.toString() === g_code);
        dispatch({type: 'passToModifyPage', payload: list[idx]});
        history.push('/owner/addproduct');
    };

    const deleteGoods = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const g_code: string = (e.target as HTMLButtonElement).name;
        const URL = '/owner/deleteGoods';
        client.patch(URL, {g_code: g_code})
            .then(res => {
                fireSweetAlert({title: '?????? ?????? ?????? ?????????????????????', icon: 'success'});
                searchGoods();
            })
            .catch(e => {
                const err = e.response;
                if (err.status === 500) {
                    fireSweetAlert({title: '?????? ?????? ??? ????????? ??????????????????.', text:'?????? ??? ?????? ?????? ????????????.', icon: 'error'});
                } else if (err.status === 400) {
                    fireSweetAlert({title: e.data.error, icon: 'error'});
                } else {
                    alert('????????? ?????? ????????? ?????? ?????? ???????????? ?????? ?????????????????????.');
                }

            })
    };

    const indexMinus = () => {
        if (startIndex === 0) {
            fireSweetAlert({title: '??? ????????? ?????????', icon: 'info'});
        } else {
            setStartIndex(startIndex - 10);
        }

    }
    const indexPlus = () => {
        if (list.length === 10) {
            setStartIndex(startIndex + 10);
        } else {
            fireSweetAlert({title: '????????? ????????? ?????????', icon: 'info'});
        }
    }


    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <DivContainer>
                <h1 style={{marginBottom: '50px'}}>????????????</h1>
                <div>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
                        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={g_category}
                            onChange={e => setG_category(e.target.value)}
                        >
                            <MenuItem value=''>?????? ??????</MenuItem>
                            <MenuItem value='?????????'>?????????</MenuItem>
                            <MenuItem value='????????????'>????????????</MenuItem>
                            <MenuItem value='????????????'>????????????</MenuItem>
                            <MenuItem value='????????????'>????????????</MenuItem>
                            <MenuItem value='??????/?????????'>??????/?????????</MenuItem>
                            <MenuItem value='????????? ??????'>????????? ??????</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
                        <InputLabel id="demo-simple-select-standard-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={g_status}
                            onChange={e => setG_status(e.target.value)}
                        >
                            <MenuItem value=''>?????? ??????</MenuItem>
                            <MenuItem value={'0'}>?????????</MenuItem>
                            <MenuItem value={'1'}>????????????</MenuItem>
                            <MenuItem value={'2'}>????????????</MenuItem>

                        </Select>
                    </FormControl>

                    <TextField className='goodsNameS' id="outlined-basic" label="?????????" variant="outlined" name={'total'}
                               onChange={e => setSearchInput(e.target.value as string)}/>

                    <Button sx={{m: 1.3}} variant="outlined" onClick={searchGoods}>??????</Button>


                </div>
                <table className='goodstbl'>
                    <thead>

                    <tr>
                        <th>?????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>?????????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>????????????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>????????????</th>
                    </tr>

                    </thead>
                    <tbody>
                    {list.length === 0 ?
                        <div className='centerDiv'><span className='centerSpan'>????????? ????????? ????????????.</span></div>
                        : list.map((data, idx) => <GoodsViewTableBuilder data={data} idx={idx} key={idx}
                                                                         deleteGoods={deleteGoods}
                                                                         modifyGoods={modifyGoods}/>)}
                    </tbody>
                </table>
                <div className='aa' style={{height: '80px', display: 'inline-flex'}}>
                    <span onClick={indexMinus}>??? ??????</span>
                    <div style={{fontSize: '20px', margin: '0 10px'}}>{startIndex / 10 + 1}</div>
                    <span onClick={indexPlus}> ?????? ???</span>
                </div>

            </DivContainer>
        </>
    )
}
