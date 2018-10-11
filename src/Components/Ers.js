import React from 'react';
import ReactDOM from 'react-dom';
export default class Ers extends React.Component {
    constructor() {
        super();
        this.state = {
            Ers: {}
        }
    }

    render() {
        if (this.props) {
            this.state.Ers = this.props.params;
        }
        let style = {
            width: this.state.Ers.size[0] + "px",
            height: this.state.Ers.size[1] + "px",
            background: "#ffffff",
            color: "#000",
            borderRadius: 50 + "%",
            overflow: "hidden"
        }
        return <div style={style}>
            <p>名称:{this.state.Ers.name}</p>
            <p>宽度:{this.state.Ers.size[0]}</p>
            <p>高度:{this.state.Ers.size[1]}</p>
        </div>
    }
}