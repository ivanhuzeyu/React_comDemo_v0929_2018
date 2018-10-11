import React from 'react';
import ReactDOM from 'react-dom';
export default class Ers extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        let style = {
            width: this.props.params.size[0] + "px",
            height: this.props.params.size[1] + "px",
            background: "#ffffff",
            color: "#000",
            borderRadius: 50 + "%",
            overflow: "hidden"
        }
        return (<div style={style}>
            <p>名称:{this.props.params.name}</p>
            <p>宽度:{this.props.params.size[0]}</p>
            <p>高度:{this.props.params.size[0]}</p>
            <p>index:{this.props.params.editurn.index}</p>
        </div>)
    }
}