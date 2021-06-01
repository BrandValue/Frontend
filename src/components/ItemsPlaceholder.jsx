import React from 'react';
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

function ItemsPlaceholder(props) {
    const {height, width, animation, repeat} = props;
    const loaderArr = new Array(repeat).fill({height, width, animation});
    const useStyles = makeStyles((theme) => ({
        skeletonLoader: {
            width,
            height,
            [theme.breakpoints.down('sm')]: {
                width: '200px',
                height: '200px',
            },
        },
        disp: {
            display: "flex"
        }
    }));
    const classes = useStyles();
    return (
        // <div className="row ">
        //     {loaderArr.map(config => (
        //         <div className={`col`}>
        //             <Skeleton className={`${classes.skeletonLoader}`} animation={config.animation}
        //             />
        //         </div>
        //
        //     ))}
        // </div>
        <div className={`row no-gutters ${classes.disp}`}>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
            <div className="col-12 col-sm-6 col-md-8">
                <Skeleton className={`${classes.skeletonLoader}`}/>
            </div>
        </div>
    );
}

export default ItemsPlaceholder;
