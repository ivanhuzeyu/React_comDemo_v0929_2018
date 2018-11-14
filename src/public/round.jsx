import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor'
import './css/round.css';
import { SketchPicker } from 'react-color';



class Roundedit extends React.Component {
	constructor() {
		super();
		this.state = {
			colorChose: false,
			color: "rgba(255,255,255,1)"
		}
	}

	//如果局势初始值，加载初始值
	componentWillMount() {
		if (!_.isEmpty(this.props.propsInfo)) {
			this.state.color = this.props.propsInfo.color;
		}
	}

	//颜色选择
	colorChose(res) {
		let rgb = res.rgb;
		let rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
		this.state.color = rgba;
		this.setState({ color: this.state.color });
		this.props.turnBack(this.state);
	}

	//颜色选择器界面是否显示
	colorChoseShow() {
		this.state.colorChose = !this.state.colorChose;
		this.setState({ colorChose: this.state.colorChose });
	}

	render() {

		let style = {
			paddingLeft: 60,
			display: this.state.colorChose ? "block" : "none"
		}

		return (
			<div id="roundUseredit">
				<div className="colorLabel">
					<label>背景颜色:</label>
					<div
						className="colorBlock"
						style={{ background: this.state.color }}
						onClick={this.colorChoseShow.bind(this)}
					></div>
				</div>
				<div className="roundcolorChose" style={style}>
					<SketchPicker
						color={this.state.color}
						onChange={this.colorChose.bind(this)}
					/>
				</div>
			</div>
		)
	}


}



class Trs extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}
	render() {
		let color = 'rgba(255,255,255,1)';
		if (!_.isEmpty(this.props.params.editurn)) {
			color = this.props.params.editurn.color;
		}
		let style = {
			width: this.props.params.size[0],
			height: this.props.params.size[1],
			background: color,
			borderRadius: 50+"%"
		}
		return (
			<div
				style={style}
			>
			</div>
		);
	}
}

resTingdata('round', {

	style: {
		width: 240,
		height: 240,
		borderRadius: 80,
	},
	comItem: (params) => {
		return <Trs params={params} />
	},
	params: {
		name: "round",
		editPanel: (turnBack, propsInfo) => {
			return <Roundedit turnBack={turnBack} propsInfo={propsInfo} />
		}
	},
	group: "基本形状"

})


