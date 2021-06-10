import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import IconButton from "@material-ui/core/IconButton";
import AutocompleteCategories from "./AutocompleteCategories";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: "center",
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        marginTop: '0.5rem',
    }
}));

function SortAndFilter(props) {
    const classes = useStyles();
    const [showFilterTextBox, setShowFilterTextBox] = React.useState(true);

    return (
        <div className={classes.root}>
            <IconButton aria-label='filter'
                        onClick={() => {
                            setShowFilterTextBox(prevState => !prevState)
                        }
                        }>
                <FilterListIcon/>
            </IconButton>
            <AutocompleteCategories hidden={showFilterTextBox} id={'filter'}
                                    URL={'https://jsonplaceholder.typicode.com/todos'}
                                    textLabel={'Filter criteria'}/>
        </div>
    );
}

export default SortAndFilter;
