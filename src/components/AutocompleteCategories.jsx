import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Checkbox} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;


export default function AutocompleteCategories(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const {hidden: isHidden, id, URL, placeholder} = props;
    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetch(URL);
            const countries = await response.json();
            if (active) {
                setOptions(Object.keys(countries).map((key) => countries[key]));
            }
        })();
        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (<Autocomplete
        multiple
        hidden={isHidden}
        id={id}
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onClose={() => {
            setOpen(false);
        }}
        style={{width: '80%'}}
        options={options}
        loading={loading}
        disableCloseOnSelect
        onChange={(event, value) => {
            console.log(value);
        }}
        getOptionSelected={(option, value) => option.title === value.title}
        getOptionLabel={(option) => option.title}
        renderOption={(option, {selected}) => (
            <>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{marginRight: 8}}
                    checked={selected}
                />
                {option.title}
            </>
        )}
        renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder={placeholder} InputProps={{
                ...params.InputProps,
                endAdornment: (
                    <>
                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}/>
        )}
    />);
}
