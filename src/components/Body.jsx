import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";

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

function Body(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(posts);
    }, []);
    const loading = false;
    const fetchData = (pageNumber, limit = 8) => {
        setData(posts.slice(0));
    }
    return (
        <>
            <InfiniteScroll data={data} loading={loading} onPageEnd={fetchData}/>
        </>
    )
}

export default Body;
