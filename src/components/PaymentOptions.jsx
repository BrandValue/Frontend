import React, {useEffect, useState} from 'react';
import {getRequest} from "../services/APIEndpoints";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

function PaymentOptions({onPaymentTextChange}) {
    const [paymentModes, setPaymentModes] = useState([]);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    useEffect(() => {
        getRequest('user/payment/getPaymentModes').then(paymentModes => {
            setPaymentModes(paymentModes.data);
        }).catch(err => console.log(err));
    }, [])

    function changeSelectedPaymentMode(event) {
        setSelectedPaymentMode(event.target.value);
        onPaymentTextChange(`Pay using ${event.target.value}`);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="location"
                name="controlled-radio-buttons-group"
                value={selectedPaymentMode}
                onChange={changeSelectedPaymentMode}
            >
                {
                    paymentModes.map(paymentMode => {
                        return (
                            <FormControlLabel key={paymentMode.id} value={paymentMode.paymentMode} control={<Radio/>}
                                              label={paymentMode.paymentMode}/>)
                    })
                }
            < /RadioGroup>
        </FormControl>
    );
}

export default PaymentOptions;
