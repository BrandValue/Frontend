import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function AutocompleteCategories(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const {hidden: isHidden, id, URL, textLabel} = props;
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
    console.log(getSelection())
    return (
        <Autocomplete hidden={isHidden}
                      id={id}
                      style={{width: '28ch'}}
                      open={open}
                      onOpen={() => {
                          setOpen(true);
                      }}
                      onClose={() => {
                          setOpen(false);
                      }}
                      onInputChange={(event, value) => console.log(value)}
                      getOptionSelected={(option, value) => option.title === value.title}
                      getOptionLabel={(option) => option.title}
                      options={options}
                      loading={loading}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              label={textLabel}
                              size={"small"}
                              InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                      <>
                                          {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                          {params.InputProps.endAdornment}
                                      </>
                                  ),
                              }}
                          />
                      )}
        />
    );
}
