import React from 'react';

import ReactDOM from 'react-dom';

import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightAirspeed } from '../../componentA/index';

import img from "../../componentA/assets/img/speed_mechanics.svg";

class Ers extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        let style = {
            width: this.props.params.size[0] + "px",
            height: this.props.params.size[1] + "px",
            background: "#ffffff",
            color: "#000",
            borderRadius: 50 + "%",
            overflow: "hidden"
        }

        return <FlightAirspeed 
                width={style.width}
                height={style.height}
                airspeed={this.props.params.editurn.index}
                />

    }
}

resTingdata(
    'Ers',
    {
        style: {
            width: 240,
            height: 240,
            borderRadius: 'none'
        },
        comItem: (params) => {
            return <Ers params={params} />
        },
        params: {
            name: "名字",
            editPanel: (turnBack) => {
                return <Trsedit turnBack={turnBack} />
            }
        },
        menuImg: img,
        group:"航空仪表"
    }
);


