import React from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {GrMapLocation} from "react-icons/gr";
import {Map, MapMarker, MarkerClusterer} from "react-kakao-maps-sdk";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ShopListBuilder from "./ShopListBuilder";
import styled from "styled-components";
import {shopList} from "../../../lib/types";
import {NextRouter} from "next/router";

const DivMarker = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
`

export default function ShopList(props: {
    loading: boolean;
    lat: number;
    lon: number;
    list: shopList[];
    marker: boolean[];
    setMarker: React.Dispatch<React.SetStateAction<boolean[]>>;
    history: NextRouter;
    marks: { value: number, label: string }[];
    setRange: React.Dispatch<React.SetStateAction<string>>;
    goodsName: string;
    setGoodsName: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;
    getLoc: () => void;
    range: string;
    displayRange: string;
    displayName: string;
    showList: boolean;
    noMoreData: boolean;
    inViewRef: (node?: (Element | null | undefined)) => void;
}) {
    const {
        loading,
        lat,
        lon,
        list,
        marker,
        setMarker,
        history,
        marks,
        setRange,
        goodsName,
        setGoodsName,
        sortOption,
        setSortOption,
        getLoc,
        range,
        displayRange,
        displayName,
        showList,
        noMoreData,
        inViewRef,
    } = props;

    return (
        <>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <div className={'DivContainer'}>
                <h3>?????? ?????? <GrMapLocation/></h3>
                <Map
                    center={{lat: lat, lng: lon}}
                    style={{width: "80%", height: "400px"}}
                    level={5}
                >
                    <MarkerClusterer
                        averageCenter={true} // ??????????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ????????? ??????
                        minLevel={4} // ???????????? ??? ?????? ?????? ??????
                    >
                        {list.map((data: any, idx: number) => {
                                marker.push(false);
                                return (
                                    <MapMarker key={`MapMarker${idx}`}
                                               position={{lat: Number(data.o_latitude), lng: Number(data.o_longitude)}}
                                               onClick={() => {
                                                   const cp = [...marker];
                                                   cp[idx] = true;
                                                   setMarker(cp);
                                               }}
                                    >
                                        {marker[idx] && <DivMarker key={`DivMarker${idx}`}
                                                                   onClick={() => history.push(`/shopView/${data.o_sNumber}`)}
                                                                   onMouseLeave={() => {
                                                                       const cp = [...marker];
                                                                       cp[idx] = false;
                                                                       setMarker(cp);
                                                                   }}
                                                                   style={{cursor: "help",}}>
                                            {data.o_name}
                                        </DivMarker>
                                        }
                                    </MapMarker>
                                )
                            }
                        )}
                    </MarkerClusterer>
                </Map>

                <div className={'DivHalfMenu'}>
                    <Box className='box'>
                        <Slider style={{margin: '30px 0px 50px'}}
                                min={0.1}
                                max={2}
                                defaultValue={1}
                                step={0.1}
                                marks={marks}
                                valueLabelDisplay="auto"
                                onChange={e => setRange((e.target as HTMLInputElement).value)}
                        />

                        <div style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
                            <TextField
                                label="??????????????? ??????"
                                value={goodsName}
                                onChange={e => setGoodsName(e.target.value)}
                            />

                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="demo-simple-select-helper-label">??????</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    value={sortOption}
                                    label="??????"
                                    onChange={e => {
                                        setSortOption(e.target.value);
                                    }}
                                >
                                    <MenuItem value={'????????????'}>????????????</MenuItem>
                                    <MenuItem value={'???????????????'}>???????????????</MenuItem>
                                    <MenuItem value={'???????????????'}>???????????????</MenuItem>
                                    <MenuItem value={'???????????????'}>???????????????</MenuItem>
                                </Select>
                                {/*<FormHelperText>??????,?????? ????????? ????????? ??? ????????????</FormHelperText>*/}
                            </FormControl>
                        </div>

                        <button className='shopMapBtn' style={{width: '75%', margin: '15px'}} color="error"
                                onClick={getLoc}>{`?????? ${range}km ??? ??????`}</button>
                    </Box>
                </div>
                {list.length !== 0 &&
                    <h2>
                        {`?????? ${displayRange}km ??? ${displayName ? displayName : '????????????'}??? ?????? ?????? ??????`}
                    </h2>
                }

                {
                    showList && list.map((data: shopList, idx: number) => <ShopListBuilder data={data} idx={idx}
                                                                                           key={`slb${idx}`}/>)
                }
            </div>
            <br/><br/>
            {list.length !== 0 && <div ref={noMoreData ? undefined : inViewRef}/>}
        </>
    )
}
