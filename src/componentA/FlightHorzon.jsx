import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_circle from './assets/img/fi_circle.svg';
import horizon_back from './assets/img/horizon_back.svg';
import horizon_ball from './assets/img/horizon_ball.svg';
import horizon_circle from './assets/img/horizon_circle.svg';
import horizon_mechanics from './assets/img/horizon_mechanics.svg';

const PITCH_BOUND = 30;
const MECHANICS_BOUND = 90;

class FlightHorzon extends Component {

	constructor(props) {
		super(props);
		this.setRoll = this.setRoll.bind(this);
		this.setPitch = this.setPitch.bind(this);
		this.setMechanics = this.setMechanics.bind(this);
	}

	setRoll(roll) {
		this.refs.rollImg.style.transform = 'rotate(' + roll + 'deg)';
	}

	setPitch(pitch) {
		if (pitch > PITCH_BOUND) {
			pitch = PITCH_BOUND;
		} else if (pitch < -PITCH_BOUND) {
			pitch = -PITCH_BOUND;
		}
		this.refs.pitchImg.style.top = (pitch * 0.7) + '% ';
	}

	setMechanics(mechanics) {
		if (mechanics > MECHANICS_BOUND) {
			mechanics = MECHANICS_BOUND;
		} else if (mechanics < -MECHANICS_BOUND) {
			mechanics = -MECHANICS_BOUND;
		}
		this.refs.mechanics.style.transform = 'rotate(' + mechanics + 'deg)';
	}

	componentDidMount() {
		this.setRoll(this.props.roll);
		this.setPitch(this.props.pitch);
		this.setMechanics(this.props.mechanics);
	}

	componentWillReceiveProps(nextProps) {
		this.setRoll(nextProps.roll);
		this.setPitch(nextProps.pitch);
		this.setMechanics(nextProps.mechanics);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className='instrument attitude' style={{ width: width, height: height }}>
				<img src={fi_box} className='background box' alt='' />
				<div key="roll" className='roll box' ref='rollImg'>
					<img src={horizon_back} className='box' alt='' />
					<div className='pitch box' ref='pitchImg'>
						<img src={horizon_ball} className='box' alt='' />
					</div>
					<img src={horizon_circle} className='box' alt='' />
				</div>
				<div key="mechanics" className='mechanics box' ref='mechanics'>
					<img src={horizon_mechanics} className='box' alt='' />
					<img src={fi_circle} className='box' alt='' />
				</div>
			</div>
		);
	}
}

export default FlightHorzon;