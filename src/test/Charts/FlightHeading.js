import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightHeading } from '../../componentA/index';

import img from "../../componentA/assets/img/heading_mechanics.svg";

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
            <FlightHeading />
        );
    }
}

resTingdata('Trs3', {
    "style": {
        "width": 240,
        "height": 240,
        "borderRadius": "none",
    },
    "comItem": (params) => {
        return <Trs params={params} />
    },
    "params": {
        name: "名字",
        editPanel: (turnBack) => {
            return <Trsedit turnBack={turnBack} />
        }
    },
    menuImg:img,
    group:"仪表组-Headding"

})

