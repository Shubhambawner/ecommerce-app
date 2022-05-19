import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import { Router, Route, Link, BrowserRouter, Routes} from 'react-router-dom'

import Static from './static/Static'

import Checkout from './components/checkOut/Checkout.js'

let APP = <Auth action={"log In"}/>
const routs = (
  < BrowserRouter >
    <Routes>
        <Route  exact path="/" element={<Auth  action={"log In"} />} />
        <Route path="/checkout" element={ <Checkout/> } />
        </Routes>
        <Static/>
  </ BrowserRouter >
);

// ReactDOM.render(<Dashboard/>, document.getElementById('root'))
ReactDOM.render(routs, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log); 
