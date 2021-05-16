import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/logo.svg'
import AccountCircle from "@material-ui/icons/AccountCircle";
import {MoreVert} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const classes = useStyles();
    const imageSource = props.config.imageSource;
    const title = props.config.title;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <span className="px-lg-2 px-sm-1"><img src={imageSource.default} alt='logo'/></span>
                        <span className="px-lg-2 px-sm-1">{title}</span>
                    </Typography>
                    <IconButton
                        aria-label="more-setting"
                        color="inherit"
                    >
                        <MoreVert/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
