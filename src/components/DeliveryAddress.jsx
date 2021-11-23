import React, {useEffect, useState} from 'react';
import {getRequest} from "../services/APIEndpoints";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

function DeliveryAddress({onDeliveryAddressChange}) {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    useEffect(() => {
        getRequest('user/location/getLocations').then(locations => {
            setLocations(locations.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function changeSelectedLocation(event) {
        setSelectedLocation(event.target.value);
        onDeliveryAddressChange(`Deliver to ${event.target.value}`);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="location"
                name="controlled-radio-buttons-group"
                value={selectedLocation}
                onChange={changeSelectedLocation}
            >
                <FormControlLabel value="current location" key="currentLocationKey" control={<Radio/>}
                                  label="Current Location"/>
                {
                    locations.map(location => {
                        return (<FormControlLabel key={location.id} value={location.locationName} control={<Radio/>}
                                                  label={location.locationName}/>)
                    })
                }
            < /RadioGroup>
        </FormControl>
    );
}

export default DeliveryAddress;
