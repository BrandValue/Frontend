import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";
import {getRequest} from '../services/APIEndpoints';
import {Modal} from "@material-ui/core";

let cart = [];

function addItemsToCart(item, count) {
    cart.push({item, count});
}

function onFavoriteClick(data, setState) {
    return new Promise((resolve, reject) => {
        // send data
        resolve(true);
    });
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

function updateViewAndAddFunction(data, setData, onAddToCartClick) {
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

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '1.5rem',
        display: "flex",
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

function Body() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [segmentLoading, setSegmentLoading] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    function handleModalClose() {
        setModalState(false);
    }

    function onAddToCartClick(data) {
        setModalState(true);
    }

    useEffect(() => {
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData, onAddToCartClick);
            setLoading(false);
        });
    }, []);

    const fetchData = (pageNumber, limit = 8) => {
        setSegmentLoading(true);
        getRequest('food/food-item').then(({data}) => {
            updateViewAndAddFunction(data, setData, onAddToCartClick);
            setSegmentLoading(false);
        });
    }

    const modalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );
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
            <Modal
                open={modalState}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
        </div>
    )
}

export default Body;
