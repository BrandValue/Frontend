import React, {useEffect, useState} from 'react';
import InfiniteScroll from "./InfiniteScroll";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import BackGround from "../assets/backgroundImages/background.jpg";

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
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        padding: '1.5rem'
    },
    skeletonLoader: {
        height: "350px",
        width: "350px",
        [theme.breakpoints.down('md')]: {
            width: "250px",
            height: "250px"
        },
    }
}));

function Body() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    useEffect(() => {
        setData(posts);
    }, []);
    // setTimeout(() => {
    //     setLoading(false);
    // }, 2000);
    const fetchData = (pageNumber, limit = 8) => {
        setData(posts.slice(0));
    }
    return (
        <div className={`${classes.root}`}>
            {
                // loading ? (<><Skeleton className={classes.skeletonLoader}/>
                //     <Skeleton className={classes.skeletonLoader}/><Skeleton className={classes.skeletonLoader}/></>) : (
                //     <InfiniteScroll data={data} loading={loading} onPageEnd={fetchData}/>)
                (<div className={'row'}>
                    <div className={'col-sm'}>
                        <Skeleton className={classes.skeletonLoader}/>
                    </div>
                    <div className={'col-sm'}>
                        <Skeleton className={classes.skeletonLoader}/>
                    </div>
                    <div className={'col-sm'}>
                        <Skeleton className={classes.skeletonLoader}/>
                    </div>
                    <div className={'col-sm'}>
                        <Skeleton className={classes.skeletonLoader}/>
                    </div>

                </div>)
            }
        </div>
    )
}

export default Body;
