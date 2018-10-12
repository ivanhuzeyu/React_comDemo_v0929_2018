import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_circle from './assets/img/fi_circle.svg';
import fi_tc_airplane from './assets/img/fi_tc_airplane.svg';
import turn_coordinator from './assets/img/vertical_mechanics.svg';

class FlightTurn extends Component {

	constructor(props) {
		super(props);
		this.setTurn = this.setTurn.bind(this);
	}

	setTurn(turn) {
		this.refs.turnImg.style.transform = 'rotate(' + turn + 'deg)';
	}

	componentDidMount() {
		this.setTurn(this.props.turn);
	}

	componentWillReceiveProps(nextProps) {
		this.setTurn(nextProps.turn);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className="instrument turn_coordinator" style={{ width: width, height: height }}>
				<img src={fi_box} className="background box" alt="" />
				<img src={turn_coordinator} className="box" alt="" />
				<div key="turn" className="turn box" ref="turnImg">
					<img src={fi_tc_airplane} className="box" alt="" />
				</div>
				<div key="mechanics" className="mechanics box">
					<img src={fi_circle} className="box" alt="" />
				</div>
			</div>
		);
	}
}

export default FlightTurn;