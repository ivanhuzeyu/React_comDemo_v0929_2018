import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_needle from './assets/img/fi_needle.svg';
import fi_circle from './assets/img/fi_circle.svg';
import speed_mechanics from './assets/img/speed_mechanics.svg';

const AIRSPEED_BOUND_L = 0;
const AIRSPEED_BOUND_H = 160;

class FlightAirspeed extends Component {

	constructor(props) {
		super(props);
		this.setAirspeed = this.setAirspeed.bind(this);
	}

	setAirspeed(airspeed) {
		if (airspeed > AIRSPEED_BOUND_H) {
			airspeed = AIRSPEED_BOUND_H;
		}
		else if (airspeed < AIRSPEED_BOUND_L) {
			airspeed = AIRSPEED_BOUND_L;
		}
		this.refs.airspeedImg.style.transform = 'rotate(' + airspeed + 'deg)';
	}

	componentDidMount() {
		this.setAirspeed(this.props.airspeed);
	}

	componentWillReceiveProps(nextProps) {
		this.setAirspeed(nextProps.airspeed);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className="instrument airspeed" style={{ width: width, height: height }}>
				<img src={fi_box} className="background box" alt="" />
				<img src={speed_mechanics} className="box" alt="" />
				<div key="airspeed" className="speed box" ref="airspeedImg">
					<img src={fi_needle} className="box" alt="" />
				</div>
				<div key="mechanics" className="mechanics box">
					<img src={fi_circle} className="box" alt="" />
				</div>
			</div>

		);
	}
}

export default FlightAirspeed;