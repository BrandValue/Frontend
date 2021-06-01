import React from 'react';
import {Skeleton} from "@material-ui/lab";

function ItemsPlaceholder(props) {
    const {height, width, animation, repeat} = props;
    const loaderArr = new Array(repeat).fill({height, width});
    return (
        <div className="row">{
            loaderArr.map(config => (
                <div className={'col-sm'}>
                    <Skeleton width={config.width} height={config.height} animation={config.animation}/>
                </div>

            ))
        }
        </div>
    );
}

export default ItemsPlaceholder;
