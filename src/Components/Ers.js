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
            <p>标题:{this.state.Ers.title}</p>
            <p>样式:{this.state.Ers.css}</p>
            <p>宽度:{this.state.Ers.size[0]}</p>
            <p>高度:{this.state.Ers.size[1]}</p>
            <p>变量名:{this.state.Ers.variables}</p>
            <p>小刻度:{this.state.Ers.scale}</p>
            <p>系数K:{this.state.Ers.keys[0]}</p>
            <p>偏移B:{this.state.Ers.keys[1]}</p>
            <p>最小值:{this.state.Ers.range[0]}</p>
            <p>最大值:{this.state.Ers.range[1]}</p>
        </div>
    }
}