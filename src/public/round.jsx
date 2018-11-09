import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor'

class Trsedit extends React.Component{
	constructor(){
		super();
		this.state={}
	}
	render(){
		return <p></p>
	}
}


class Roundedit extends React.Component {
	constructor() {
		super();
		this.state = {
			span: "",
			css: "样式一"
		}
	}
	componentWillMount() {
		let btnlist = [
			"样式一",
			"样式二",
			"样式三"
		];
		this.setState(
			{ span: btnlist },
		)
	}
	changeCss(e) {
		let text = e.currentTarget.innerText;

		this.setState(
			{
				css: text
			}
		);
		this.props.turnBack({ css: text });

	}
	render() {
		let dvstyle = {
			width: 100 + "%",
			height: 30 + "px",
			lineHeight: 30 + "px",
			fontSize: 14 + "px",
		}
		let spstyle = {
			display: 'block',
			float: "left",
			width: 30 + "%",
			textAlign: 'center',
			marginLeft: 2.5 + "%",
			border: "1px cadetblue solid",
			background: "#fff",
			color: "cadetblue",
			borderRadius: 5 + "px"
		};
		let seletStyle = (val) => {
			let css = Object.assign({}, spstyle);
			css.color = "#fff";
			css.background = "cadetblue";
			let res = spstyle;
			if (this.state.css == val) {
				res = css;
			}
			return res;
		}
		return (
			<div>
				<div
					style={dvstyle}
				>
					{this.state.span.map(val =>
						<span
							key={val}
							style={seletStyle(val)}
							onClick={this.changeCss.bind(this)}
						>{val}
						</span>
					)}
				</div>
			</div>
		)
	}


}



class Trs extends React.Component {
	constructor() {
		super();
		this.state = {
			css: "样式一"
		}
	}


	render() {
		let params = this.props.params;
		let style = {
			width: params.size[0],
			height: params.size[1],
			borderRadius: 50 + "%",
			textAlign: 'center',
			lineHeight: params.size[1] / 2 + "px",
			background: "#00ff00",
			color: "#000"
		}
		switch (params.editurn.css) {
			case "样式一":
				style.background = "#00ff00";
				style.color = "#00ff00"
				break;
			case "样式二":
				style.background = "#ff0000";
				style.color = "#ff0000"
				break;
			case "样式三":
				style.background = "#ffff00";
				style.color = "#ffff00"
				break;
			default:
				style = style;
				break;
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
		editPanel: (turnBack) => {
			return <Roundedit turnBack={turnBack} />
		}
	},
	group: "基本形状"

})


