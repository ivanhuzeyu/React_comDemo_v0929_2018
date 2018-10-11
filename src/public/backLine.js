import React from 'react';
import ReactDOM from 'react-dom';
//网格背景
export default class Backlinecover extends React.Component {
    constructor() {
        super();
    }
    //计算面积，生成网格背景
    render() {
        return (
            <div className='bgLine'  style={{ display: this.props.backmodal }}>

            </div>
        )
    }
}