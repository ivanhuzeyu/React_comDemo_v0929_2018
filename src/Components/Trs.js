import React from 'react';
import ReactDOM from 'react-dom';
export default class Trs extends React.Component {
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
        return (<div style={
            {
                width: this.state.test1.size[0] + "px",
                height: this.state.test1.size[1] + "px",
                background: "#eee",
                color: "#000",
            }
        }>
            {
                <div className=''>
                    <p>名称:{this.state.test1.name}</p>
                    <p>标题:{this.state.test1.title}</p>
                    <p>样式:{this.state.test1.css}</p>
                    <p>宽度:{this.state.test1.size[0]}</p>
                    <p>高度:{this.state.test1.size[1]}</p>
                    <p>x轴范围:{this.state.test1.x}</p>
                    {this.state.test1.line.map((val, i) =>
                        <p key={i}>
                            <span>变量:{val.vname}</span>
                            <span style={{ color: val.vcolor }}>颜色:{val.vcolor}</span>
                            <span>缩放:{val.vscale}</span>
                            <span>偏移:{val.voffset}</span>
                        </p>
                    )}
                </div>
            }
        </div>
        );
    }
}