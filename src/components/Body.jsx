import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";
import {getRequest} from '../services/APIEndpoints';

function onFavoriteClick(id) {
    console.log(id);
}

function onAddToCartClick(id) {
    console.log(id);
}

function onAddBtnClick(id) {
    console.log(id);
}

function onSubBtnClick(id) {
    console.log(id);
}

function updateViewAndAddFunction(data, setData) {
    setData(data);
    data.forEach((item, idx, arr) => {
        arr[idx].onFavoriteClick = onFavoriteClick;
        arr[idx].onAddToCartClick = onAddToCartClick;
        arr[idx].onAddBtnClick = onAddBtnClick;
        arr[idx].onSubBtnClick = onSubBtnClick;
        arr[idx].cartBtnText = 'Cart';
    });
}

const useStyles = makeStyles(() => ({
    root: {
        padding: '1.5rem',
        display: "flex",
    }
}));

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [segmentLoading, setSegmentLoading] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData);
            setLoading(false);
        });
    }, []);
    const fetchData = (pageNumber, limit = 8) => {
        setSegmentLoading(true);
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData);
            setSegmentLoading(false);
        });
    }
    return (
        <div className={classes.root}>
            {
                loading ? (
                    <ItemsPlaceholder height={`${200}px`} width={`${200}px`}
                                      repeat={Math.floor(window.innerWidth / 224) * 2}
                                      animation={'wave'}/>) : (
                    <InfiniteScroll data={data} loading={segmentLoading} onPageEnd={fetchData}/>
                )
            }
        </div>
    )
}

export default Body;
