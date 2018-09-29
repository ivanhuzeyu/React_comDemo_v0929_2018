import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import Editmodal from './editModal';

//组件显示区
export default class InsertWrapper extends React.Component {
    constructor() {
        super()
        this.state = {
            chart: [],
            ele: "",
            resizebtn: 0,
            id: "",
            shift: false,
            stateRes: [],
            scrollT: 0
        }
    }
    //点击组件进入编辑模式
    editParams(event) {
        const name = event.currentTarget.title;
        _.forEach(this.state.chart,
            (val, i) => {
                if (val.key == name) {
                    let chartEdits = this.state.chart;
                    if (this.props.isplay.status) {
                        return false;
                    } else {
                        let style = chartEdits[i].style;
                        chartEdits[i].editMark = { "display": "block" }
                        this.state.chart[i] = val;
                    }
                } else {
                    let chartEdits = this.state.chart;
                    let style = chartEdits[i].style;
                    chartEdits[i].editMark = { "display": "none" }
                    this.state.chart[i] = val;
                }
            }
        );
        this.setState({ chart: this.state.chart });
    }
    //编辑参数模块显示
    editModalshow(event) {
        let classNames = event.currentTarget.className;
        classNames = classNames.split(" ")[1]
        _.forEach(this.state.chart, (val, i) => {
            let key = val.key;
            if (key == classNames) {
                //只有选中才可编辑控制
                if (this.state.chart[i].editMark) {
                    if (this.state.chart[i].editMark.display == "block") {
                        this.state.chart[i].editShow = { display: "block" };
                        this.setState({ chart: this.state.chart });
                    }
                }
            }
        });
    }
    //编辑参数模块隐藏
    editModalhide(event) {
        let classNames = event.currentTarget.className;
        classNames = classNames.split(" ")[1]
        _.forEach(this.state.chart, (val, i) => {
            let key = val.key;
            if (key == classNames) {
                this.state.chart[i].editShow = { display: "none" };
                this.setState({ chart: this.state.chart });
            }
        });
    }
    //点击按钮改变大小+拖拽移动位置
    btneditSize(events) {
        let that = this;
        const title = events.currentTarget.title;
        this.state.resizebtn = 1;
        const name = events.target.parentNode.parentNode.title;
        let id = events.currentTarget.attributes['data-id'].value;
        this.state.id = id;
        this.setState({ id: this.state.id });
        let left, height, width, top, eqi;
        _.forEach(that.state.chart, (val, i) => {
            if (name == val.key) {
                eqi = i;
                left = Number(val.style.left.replace("px", ""));
                top = Number(val.style.top.replace("px", ""));
                height = Number(val.style.height.replace("px", ""));
                width = Number(val.style.width.replace("px", ""));
                if (that.state.scrollT) {
                    that.state.scrollT = that.refs.disRom.scrollTop;
                }
            }
        });

        if (this.state.resizebtn) {
            let event = events;
            that.refs.disRom.addEventListener("mousemove", move, false);
            function move(events) {

                //shift 比例缩放
                that.state.shift = events.shiftKey;

                //运行状态禁用编辑
                if (that.state.resizebtn) {

                } else {
                    return false;
                }
                let leftx = left;
                let widthx = width;
                let heightx = height;
                let topx = top;
                switch (title) {
                    case "1":
                        //宽高增长
                        heightx = (((top - that.state.scrollT) - events.clientY) + height) - (((top - that.state.scrollT) - events.clientY) + height) % 8;
                        widthx = ((left - events.clientX) + width) - ((left - events.clientX) + width) % 8;
                        //shift-1  比例增长 
                        if (that.state.shift) {
                            if ((left - events.clientX) > ((top - that.state.scrollT) - events.clientY)) {
                                heightx = ((left - events.clientX) + height) - ((left - events.clientX) + height) % 8;
                            } else if (((top - that.state.scrollT) - events.clientY) > (left - events.clientX)) {
                                widthx = (((top - that.state.scrollT) - events.clientY) + width) - (((top - that.state.scrollT) - events.clientY) + width) % 8;
                            }
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top - (heightx - height);
                        leftx = left - (widthx - width);
                        if (heightx <= 80) {
                            topx = top + height - 80;
                        }
                        if (widthx <= 80) {
                            leftx = left + width - 80;
                        }
                        break;
                    case "2":
                        //宽高增长
                        widthx = ((left - events.clientX) + width) - ((left - events.clientX) + width) % 8;
                        leftx = left - (widthx - width);
                        //shift-2  比例增长 
                        if (that.state.shift) {
                            heightx = ((left - events.clientX) + height) - ((left - events.clientX) + height) % 8;
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top;
                        leftx = left - (widthx - width);
                        if (heightx <= 80) {
                            topx = top;
                        }
                        if (widthx <= 80) {
                            leftx = left + width - 80;
                        }
                        break;
                    case "3":
                        //宽高增长
                        widthx = ((left - events.clientX) + width) - ((left - events.clientX) + width) % 8;
                        heightx = (events.clientY - (top - that.state.scrollT + height)) + height;
                        //shift-3  比例增长 
                        if (that.state.shift) {
                            if ((left - events.clientX) > (events.clientY - (top - that.state.scrollT + height))) {
                                heightx = ((left - events.clientX) + height) - ((left - events.clientX) + height) % 8;
                            } else if ((events.clientY - (top - that.state.scrollT + height)) > (left - events.clientX)) {
                                widthx = ((events.clientY - (top - that.state.scrollT + height)) + width) - ((events.clientY - (top - that.state.scrollT + height)) + width) % 8;
                            }
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top;
                        leftx = left - (widthx - width);
                        if (heightx <= 80) {
                            topx = top;
                        }
                        if (widthx <= 80) {
                            leftx = left + width - 80;
                        }
                        break;
                    case "4":
                        //宽高增长
                        heightx = (events.clientY - (top - that.state.scrollT + height)) + height;
                        heightx = heightx - heightx % 8;
                        //shift-5  比例增长 
                        if (that.state.shift) {
                            widthx = ((events.clientY - (top - that.state.scrollT + height)) + width) - ((events.clientY - (top - that.state.scrollT + height)) + width) % 8;
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 80) {
                            topx = top;
                        }
                        if (widthx <= 80) {
                            leftx = left;
                        }
                        break;
                    case "5":
                        //宽高增长
                        heightx = (events.clientY - (top - that.state.scrollT + height)) + height;
                        heightx = heightx - heightx % 8;
                        widthx = (events.clientX - (left + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-5  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left + width)) > (events.clientY - (top - that.state.scrollT + height))) {
                                heightx = ((events.clientX - (left + width)) + height) - ((events.clientX - (left + width)) + height) % 8;
                            } else if ((events.clientY - (top - that.state.scrollT + height)) > (left - events.clientX)) {
                                widthx = ((events.clientY - (top - that.state.scrollT + height)) + width) - ((events.clientY - (top - that.state.scrollT + height)) + width) % 8;
                            }
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 80) {
                            topx = top;
                        }
                        if (widthx <= 80) {
                            leftx = left;
                        }
                        break;
                    case "6":
                        //宽高增长
                        widthx = (events.clientX - (left + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-6  比例增长 
                        if (that.state.shift) {
                            heightx = ((events.clientX - (left + width)) + height) - ((events.clientX - (left + width)) + height) % 8;
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 80) {
                            topx = top;
                        }
                        if (widthx <= 80) {
                            leftx = left;
                        }
                        break;
                    case "7":
                        //宽高增长
                        heightx = ((top - that.state.scrollT - events.clientY) + height) - ((top - that.state.scrollT - events.clientY) + height) % 8;
                        widthx = (events.clientX - (left + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-7  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left + width)) > ((top - that.state.scrollT - events.clientY) + height)) {
                                heightx = ((events.clientX - (left + width)) + height) - ((events.clientX - (left + width)) + height) % 8;
                            } else if (((top - that.state.scrollT - events.clientY) + height) > (left - events.clientX)) {
                                widthx = (((top - that.state.scrollT - events.clientY)) + width) - (((top - that.state.scrollT - events.clientY)) + width) % 8;
                            }
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top - (heightx - height);
                        leftx = left;
                        if (heightx <= 80) {
                            topx = top + height - 80;
                        }
                        if (widthx <= 80) {
                            leftx = left;
                        }
                        break;
                    case "8":
                        //宽高增长
                        heightx = ((top - that.state.scrollT - events.clientY) + height) - ((top - that.state.scrollT - events.clientY) + height) % 8;
                        topx = top - that.state.scrollT - (heightx - height + 20);
                        //shift-8  比例增长 
                        if (that.state.shift) {
                            widthx = (((top - that.state.scrollT - events.clientY)) + width) - (((top - that.state.scrollT - events.clientY)) + width) % 8;
                        }
                        //位置控制
                        widthx <= 80 ? widthx = 80 : widthx;
                        heightx <= 80 ? heightx = 80 : heightx;
                        topx = top - (heightx - height);
                        leftx = left;
                        if (heightx <= 80) {
                            topx = top + height - 80;
                        }
                        if (widthx <= 80) {
                            leftx = left;
                        }
                        break;
                    case "9":
                        //已经生成滚动条的情况下
                        if (that.refs.disRom.scrollTop) {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if (events.clientY >= that.refs.disRom.clientHeight - height / 2) {
                                that.state.scrollT += events.clientY + height;
                                that.refs.disRom.scrollTop = that.state.scrollT;
                            }
                            //当鼠标距离顶部的距离小于等于半个容器时触发滚动条向上滚动
                            else if (events.clientY <= height / 2 + 60) {
                                that.state.scrollT -= height / 2;
                                that.refs.disRom.scrollTop = that.state.scrollT;
                                that.state.scrollT <= 60 ? that.state.scrollT = 0 : 1;
                            }
                        }
                        //初始高度（未生成滚动条的情况下）
                        else {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if (events.clientY >= that.refs.disRom.clientHeight - height / 2) {
                                that.state.scrollT += events.clientY + height;
                                that.refs.disRom.scrollTop = that.state.scrollT;
                            }
                        }
                        //最终位置设置
                        topx = ((events.clientY + that.refs.disRom.scrollTop) - height / 2) - ((events.clientY + that.state.scrollT) - height / 2) % 8;
                        left = ((events.clientX) - width / 2) - ((events.clientX) - width / 2) % 8;
                        break;
                    default:

                        break;
                }
                //位置控制
                let sWidth = window.screen.width - width;
                let sHeight = window.screen.height - height;
                topx <= 60 ? topx = 60 : topx = topx;
                leftx <= 0 ? leftx = 0 : leftx = leftx;
                leftx >= sWidth ? leftx = sWidth : leftx = leftx;

                //防止同时调用
                if (id == that.state.id) {
                    that.state.chart[eqi].style = {
                        top: topx + "px",
                        left: leftx + "px",
                        width: widthx + "px",
                        height: heightx + "px",
                        margin: 0,
                        overflow: "visible",
                        border: "4px dashed cadetblue",
                        borderRadius: that.state.chart[eqi].style.borderRadius
                    };
                    that.state.chart[eqi].editShow = { display: "none" };
                    that.state.chart[eqi].editPass.size = [widthx, heightx];
                }
                that.setState({ chart: that.state.chart });
            }

            that.refs.disRom.onmouseup = () => {
                this.state.resizebtn = 0;
                this.setState({ resizebtn: this.state.resizebtn })
                that.refs.disRom.removeEventListener("mousemove", move, false);
            }
        }
    }

    //编辑框修改值回传
    Editres(res) {
        _.forEach(this.state.chart, (val, i) => {
            if (val.key == res._id) {
                val.editPass = res;
                val.style = {
                    top: val.style.top,
                    left: val.style.left,
                    width: res.size[0] + "px",
                    height: res.size[1] + "px",
                    margin: 0,
                    overflow: "visible",
                    border: "4px dashed cadetblue",
                    borderRadius: val.style.borderRadius
                }
                this.state.chart[i] = val;
            }
        })
        this.setState({ chart: this.state.chart });
    }
    render() {
        let that = this;//函数作用域调整
        let dragParams = this.props.dragParams;
        if (dragParams.isadd) {
            dragParams.clx = dragParams.clx - this.props.chartElement[dragParams.shape].style.width / 2;
            dragParams.cly = dragParams.cly - this.props.chartElement[dragParams.shape].style.height / 2;
            dragParams.clx = dragParams.clx - dragParams.clx % 8;
            dragParams.cly = dragParams.cly - dragParams.cly % 8;
            let disRom = this.refs.disRom;
            if (
                dragParams.clx <= disRom.clientWidth
                && dragParams.clx >= 0
                && dragParams.cly >= 60
                && dragParams.cly <= disRom.clientHeight) {
                //添加容器到显示区
                addMonitorElement(dragParams);
            }
        }
        function addMonitorElement(dps) {
            let top, left, width;
            top = dps.cly + that.refs.disRom.scrollTop;
            left = dps.clx;
            let dom = that.props.chartElement[dps.shape].style;
            width = (dom.width) - (dom.width) % 8;
            width = width + "px";
            let height = (dom.height) - (dom.height) % 8 + "px";
            let radius = dom.borderRadius + "%";
            //位置必须是8的倍数
            top = top - (top % 8) + "px";
            left = left - (left % 8) + "px";
            let style = {
                top: top,
                left: left,
                width: width,
                height: height,
                margin: 0,
                overflow: "visible",
                border: "4px dashed cadetblue",
                borderRadius: radius
            }
            let item = { "key": dps.shape + "_" + _.now(), 'style': style };
            item['editMark'] = { display: 'none' };
            item['editShow'] = { display: 'none' };
            item['editPass'] = that.props.chartElement[dps.shape].params;
            item.editPass['size'] = [width.split("px")[0], height.split("px")[0]]
            that.state.chart.push(item);
            //添加完成后回传控制状态到父组件
            dps.isadd = 0;
            that.props.onOk({ dps })
        }
        //检测运行模式，更改编辑框的显示
        if (this.props.isplay.status) {
            _.forEach(this.state.chart, (mal, i) => {
                this.state.chart[i].editMark = this.props.isplay.playshow.display;
                this.state.chart[i].editShow = this.props.isplay.playshow.display;
            });
        }
        //二次编辑角标和拖拽按钮生成
        let eightConer = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //选择对应的图表
        function name(nameId, prams) {
            let valRes = "";
            if (nameId) {
                _.forIn(that.props.chartElement, (val, keyname) => {
                    if (keyname == nameId) {
                        valRes = val.comItem;
                    }
                })
            }
            if (valRes) {
                return valRes(prams);
            }
        }
        //生成图表容器
        let chartsElement = that.state.chart.map((vals, s) =>
            <div
                className={'initChart ' + vals.key}
                key={vals.key}
                ref={vals.key}
                title={vals.key}
                style={vals.style}
                onClick={this.editParams.bind(this)}
                onMouseEnter={this.editModalshow.bind(this)}
                onMouseLeave={this.editModalhide.bind(this)}
            >
                <div className='editDv' style={vals.editShow}>
                    <Editmodal vals={vals} oneditres={this.Editres.bind(this)} />
                </div>
                <div className='bgmark' style={vals.editMark}>
                    {eightConer.map((val) =>
                        <em
                            key={"coner" + val}
                            className={"coner" + val}
                            data-id={vals.key}
                            title={val}
                            onMouseDown={this.btneditSize.bind(this)}
                        >
                        </em>
                    )}
                </div>
                {name(vals.key.split("_")[0], vals.editPass)}
            </div>
        )
        return (
            <div className='insertWrapper' ref='disRom'>
                {chartsElement}
            </div>
        );
    }
}