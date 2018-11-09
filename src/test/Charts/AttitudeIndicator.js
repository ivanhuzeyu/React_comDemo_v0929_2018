import React from 'react';

import ReactDOM from 'react-dom';

import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

// import { FlightAirspeed } from '@asw/react-flightindicators';
import { AttitudeIndicator } from '@asw/react-attitude-indicator';

import img from "./AttitudeIndicator.jpg";

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
		return <AttitudeIndicator
			width={style.width}
			height={style.height}
		/>

	}
}

resTingdata(
	'AttitudeIndicator',
	{
		style: {
			width: 300,
			height: 400,
			borderRadius: 'none'
		},
		comItem: (params) => {
			return <Ers params={params} />
		},
		params: {
			name: "AttitudeIndicator",
			editPanel: (turnBack) => {
				return <Trsedit turnBack={turnBack} />
			}
		},
		menuImg: img,
		group: "飞行仪表",
		proportional: true
	}
);


