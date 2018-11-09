import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

import { FlightHeading } from '@asw/react-flightindicators';

import img from "./HeadingIndicator.jpg";

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
		return (
			<FlightHeading
				width={style.width}
				height={style.height}
			/>
		);
	}
}

resTingdata('FlightHeading', {
	"style": {
		"width": 240,
		"height": 240,
		"borderRadius": "none",
	},
	"comItem": (params) => {
		return <Trs params={params} />
	},
	"params": {
		name: "FlightHeading",
		editPanel: (turnBack) => {
			return <Trsedit turnBack={turnBack} />
		}
	},
	menuImg: img,
	group: "飞行仪表",
	proportional: true
})


