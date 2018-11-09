import React from 'react';
import ReactDOM from 'react-dom';
//网格背景
export default class Backlinecover extends React.Component {
    constructor() {
        super();
    }
    //计算面积，生成网格背景
    render() {
        let color = '';
        this.props.lineColor ? color = this.props.lineColor : color = '#ccc';
        let bgColor = '';
        this.props.bgColor ? bgColor = this.props.bgColor : bgColor = '#ccc';
        let size = "";
        size = Number(this.props.diamond) + "px";
        size += " ";
        size += size;
        let backgroundImage = '';
        backgroundImage = "linear-gradient(transparent " + Number(this.props.diamond - 1) + "px, " + color + " " + Number(this.props.diamond - 1) + "px, " + color + ")";
        backgroundImage += ', linear-gradient(90deg, ' + bgColor + ' ' + Number(this.props.diamond - 1) + 'px, ' + color + ' ' + Number(this.props.diamond - 1) + 'px, ' + color + ')';

        let style = {
            display: this.props.backmodal,
            backgroundSize: size,
            backgroundImage: backgroundImage
        }
        return (
            <div className='bgLine' style={style}>

            </div>
        )
    }
}