import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightAltimeter } from '../../componentA/index';

import img from "../../componentA/assets/img/altitude_pressure.svg";

class Trs extends React.Component {
    constructor() {
        super();
        this.state = {
            test1: {

            }
        }
    }
    render() {

        if (this.props) {
            this.state.test1 = this.props.params;

        }
        return (
            <FlightAltimeter />
        );
    }
}

resTingdata('Trs', {

    "style": {
        "width": 240,
        "height": 240,
        "borderRadius": "none",
    },
    "comItem": (params) => {
        return <Trs params={params} />
    },
    "params": {
        name: "Altimeter",
        editPanel: (turnBack) => {
            return <Trsedit turnBack={turnBack} />
        }
    },
    menuImg:img,
    group:"仪表组-Altimeter"

})


