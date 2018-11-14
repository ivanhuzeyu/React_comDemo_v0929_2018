import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import './index.css';
import App from '../public/import'

class Wrapper extends React.Component {
	constructor() {
		super();
		this.state = {
			loadData: ""
		}
	}

	componentWillMount() {
		//获取加载数据
		let loadData = localStorage.getItem('data');
		if (loadData) {
			loadData = JSON.parse(loadData);
		} else {
			loadData = {};
		}
		this.state.loadData = {};
		this.setState({
			loadData: this.state.loadData
		});
	}

	save(sJson) {
		//获取存储数据
		localStorage.setItem('data', JSON.stringify(sJson));
	}

	render() {

		return <App
			save={this.save.bind(this)}
			load={this.state.loadData}
		/>
	}
}




ReactDOM.render(
	<Wrapper />,
	document.getElementById('containerWrapper'),
);

