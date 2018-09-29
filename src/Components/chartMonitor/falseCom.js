import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//模拟显示组件
export default class Positionnode extends React.Component {
    render() {
        //假浮层样式
        let style = { display: "none", };
        let key = this.props.paramsPosition.shape;
        if (this.props.style[key]) {
            style['width'] = this.props.style[key].style.width + "px";
            style['height'] = this.props.style[key].style.height + "px";
            if (this.props.style[key].style.borderRadius == "none") {
                style['borderRadius'] = 0;
            } else {
                style['borderRadius'] = this.props.style[key].style.borderRadius + "%";
            }
        }
        if (this.props.paramsPosition.flag) style.display = "block";
        //控制移动顶端与中心位置
        if (this.refs.sty && this.props.paramsPosition.flag) {
            let top = (this.props.paramsPosition.cly - Number(style.height.split("px")[0] / 2));
            let left = (this.props.paramsPosition.clx - Number(style.width.split("px")[0] / 2));
            left = left - left % 8;
            top = top - top % 8;
            left <= 0 ? left = 0 : left;
            top <= 60 ? top = 60 : top;
            this.refs.sty.style.top = top + "px";
            this.refs.sty.style.left = left + "px";
        };
        //结束拖拽准备添加
        if (this.props.paramsPosition.isadd) style.display = 'none';

        return (
            <div className='posiclass' ref="sty" style={style}></div>
        );
    }
}