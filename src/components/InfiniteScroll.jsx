import React, {useRef, useCallback, useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import MenuCardItem from "./MenuCardItem";
import ItemsPlaceholder from "./ItemsPlaceholder";

const useStyles = makeStyles(() => ({
    margin: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
    }
}));

function InfiniteScroll(props) {
    const {data: currState, loading, onPageEnd, cartItems} = props;
    const [posts, setPosts] = useState([]);
    const [segmentLoading, setSegmentLoading] = useState(loading);
    const classes = useStyles();
    useEffect(() => {
        setSegmentLoading(loading);
    }, [loading]);
    useEffect(() => {
        setPosts(prevState => [...prevState, ...currState]);
    }, [currState]);
    const observer = useRef(null);
    const lastItem = useCallback((node) => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onPageEnd(0, 9);
            }
        });
        if (node) {
            observer.current?.observe(node);
        }
    }, [loading, onPageEnd]);
    return (
        <div className={'row'}>
            {
                posts.map((elem, idx, array) => {
                    let foundIdx = -1, found = false;
                    cartItems.forEach((cartItem, idx) => {
                        if (cartItem.item.id === elem.id) {
                            found = true;
                            foundIdx = idx;
                        }
                    });

                    if (found) {
                        const count = cartItems[foundIdx].count;
                        const cartItem = cartItems[foundIdx].item;
                        cartItems.splice(foundIdx, 1);
                        elem.cartBtnText = cartItem.cartBtnText;
                        elem.hasItemInCart = true;
                        cartItems.push({item: elem, count});
                    }

                    if (idx >= posts.length - 5) {
                        return (<div ref={lastItem} className={`col ${classes.margin}`} key={idx}>
                            <MenuCardItem data={elem}/>
                        </div>);
                    } else {
                        return (
                            <div className={`col ${classes.margin}`} key={idx}><MenuCardItem data={elem}/></div>);
                    }
                })
            }
            {
                segmentLoading ? <ItemsPlaceholder height={`${200}px`} width={`${200}px`}
                                                   repeat={Math.floor(window.innerWidth / 224) * 2}
                                                   animation={'wave'}/> : ''
            }
        </div>
    );
}

export default InfiniteScroll;
