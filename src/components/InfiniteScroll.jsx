import React, {useRef, useCallback, useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import MenuCardItem from "./MenuCardItem";

const useStyles = makeStyles(() => ({
    margin: {
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
    }
}));

function InfiniteScroll(props) {
    const {data: currState, loading, onPageEnd} = props;
    const [posts, setPosts] = useState([]);
    const classes = useStyles();
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
                posts.map((elem, idx) => {
                    if (idx === posts.length - 1) {
                        return (<div ref={lastItem} className={`col ${classes.margin}`} key={idx}>
                            <MenuCardItem data={elem}/>
                        </div>);
                    } else {
                        return (<div className={`col ${classes.margin}`} key={idx}><MenuCardItem data={elem}/></div>);
                    }
                })
            }
        </div>
    );
}

export default InfiniteScroll;
