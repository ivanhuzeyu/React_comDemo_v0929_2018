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
                    <p>宽度:{this.state.test1.size[0]}</p>
                    <p>高度:{this.state.test1.size[1]}</p>
                </div>
            }
        </div>
        );
    }
}