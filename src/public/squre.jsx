import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor';
import { SketchPicker } from 'react-color';
import './css/squre.css';
import { diff } from 'just-diff';

class Trsedit extends React.Component {
	constructor() {
		super();
		this.state = {
			colorChose: false,
			color: "rgba(255,255,255,1)"
		}
	}

	//如果具有初始值
	componentWillMount() {
		if (!_.isEmpty(this.props.propsInfo)) {
			this.state.color = this.props.propsInfo.color;
		}
	}

	//颜色变更
	colorChose(res) {
		let rgb = res.rgb;
		let rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
		this.state.color = rgba;
		this.setState({
			color: this.state.color
		});
		this.props.turnBack(this.state);
	}

	//颜色选择器是否显示
	showColor() {
		this.state.colorChose = !this.state.colorChose;
		this.setState({ colorChose: this.state.colorChose });
	}

	render() {
		let style = {
			paddingLeft: 60,
			display: this.state.colorChose ? "block" : "none"
		};
		return <div id="squareUseredit">
			<div className="colorLabel">
				<label>背景颜色:</label>
				<div
					className="colorBlock"
					style={{ background: this.state.color }}
					onClick={this.showColor.bind(this)}
				></div>
			</div>
			<div className="squrecolorChose" style={style}>
				<SketchPicker
					color={this.state.color}
					onChange={this.colorChose.bind(this)}
				/>
			</div>
		</div>
	}
}

class Trs extends React.Component {
	constructor() {
		super();
	}
	shouldComponentUpdate(nextProps, nextState) {
		return diff(nextProps, this.props).length ? true : false;
	}
	render() {
		let color = 'rgba(255,255,255,1)';
		if (!_.isEmpty(this.props.params.editurn)) {
			color = this.props.params.editurn.color;
		}
		let style = {
			width: this.props.params.size[0],
			height: this.props.params.size[1],
			background: color
		}
		return <div style={style}

		></div>
	}
}


// export
resTingdata('squre', {

	style: {
		width: 240,
		height: 240,
		borderRadius: 'none',
	},
	comItem: (params) => {
		return <Trs params={params} />
	},
	params: {
		name: "方形",
		editPanel: (turnBack, propsInfo) => {
			return <Trsedit turnBack={turnBack} propsInfo={propsInfo} />
		}
	},
	group: "基本形状",
	proportional: false

})


