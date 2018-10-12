import React, { Component } from 'react';

import './assets/css/flightindicators.css';

import fi_box from './assets/img/fi_box.svg';
import fi_circle from './assets/img/fi_circle.svg';
import heading_yaw from './assets/img/heading_yaw.svg';
import heading_mechanics from './assets/img/heading_mechanics.svg';

class FlightHeading extends Component {

	constructor(props) {
		super(props);
		this.setHeading = this.setHeading.bind(this);
	}

	setHeading(heading) {
		this.refs.headingImg.style.transform = 'rotate(' + heading + 'deg)';
	}

	componentDidMount() {
		this.setHeading(this.props.heading);
	}

	componentWillReceiveProps(nextProps) {
		this.setHeading(nextProps.heading);
	}

	render() {
		let width = this.props.width,
			height = this.props.height;

		return (
			<div className="instrument heading" style={{ width: width, height: height }}>
				<img src={fi_box} className="background box" alt="" />
				<div key="heading" className="heading box" ref='headingImg'>
					<img src={heading_yaw} className="box" alt="" />
				</div>
				<div key="mechanics" className="mechanics box">
					<img src={heading_mechanics} className="box" alt="" />
					<img src={fi_circle} className="box" alt="" />
				</div>
			</div>
		);
	}
}

export default FlightHeading;