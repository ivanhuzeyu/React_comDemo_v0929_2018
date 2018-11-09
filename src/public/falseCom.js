import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//模拟显示组件
export default class Positionnode extends React.Component {

    constructor() {
        super();
        this.state = {
            paramsPosition: '',
            style: ''
        }
    }

    //will
    shouldComponentUpdate(nextProps, nextState) {
        nextState.paramsPosition = nextProps.paramsPosition;
        nextState.style = nextProps.style;
        return true;
    }

    componentWillMount() {
        this.state.paramsPosition = this.props.paramsPosition;
        this.state.style = this.props.style;
        this.setState({
            paramsPosition: this.state.paramsPosition,
            style: this.state.style
        });
    }


    //move
    move(e) {
        this.state.paramsPosition.clx = e.clientX;
        this.state.paramsPosition.cly = e.clientY;
        this.state.paramsPosition.flag = 1;
        this.state.paramsPosition.isadd = 0;
        this.setState({
            paramsPosition: this.state.paramsPosition
        });
    }

    //moveend
    moveend(e) {
        let drapflag = this.state.paramsPosition;
        if (drapflag.flag) {
            drapflag.flag = 0;
            drapflag.isadd = 1;
            this.props.onres({ res: { drapflag: drapflag } });
            this.setState({
                paramsPosition: this.state.paramsPosition
            });
        }
    }
    render() {
        //假浮层样式
        let style = { display: "block" };
        let markstyle = { display: 'none' };
        let key = this.state.paramsPosition.shape;
        if (this.props.style[key]) {
            style['width'] = this.props.style[key].style.width + "px";
            style['height'] = this.props.style[key].style.height + "px";
            if (this.props.style[key].style.borderRadius == "none") {
                style['borderRadius'] = 0;
            } else {
                style['borderRadius'] = this.props.style[key].style.borderRadius + "%";
            }
        }
        if (this.state.paramsPosition.flag) markstyle.display = "block";
        //控制移动顶端与中心位置
        if (this.sty && this.state.paramsPosition.flag) {
            let top = ((this.state.paramsPosition.cly) - Number(style.height.split("px")[0] / 2));
            let left = (this.state.paramsPosition.clx - Number(style.width.split("px")[0] / 2));
            left = left - left % Number(this.props.diamond);
            top = top - top % Number(this.props.diamond);
            left <= 0 ? left = 0 : left;
            top <= 0 ? top = 0 : top;
            this.sty.style.top = top + "px";
            this.sty.style.left = left + "px";
        };
        //结束拖拽准备添加
        if (this.state.paramsPosition.isadd) markstyle.display = "none";
        return (
            <div style={markstyle} id="opcityMark" onMouseMove={this.move.bind(this)} onMouseUp={this.moveend.bind(this)}>
                <div className='posiclass' ref={ref => this.sty = ref} style={style}></div>
            </div>
        );
    }
}