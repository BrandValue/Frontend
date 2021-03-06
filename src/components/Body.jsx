import React, {createRef, useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";
import {getRequest} from '../services/APIEndpoints';
import {Modal} from "@material-ui/core";
import CartItemDisplay from "./CartItemDisplay";

let id = 0;
let cart = [];

function addItemsToCart(item, count) {
    cart.push({item, count});
}

function getCartValue() {
    let totalValue = 0;
    cart.forEach(cartItem => {
        totalValue += parseInt(cartItem.item.price.price) * parseInt(cartItem.count);
    });
    return totalValue;
}

function onFavoriteClick(data, setState) {
    return new Promise((resolve, reject) => {
        // send data
        resolve(true);
    });
}

function onAddBtnClick(data) {
    let found = false;
    cart.forEach(cartItem => {
        if (cartItem.item.id === data.id) {
            cartItem.count++;
            found = true;
            data.hasItemInCart = true;
            data.cartBtnText = `${cartItem.count} Set`;
        }
    });
    if (!found) {
        addItemsToCart(data, 1);
        data.hasItemInCart = true;
        data.cartBtnText = `1 Set`;
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function onSubBtnClick(data) {
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
        cart.splice(idxFound, 1);
    } else {
        cart[idxFound].item.cartBtnText = `${cart[idxFound].count} Set`;
        cart[idxFound].item.hasItemInCart = true;
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function onCartItemDelete(data) {
    let idxFound = -1;
    cart.forEach((cartItem, idx) => {
        if (cartItem.item.id === data.id) {
            idxFound = idx;
        }
    });
    if (idxFound === -1) {
        return;
    }
    cart[idxFound].count = 0;
    cart[idxFound].item.hasItemInCart = false;
    cart[idxFound].item.cartBtnText = 'Cart';
    cart.splice(idxFound, 1);
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function updateViewAndAddFunction(data, setData, onAddToCartClick, setBtnText) {
    setData(data);
    data.forEach((item, idx, arr) => {
        arr[idx].id = id++;
        arr[idx].onFavoriteClick = onFavoriteClick;
        arr[idx].onAddToCartClick = onAddToCartClick;
        arr[idx].onAddBtnClick = onAddBtnClick;
        arr[idx].onSubBtnClick = onSubBtnClick;
        arr[idx].cartBtnText = 'Cart';
        arr[idx].hasItemInCart = false;
        arr[idx].setBtnText = setBtnText;
    });
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1.5rem',
        display: "flex",
    }
}));

function Body() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [segmentLoading, setSegmentLoading] = useState(false);
    const [, setBtnText] = useState('');
    const [cartLength, setCartLength] = useState(cart.length);
    const [cartValue, setCartValue] = useState(getCartValue());

    function handleModalClose() {
        setModalState(false);
    }

    function onAddToCartClick(data) {
        setCartLength(cart.length);
        setCartValue(getCartValue());
        setModalState(true);
    }

    useEffect(() => {
        cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cart.length) {
            document.title = `(${cart.length}) Let's eat`;
        }
    }, []);

    useEffect(() => {
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData, onAddToCartClick, setBtnText);
            setLoading(false);
        });
    }, []);

    const fetchData = (pageNumber, limit = 8) => {
        setSegmentLoading(true);
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData, onAddToCartClick, setBtnText);
            setSegmentLoading(false);
        });
    }

    const refToCartItemDisplay = createRef();

    return (
        <div className={classes.root}>
            {
                loading ? (
                    <ItemsPlaceholder height={`${200}px`} width={`${200}px`}
                                      repeat={Math.floor(window.innerWidth / 224) * 2}
                                      animation={'wave'}/>) : (
                    <InfiniteScroll data={data} loading={segmentLoading} onPageEnd={fetchData} cartItems={cart}/>
                )
            }
            <Modal
                open={modalState}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                {<CartItemDisplay cartData={cart} onClose={handleModalClose} onAddBtnClick={onAddBtnClick}
                                  onSubBtnClick={onSubBtnClick} onCartItemDelete={onCartItemDelete}
                                  setCartLength={setCartLength} cartLength={cartLength}
                                  getCartValue={getCartValue} setCartValue={setCartValue} cartValue={cartValue}
                                  ref={refToCartItemDisplay}/>}
            </Modal>
        </div>
    )
}

export default Body;
