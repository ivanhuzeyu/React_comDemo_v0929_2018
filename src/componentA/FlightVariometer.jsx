import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_needle from './assets/img/fi_needle.svg';
import fi_circle from './assets/img/fi_circle.svg';
import vertical_mechanics from './assets/img/vertical_mechanics.svg';

const VARIO_BOUND = 1.95;

class FlightVariometer extends Component {

	constructor(props) {
		super(props);
		this.setVario = this.setVario.bind(this);
	}

	setVario(vario) {
		if (vario > VARIO_BOUND) {
			vario = VARIO_BOUND;
		}
		else if (vario < -VARIO_BOUND) {
			vario = -VARIO_BOUND;
		}
		this.refs.varioImg.style.transform = 'rotate(' + vario + 'deg)';
	}

	componentDidMount() {
		this.setVario(this.props.vario);
	}

	componentWillReceiveProps(nextProps) {
		this.setVario(nextProps.vario);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className="instrument vario" style={{ width: width, height: height }}>
				<img src={fi_box} className="background box" alt="" />
				<img src={vertical_mechanics} className="box" alt="" />
				<div key="vario" className="vario box" ref="varioImg">
					<img src={fi_needle} className="box" alt="" />
				</div>
				<div key="mechanics" className="mechanics box">
					<img src={fi_circle} className="box" alt="" />
				</div>
			</div>
		);
	}
}

export default FlightVariometer;