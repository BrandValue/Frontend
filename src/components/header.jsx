import React, {useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Badge, Menu, MenuItem} from "@material-ui/core";
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));


export default function Header(props) {
    const classes = useStyles();
    const [showMenuEl, setMenuVisibility] = useState(null);
    const openMenu = (event) => {
        setMenuVisibility(event.currentTarget);
    };
    const closeMenu = () => {
        setMenuVisibility(null);
    };
    const imageSource = props.config.imageSource;
    const title = props.config.title;
    const links = props.config.links;
    const badges = props.config.badges;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        <span className="p-2"><img src={imageSource.default} alt='logo'/></span>
                        <span className="p-2">{title}</span>
                    </Typography>
                    {
                        badges.map((badge, idx) => {
                            const IconName = badge.name;
                            return (
                                <IconButton color="inherit" key={idx} onClick={badge.onCartClick}>
                                    <Badge badgeContent={badge.number} color="secondary">
                                        <IconName/>
                                    </Badge>
                                </IconButton>)
                        })
                    }
                    {
                        <Menu anchorEl={showMenuEl}
                              keepMounted
                              open={Boolean(showMenuEl)}
                              onClose={closeMenu}>{
                            links.map((link, idx) => (
                                <MenuItem key={idx}>
                                    <Typography className={classes.menuButton} color="inherit"
                                                aria-label="menu" onClick={() => {
                                        closeMenu()
                                        link.action();
                                    }}>
                                        {link.value}
                                    </Typography>
                                </MenuItem>
                            ))
                        }
                        </Menu>
                    }
                    {links.map((link, idx) => (
                        <MenuItem key={idx} className={'d-none d-lg-flex'} color={'inherit'}>
                            <Typography className={classes.menuButton} color="inherit"
                                        aria-label="menu" onClick={() => {
                                closeMenu()
                                link.action();
                            }}>
                                {link.value}
                            </Typography>
                        </MenuItem>
                    ))}
                    <IconButton edge="start" className={`${classes.menuButton}  d-lg-none`} color="inherit"
                                aria-label="menu" onClick={openMenu}>
                        <MoreVert/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
