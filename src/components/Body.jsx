import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";

const posts = [{id: 1, msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'}, {
    id: 2,
    msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'
}, {id: 3, msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'}, {
    id: 4,
    msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'
}, {id: 5, msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'}, {
    id: 6,
    msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'
}, {id: 7, msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'}, {
    id: 8,
    msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'
}, {id: 9, msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'}, {
    id: 10,
    msg: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum'
}];

const useStyles = makeStyles(() => ({
    root: {
        padding: '1.5rem'
    }
}));

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        setData(posts);
    }, []);
    const fetchData = (pageNumber, limit = 8) => {
        setData(posts.slice(0));
    }
    return (
        <div className={classes.root}>
            {
                loading ? (
                    <ItemsPlaceholder height={`${200}px`} width={`${200}px`}
                                      repeat={Math.floor(window.innerWidth / 224) * 2}
                                      animation={'wave'}/>) : (
                    <InfiniteScroll data={data} loading={loading} onPageEnd={fetchData}/>)
            }
        </div>
    )
}

export default Body;
