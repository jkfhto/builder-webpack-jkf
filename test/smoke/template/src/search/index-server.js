'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../common';

// import './search.less';
// import logo from "./images/1.png";

const React = require('react');
const logo = require('./images/1.png');
const s = require('./search.less');

class Search extends React.Component {

    render() {
        return <div className="search-text">
            Search Test<img src={logo} />
        </div>;
    }
}

module.exports = <Search/>;

// document.querySelector('#clickBtn').addEventListener('click', () => {
//     import('./hello').then(result => {
//         console.log(result.default);
//     });
// });