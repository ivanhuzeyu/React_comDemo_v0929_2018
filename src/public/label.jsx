import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor'
import img from './images/TBg.png'
import './css/label.css';
import { SketchPicker } from 'react-color';



class Trsedit extends React.Component {
	constructor() {
		super();
		this.state = {
			fontsize: 16,
			lineheight: 30,
			lineheightval: 30 + "px",
			fontstyle: false,
			fontstyleval: "inherit",
			fontweight: false,
			fontweightval: "normal",
			fontfamily: '黑体',
			fontColor: 'rgba(0,0,0,1)',
			backgroundColor: 'rgba(255,255,255,1)',
			colorStyle: false,
			bgcolorStyle: false,
		}
	}

	//如果具有初始值
	componentWillMount() {
		if (!_.isEmpty(this.props.propsInfo)) {
			this.state = this.props.propsInfo
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
		this.state.lineheightval = value + "px";
		this.setState({
			lineheight: this.state.lineheight,
			lineheightval: this.state.lineheightval
		});
		this.passFn(this.state);
	}
	//字体倾斜
	fontstyle(e) {

		this.state.fontstyle = !this.state.fontstyle;
		this.state.fontstyleval = this.state.fontstyle ? 'italic' : 'inherit';
		this.setState({
			fontstyle: this.state.fontstyle,
			fontstyleval: this.state.fontstyleval
		});
		this.passFn(this.state);
	}
	//字体加粗
	fontweight(e) {
		this.state.fontweight = !this.state.fontweight;
		this.state.fontweightval = this.state.fontweight ? 'bold' : 'normal';
		this.setState({
			fontweight: this.state.fontweight,
			fontweightval: this.state.fontweightval
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

	//colorChose
	colorChose(res) {
		let rgb = res.rgb;
		let rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
		this.state.fontColor = rgba;
		this.setState({
			fontColor: this.state.fontColor
		});
		this.passFn(this.state);
	}
	//颜色框显示隐藏囊
	showChose(res) {
		this.state.colorStyle = !this.state.colorStyle;
		this.state.bgcolorStyle = false;
		this.setState({
			colorStyle: this.state.colorStyle,
			bgcolorStyle: this.state.bgcolorStyle
		});
	}
	//背景颜色选择
	bgcolorChose(res) {
		let rgb = res.rgb;
		let rgba = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + rgb.a + ')';
		this.state.backgroundColor = rgba;
		this.setState({
			backgroundColor: this.state.backgroundColor
		});
		this.passFn(this.state);
	}
	showBgchose() {
		this.state.bgcolorStyle = !this.state.bgcolorStyle;
		this.state.colorStyle = false;
		this.setState({
			bgcolorStyle: this.state.bgcolorStyle,
			colorStyle: this.state.colorStyle
		});
	}
	render() {
		let fontFamily = [
			'黑体',
			'宋体',
			'cursive',
			'serif',
		];
		let colorStyle = {
			display: this.state.colorStyle ? 'block' : 'none',
			paddingLeft: 30
		};
		let bgcolorStyle = {
			display: this.state.bgcolorStyle ? 'block' : 'none',
			paddingLeft: 140
		}
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
					<label>字体颜色:</label>
					<div className='fontColor'>
						<em
							className="fColor"
							style={{ background: this.state.fontColor }}
							onClick={this.showChose.bind(this)}
						>
						</em>
					</div>
					<label>背景颜色:</label>
					<div className='fontColor'>
						<em
							className="fColor"
							style={{ background: this.state.backgroundColor }}
							onClick={this.showBgchose.bind(this)}
						>
						</em>
					</div>
				</div>
				<div style={colorStyle}>
					<SketchPicker
						color={this.state.fontColor}
						onChange={this.colorChose.bind(this)}
					/>
				</div>
				<div style={bgcolorStyle}>
					<SketchPicker
						color={this.state.backgroundColor}
						onChange={this.bgcolorChose.bind(this)}
					/>
				</div>
				<div className="lbCitem">
					<label>字体:</label>
					<select
						className="labelSelect"
						onChange={this.fontfamily.bind(this)}
						defaultValue={this.state.fontFamily}
					>
						{fontFamily.map((val, s) =>
							<option key={s} value={val}>{val}</option>
						)}
					</select>
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

		let editurn = {
			fontsize: 16,
			lineheightval: 30 + "px",
			fontstyleval: "inherit",
			fontweightval: "normal",
			fontfamily: '黑体',
			fontColor: 'rgba(0,0,0,1)',
			backgroundColor: 'rgba(255,255,255,1)'
		}

		if (!_.isEmpty(this.props.params.editurn)) {
			editurn = this.props.params.editurn;
		}

		let style = {
			width: this.props.params.size[0],
			height: this.props.params.size[1],
			fontSize: editurn.fontsize,
			lineHeight: editurn.lineheightval,
			fontStyle: editurn.fontstyleval,
			fontWeight: editurn.fontweightval,
			fontFamily: editurn.fontfamily,
			color: editurn.fontColor,
			background: editurn.backgroundColor,
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
		editPanel: (turnBack, propsInfo) => {
			return <Trsedit turnBack={turnBack} propsInfo={propsInfo} />
		}
	},
	menuImg: img,
	group: "基本形状",
	proportional: false
})


