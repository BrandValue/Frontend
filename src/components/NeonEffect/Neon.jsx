import React from 'react';
import NeonCss from './Neon.css'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    neonTextMd: {
        [theme.breakpoints.down('md')]: {
            paddingTop: "50px",
        }
    }
}));

function Neon({text}) {
    const classes = useStyles();
    return (
        <h1 className={`background neonText ${classes.neonTextMd}`}>
            {text}
        </h1>
    );
}

export default Neon;
