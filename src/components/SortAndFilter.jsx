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
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function SortAndFilter(props) {
    const classes = useStyles();
    const [showSortTextBox, setShowSortTextBox] = React.useState(true);
    const [showFilterTextBox, setShowFilterTextBox] = React.useState(true);
    const [chipData, setChipData] = React.useState([
        {key: 0, label: 'Angular'},
        {key: 1, label: 'jQuery'},
        {key: 2, label: 'Polymer'},
        {key: 3, label: 'React'},
        {key: 4, label: 'Vue.js'},
    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    return (
        <>
            <Paper component="ul" className={classes.root}>
                <IconButton aria-label='filter'
                            onClick={() => {
                                setShowFilterTextBox(prevState => !prevState)
                            }
                            }>
                    <FilterListIcon/>
                </IconButton>
                <AutocompleteCategories hidden={showFilterTextBox} id={'filter'} URL={'https://jsonplaceholder.typicode.com/todos'}
                                        textLabel={'Filter criteria'}/>
                {chipData.map((data) => {
                    let icon;

                    if (data.label === 'React') {
                        icon = <TagFacesIcon/>;
                    }

                    return (
                        <li key={data.key}>
                            <Chip
                                icon={icon}
                                label={data.label}
                                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
            </Paper>
        </>
    );
}

export default SortAndFilter;
