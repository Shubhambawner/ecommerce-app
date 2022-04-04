import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './Auth';
import Dashboard from './components/DashboardHeader';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter} from 'react-router-dom'

// const routs = (
//   < BrowserRouter >
//      <div>
//         <Route path="/" component={App} />
//         {/* <Route path="/aboutus" component={ AboutUs } />
//         <Route path="/contactus" component={ ContactUs } /> */}
//      </div>
//   </ BrowserRouter >
// );

// ReactDOM.render(<Dashboard/>, document.getElementById('root'))
ReactDOM.render(<Auth action={"log In"}/>, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log); 
