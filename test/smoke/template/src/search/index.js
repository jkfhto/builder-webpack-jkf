'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../../common';

import './search.less';
import logo from "./images/1.png";
import { a } from "./tree-shaking";

if(false){
    const funcA = a();
    console.log(funcA)
}


class Search extends React.Component {

    render() {
        return <div className="search-text">
            Search Test<img src={logo} />
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);

document.querySelector('#clickBtn').addEventListener('click', () => {
    import('./hello').then(result => {
        console.log(result.default);
    });
});