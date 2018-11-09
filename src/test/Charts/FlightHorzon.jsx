import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightHorzon } from '@asw/react-flightindicators';

import img from "./Airspeed.jpg";

class Trs extends React.Component {
	constructor() {
		super();
		this.state = {
			test1: {

			}
		}
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

		if (this.props) {
			this.state.test1 = this.props.params;

		}
		if (this.props) {
			this.state.test1 = this.props.params;

		}
		return (
			<FlightHorzon
				height={style.height}
				width={style.width}
			/>
		);
	}
}

resTingdata('Horzon', {
	"style": {
		"width": 240,
		"height": 240,
		"borderRadius": "none",
	},
	"comItem": (params) => {
		return <Trs params={params} />
	},
	"params": {
		name: "Horzon",
		editPanel: (turnBack) => {
			return <Trsedit turnBack={turnBack} />
		}
	},
	menuImg: img,
	group: "飞行仪表"

})


