import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PaymentAndDeliverySummary from "./components/PaymentAndDeliverySummary";
import Header from "./components/Header";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/payment"
                   render={(props) => <><Header/><PaymentAndDeliverySummary {...props}/></>}/>
            <Route exact={true} path="/" render={(props) => <App/>}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
