import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import './index.css';
import { App } from '../public/chartMonitor.js';
import './Charts/FlightAirspeed';
import './Charts/FlightAltimeter';
import './Charts/FlightHeading';
import './Charts/round';
import './Charts/squre';

// import {
//     FlightAirspeed,
//     FlightAltimeter,
//     FlightHeading,
//     FlightHorzon,
//     FlightTurn,
//     FlightVariometer
// } from './src/index';

class Wrapper extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        console.log('is ready');
    }

    save(sJson) {
        //save return 
    }

    render() {
        return <App save={this.save.bind(this)} />
    }
}




ReactDOM.render(
    <Wrapper />,
    document.getElementById('containerWrapper'),
);

