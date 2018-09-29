import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//网格背景
export default class Backlinecover extends React.Component {
    static defaultProps = {
        backmodal: ""
    }
    //计算面积，生成网格背景
    render() {
        if (this.props.backmodal && this.refs.bgLine) {
            this.refs.bgLine.style.display = this.props.backmodal;
        }

        this.plist = "error";
        let num = window.innerWidth * window.innerHeight / 64;
        let listnum = [];

        for (let i = 0; i < num; i++) {
            listnum.push(i);
        }

        this.plist = (
            <div>
                {listnum.map(vals =>
                    <p key={vals} className='pBlock'></p>
                )}
            </div>
        );

        return (
            <div className='bgLine' ref='bgLine'>
                {this.plist}
            </div>
        )
    }
}