import React from 'react';
import {Skeleton} from "@material-ui/lab";

function ItemsPlaceholder(props) {
    const {height, width, number} = props;
    return (
        <>
            <Skeleton/>
        </>
    );
}

export default ItemsPlaceholder;
