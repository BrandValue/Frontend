import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {makeStyles} from "@material-ui/core/styles";
import ItemsPlaceholder from "./ItemsPlaceholder";
import {func} from "prop-types";

const posts = [{
    id: 1,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}, {
    id: 2,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}, {
    id: 3,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}, {
    id: 4,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}, {
    id: 5,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}, {
    id: 6,
    title: 'ABC',
    subHeader: 'CDE',
    imgTitle: 'Image',
    imgSrc: 'https://source.unsplash.com/random',
    description: 'Lorem epsumLorem epsumLorem epsumLorem epsumLorem epsumLorem epsum',
    isFavorite: true,
    onFavoriteClick,
    onOrderClick
}];

function onFavoriteClick(id) {
    console.log(id);
}

function onOrderClick(id) {
    console.log(id);
}

const useStyles = makeStyles(() => ({
    root: {
        padding: '1.5rem',
        display: "flex",
    }
}));

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
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
                    <InfiniteScroll data={data} loading={loading} onPageEnd={fetchData}/>
                )
            }
        </div>
    )
}

export default Body;
