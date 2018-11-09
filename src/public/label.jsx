import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor'
import img from './images/TBg.png'
import './css/label.css';

class Trsedit extends React.Component {
	constructor() {
		super();
		this.state = {
			fontsize: 16,
			lineheight: 30,
			fontstyle: false,
			fontweight: false,
			fontfamily: '黑体',
			//letter: 0.0,
		}
	}

	passFn(res) {
		this.props.turnBack(res);
	}
	//字体大小改变
	fontsize(e) {
		let value = Number(e.currentTarget.value);
		this.state.fontsize = value;
		this.setState({
			fontsize: this.state.fontsize
		});
		this.passFn(this.state);
	}
	//行高改变
	lineheight(e) {
		let value = Number(e.currentTarget.value);
		this.state.lineheight = value;
		this.setState({
			lineheight: this.state.lineheight
		});
		this.passFn(this.state);
	}
	//字体倾斜
	fontstyle(e) {

		this.state.fontstyle = !this.state.fontstyle;
		this.setState({
			fontstyle: this.state.fontstyle
		});
		this.passFn(this.state);
	}
	//字体加粗
	fontweight(e) {
		this.state.fontweight = !this.state.fontweight;
		this.setState({
			fontweight: this.state.fontweight
		});
		this.passFn(this.state);
	}
	//字体类型
	fontfamily(e) {
		let value = e.currentTarget.value;
		this.state.fontfamily = value;
		this.setState({
			fontfamily: this.state.fontfamily
		});
		this.passFn(this.state);
	}
	//文字间隔
	// letter(e) {
	// 	let value = Number(e.currentTarget.value);
	// 	this.state.letter = value;
	// 	this.setState({
	// 		letter: this.state.letter
	// 	});
	// 	this.passFn(this.state);
	// }



	render() {
		let fontFamily = [
			'黑体',
			'宋体',
			'cursive',
			'serif',
		];
		return (
			<div id="labelControl">
				<div className="lbCitem">
					<label>字号:</label>
					<input
						type="number"
						defaultValue={this.state.fontsize}
						onChange={this.fontsize.bind(this)}
					/>
					<label>行高:</label>
					<input
						type="number"
						defaultValue={this.state.lineheight}
						onChange={this.lineheight.bind(this)}
					/>
				</div>
				<div className="lbCitem">
					<label>倾斜:</label>
					<input
						type="checkbox"
						className="checkBox"
						checked={this.state.fontstyle}
						onChange={this.fontstyle.bind(this)}
					/>
					<label>加粗:</label>
					<input
						type="checkbox"
						className="checkBox"
						checked={this.state.fontweight}
						onChange={this.fontweight.bind(this)}
					/>
				</div>
				<div className="lbCitem">
					<label>字体:</label>
					<select
						className="labelSelect"
						onChange={this.fontfamily.bind(this)}
					>
						{fontFamily.map((val, s) =>
							<option key={s} value={val}>{val}</option>
						)}
					</select>
					{/* <label>间隔:</label>
					<input
						type="number"
						defaultValue={this.state.letter}
						onChange={this.letter.bind(this)}
					/> */}
				</div>
			</div>
		)
	}
}



class Trs extends React.Component {
	constructor() {
		super();
	}
	render() {
		let editPass = {
			fontsize: 16,
			lineheight: 30,
			fontstyle: false,
			fontweight: false,
			fontfamily: '黑体',
			// letter:0.0
		}
		if (!_.isEmpty(this.props.params.editurn)) {
			editPass = this.props.params.editurn
		}

		editPass.lineheight += 'px';
		editPass.letter += 'em';
		let style = {
			width: this.props.params.size[0],
			height: this.props.params.size[1],
			//	background: '#ffffff',
			fontSize: editPass.fontsize,
			lineHeight: editPass.lineheight,
			fontStyle: editPass.fontstyle,
			fontWeight: editPass.fontweight,
			fontFamily: editPass.fontfamily,
		}
		return (
			<div
				id="textLabel"
				style={style}
			>
				{this.props.params.name}
			</div>
		)

	}
}

resTingdata('Text', {
	style: {
		width: 240,
		height: 120,
		borderRadius: 'none',
	},
	comItem: (params) => {
		return <Trs params={params} />
	},
	params: {
		name: "请输入文字",
		editPanel: (turnBack) => {
			return <Trsedit turnBack={turnBack} />
		}
	},
	menuImg: img,
	group: "基本形状",
	proportional: false

})


