import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_needle from './assets/img/fi_needle.svg';
import fi_circle from './assets/img/fi_circle.svg';
import fi_needle_small from './assets/img/fi_needle_small.svg';
import altitude_pressure from './assets/img/altitude_pressure.svg';
import altitude_ticks from './assets/img/altitude_ticks.svg';

class FlightAltimeter extends Component {

	constructor(props) {
		super(props);
		this.setAltitude = this.setAltitude.bind(this);
		this.setPressure = this.setPressure.bind(this);
	}

	setAltitude(altitude) {
		var needle = 90 + altitude % 1000 * 360 / 1000;
		var needleSmall = altitude / 10000 * 360;
		this.refs.needleImg.style.transform = 'rotate(' + needle + 'deg)';
		this.refs.needleSmallImg.style.transform = 'rotate(' + needleSmall + 'deg)';
	}

	setPressure(pressure) {
		pressure = 2 * pressure - 1980;
		this.refs.pressureImg.style.transform = 'rotate(' + pressure + 'deg)';
	}

	componentDidMount() {
		this.setAltitude(this.props.altitude);
		this.setPressure(this.props.pressure);
	}

	componentWillReceiveProps(nextProps) {
		this.setAltitude(nextProps.altitude);
		this.setPressure(nextProps.pressure);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className="instrument altimeter" style={{ width: width, height: height }}>
				<img src={fi_box} className="background box" alt="" />
				<div key="pressure" className="pressure box" ref="pressureImg">
					<img src={altitude_pressure} className="box" alt="" />
				</div>
				<img src={altitude_ticks} className="box" alt="" />
				<div key="needleSmall" className="needleSmall box" ref="needleSmallImg">
					<img src={fi_needle_small} className="box" alt="" />
				</div>
				<div key="needle" className="needle box" ref="needleImg">
					<img src={fi_needle} className="box" alt="" />
				</div>
				<div key="mechanics" className="mechanics box">
					<img src={fi_circle} className="box" alt="" />
				</div>
			</div>

		);
	}
}

export default FlightAltimeter;