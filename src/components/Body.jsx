import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";
import {getRequest} from '../services/APIEndpoints';

let cart = [];

function addItemsToCart(item, count) {
    cart.push({item, count});
}

function onFavoriteClick(data) {
    return new Promise((resolve, reject) => {
        // send data
        resolve(true);
    });
}

function onAddToCartClick(data) {
    console.log(data);
}

function onAddBtnClick(data, setState) {
    let found = false;
    cart.forEach(cartItem => {
        if (cartItem.item.id === data.id) {
            cartItem.count++;
            found = true;
            data.hasItemInCart = true;
            data.cartBtnText = `${cartItem.count} Set`;
            setState(data);
        }
    });
    if (!found) {
        addItemsToCart(data, 1);
        data.hasItemInCart = true;
        data.cartBtnText = `1 Set`;
        setState(data);
    }
}

function onSubBtnClick(data, setState) {
    let idxFound = -1;
    cart.forEach((cartItem, idx) => {
        if (cartItem.item.id === data.id) {
            idxFound = idx;
        }
    });
    if (idxFound === -1) {
        return;
    }
    cart[idxFound].count--;
    if (cart[idxFound].count === 0) {
        cart[idxFound].item.hasItemInCart = false;
        cart[idxFound].item.cartBtnText = 'Cart';
        setState(cart[idxFound].item);
        cart.splice(idxFound, 1);
    } else {
        cart[idxFound].item.cartBtnText = `${cart[idxFound].count} Set`;
        cart[idxFound].item.hasItemInCart = true;
        setState(cart[idxFound].item);
    }
}

function updateViewAndAddFunction(data, setData) {
    setData(data);
    data.forEach((item, idx, arr) => {
        arr[idx].onFavoriteClick = onFavoriteClick;
        arr[idx].onAddToCartClick = onAddToCartClick;
        arr[idx].onAddBtnClick = onAddBtnClick;
        arr[idx].onSubBtnClick = onSubBtnClick;
        arr[idx].cartBtnText = 'Cart';
        arr[idx].hasItemInCart = false;
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
