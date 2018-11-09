import React from 'react';

import ReactDOM from 'react-dom';

import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';

// import { HPChart } from '../../../../react-hp-chart/src/index';
import { HPChart } from '@asw/react-hpchart';

import img from "./HPChart.jpg";

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

		let series = [];
		series[0] = []
		let now = new Date("2018-11-01 08:00:00").getTime();
		for (let i = 0; i < 1000; i++) {
			series[0][i] = [];
			series[0][i][0] = now + i;
			series[0][i][1] = 9 * Math.sin(i * 0.01);
		}

		return <HPChart
			options={{
				width: style.width,
				height: style.height,
				maxFps: 10,
				yAxis: {
					min: -10,
					max: 10,
					tickCount: 5
				},
				xAxis: {
					tickCount: 5
				}
			}}
			getSeries={() => series}
		/>

	}
}

resTingdata(
	'HPChart',
	{
		style: {
			width: 400,
			height: 300,
			borderRadius: 'none'
		},
		comItem: (params) => {
			return <Ers params={params} />
		},
		params: {
			name: "HPChart",
			editPanel: (turnBack) => {
				return <Trsedit turnBack={turnBack} />
			}
		},
		menuImg: img,
		group: "曲线",
		proportional: false
	}
);


