import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 'auto',
        height: 350,
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));

export default function ImageGridList({tileData}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <GridList cellHeight={'auto'} spacing={1} className={classes.gridList}>
                {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} width={'100%'} height={'auto'}/>
                        <GridListTileBar
                            title={tile.title}
                            titlePosition="top"
                            actionIcon={
                                <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                                    {
                                        tile.featured ? (<StarIcon/>) : (<StarBorderIcon/>)
                                    }
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}
