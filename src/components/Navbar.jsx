import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
}));


export default function Navbar(props) {
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
                              getContentAnchorEl={null}
                              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                              transformOrigin={{ vertical: "top", horizontal: "center" }}
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
