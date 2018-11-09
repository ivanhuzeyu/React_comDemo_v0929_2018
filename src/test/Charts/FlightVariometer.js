
import React from 'react';

import ReactDOM from 'react-dom';

import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightVariometer } from '@asw/react-flightindicators';
// import { AttitudeIndicator } from '@asw/react-attitude-indicator';

import img from "./FlightVariometer.jpg";

class Ers extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	render() {

		let style = {
			width: this.props.params.size[0],
			height: this.props.params.size[1],
			background: "#ffffff",
			color: "#000",
			borderRadius: 50 + "%",
			overflow: "hidden"
		}

		return <FlightVariometer
			width={style.width}
			height={style.height}
		/>

	}
}

resTingdata(
	'FlightVariometer',
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
			name: "FlightVariometer",
			editPanel: (turnBack) => {
				return <Trsedit turnBack={turnBack} />
			}
		},
		menuImg: img,
		group: "飞行仪表",
		proportional: true
	}
);


