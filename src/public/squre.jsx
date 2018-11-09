import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from './chartMonitor'

//import Trsedit from './Editblock';

class Trsedit extends React.Component{
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return <p></p>
	}
}

class Trs extends React.Component {
	constructor() {
		super();
		this.state = {
			test1: {

			}
		}
	}
	render() {

		if (this.props) {
			this.state.test1 = this.props.params;

		}
		return <div
			style={
				{background:"#ffffff"}
			}
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
		editPanel: (turnBack) => {
			return <Trsedit turnBack={turnBack} />
		}
	},
	group: "基本形状",
	proportional: false

})


