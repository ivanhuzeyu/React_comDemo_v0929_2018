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
            chartLength: 0,
            ele: "",
            resizebtn: 0,
            id: "",
            shift: false,
            stateRes: [],
            scrollT: 0,
            scrollL: 0,
            zhanweiCss: {
                top: 0,
                left: 0
            },
            drawArea: 0,
            drawCss: [0, 0, 0, 0],
            drawCssNote: [0, 0],
            checks: 1,
            clickOrderList: []
        }
    }

    //render之前获取更新
    shouldComponentUpdate(nextProps, nextState) {
        nextState.chart = nextProps.charts;
        if (nextState.chart.length) {
            _.forEach(nextState.chart, (val, i) => {
                let key = val.key.split('_')[0];
                if (!_.has(val.editPass, "editPanel")) {
                    _.forIn(nextProps.chartElement, (jav, keys) => {
                        if (key == keys) {
                            val.editPass["editPanel"] = jav.params.editPanel;
                        }
                    });
                    nextState.chart[i] = val;
                };
            });
        };
        nextState.clickOrderList = nextProps.clickOrderList;
        return true;
    }

    //更新状态指令时
    componentDidUpdate() {
        if (this.props.saveresFlag) {
            this.props.onSavedateres(this.state.chart);
        }
    }

    //加载状态
    componentWillMount() {
        _.forEach(this.props.charts, (val, i) => {
            let orders = Object.assign({}, val);
            let edit = orders.editPass;
            let _id = edit._id.split('_')[0];
            _.forIn(this.props.chartElement, (jav, keys) => {
                if (_id == keys) {
                    edit.editPanel = jav.params.editPanel;
                }
            });
        });
        this.state.chart = this.props.charts;
        this.state.clickOrderList = this.props.clickOrderList;
        this.setState({
            clickOrderList: this.state.clickOrderList,
            chart: this.state.chart,
        });
    }
    //点击组件进入编辑模式
    editParams(event) {
        const name = event.currentTarget.title;
        _.forEach(this.state.chart, (val, i) => {
            val.editShow = { width: 0 };
            if (val.key == name) {
                let chartEdits = this.state.chart;
                if (this.props.isplay.status) {
                    return false;
                } else {
                    //border 
                    let itemStyle = Object.assign({}, val.style);
                    itemStyle.border = "none";
                    this.state.chart[i].style = itemStyle;
                    if (chartEdits[i].editMark.display == 'block' && event.ctrlKey) {
                        if (!this.state.checks) {
                            chartEdits[i].editMark = { "display": "none" };
                        } else {
                            chartEdits[i].editMark = { "display": "block" };
                        }
                    } else {
                        chartEdits[i].editMark = { "display": "block" };
                    }
                    this.state.chart[i] = val;
                }
            } else {
                if (!event.ctrlKey) {
                    if (this.state.checks && val.editMark.display == "block") {
                        val.editMark = { display: "block" };
                    } else {
                        val.editMark = { display: "none" };
                    }
                    this.state.chart[i] = val;
                }
            };
            //获取选择顺序
            if (this.state.clickOrderList.length) {
                if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                    if (val.editMark.display != 'block') {
                        this.state.clickOrderList = _.remove(this.state.clickOrderList, cal => {
                            return cal == val.key;
                        });
                    }
                } else {
                    if (val.editMark.display == 'block') {
                        this.state.clickOrderList.push(val.key);
                    }
                }
            } else {
                if (val.editMark.display == 'block') {
                    this.state.clickOrderList.push(val.key);
                }
            }
        });
        this.state.checks = 0;
        this.setState({
            chart: this.state.chart,
            checks: this.state.checks,
            clickOrderList: this.state.clickOrderList
        });
        //回传变化状态
        this.props.onClickOrderList(this.state.clickOrderList);
        this.props.onChartlength(this.state.chart);
    }
    //编辑参数模块显示
    editModalshow(event) {
        let _id = event.currentTarget.attributes['data-key'].value;
        _.forEach(this.state.chart, (val, i) => {
            let key = val.key;
            if (key == _id) {
                //只有选中才可编辑控制
                if (this.state.chart[i].editMark) {
                    if (this.state.chart[i].editMark.display == "block" && !event.ctrlKey) {
                        let scrollWid = this.disRom.clientWidth + this.disRom.scrollLeft;
                        let vright = Number(val.style.left.split('px')[0]) + Number(val.style.width.split('px')[0]);
                        if (scrollWid - vright < 400) {
                            this.state.chart[i].editShow = { width: 400, minHeight: val.style.height, top: val.style.top, left: Number(val.style.left.split('px')[0]) - 400 };
                        } else {
                            this.state.chart[i].editShow = { width: 400, minHeight: val.style.height, top: val.style.top, left: vright };
                        }
                    }
                }
            } else {
                this.state.chart[i].editShow = { width: 0 };
            }
        });
        this.setState({ chart: this.state.chart });
    }
    //检测编辑状态
    checkMark(event) {
        let id = event.currentTarget.attributes['data-id'].value;
        if (event.altKey) {
            return false;
        }
        _.forEach(this.state.chart, (val, i) => {
            val.editShow = { width: 0 }
            if (event.ctrlKey) {
                if (this.state.checks) {
                    if (val.editMark.display == 'block') {
                        val.editMark = { display: "block" };
                    }
                } else {
                    if (val.key == id) {
                        if (val.editMark.display == 'block') {
                            val.editMark = { display: "none" };
                        } else {
                            val.editMark = { display: "block" };
                        }
                    }
                }
            } else {
                if (this.state.checks) {
                    if (val.editMark.display == 'block') {
                        val.editMark = { display: "block" };
                    }
                } else {
                    if (val.key == id) {
                        val.editMark = { display: "block" };
                    } else {
                        val.editMark = { display: "none" };
                    }
                }
            }
            this.state.chart[i] = val;
            //获取选择顺序
            if (this.state.clickOrderList.length) {
                if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                    if (val.editMark.display != 'block') {
                        _.remove(this.state.clickOrderList, cal => {
                            return cal == val.key;
                        });
                    }
                } else {
                    if (val.editMark.display == 'block') {
                        this.state.clickOrderList.push(val.key);
                    }
                }
            } else {
                if (val.editMark.display == 'block') {
                    this.state.clickOrderList.push(val.key);
                }
            }
        });
        this.state.checks = 0;
        this.setState({
            chart: this.state.chart,
            checks: this.state.checks,
            clickOrderList: this.state.clickOrderList
        });
        //回传变化状态
        this.props.onClickOrderList(this.state.clickOrderList);
        this.props.onChartlength(this.state.chart);
    }
    //点击按钮改变大小+拖拽移动位置
    btneditSize(events) {
        let that = this;
        const title = events.currentTarget.title;
        this.state.resizebtn = 1;
        let id = events.currentTarget.attributes['data-id'].value;
        this.state.id = id;
        this.setState({ id: this.state.id });
        let left, height, width, top, eqi, otherNote = {};
        _.forEach(that.state.chart, (val, i) => {
            if (id == val.key) {
                eqi = i;
                left = Number(val.style.left.replace("px", ""));
                top = Number(val.style.top.replace("px", ""));
                height = Number(val.style.height.replace("px", ""));
                width = Number(val.style.width.replace("px", ""));
                if (that.state.scrollT) {
                    that.state.scrollT = that.disRom.scrollTop;
                }
                if (that.state.scrollL) {
                    that.state.scrollL = that.disRom.scrollLeft;
                }

                if (val.proportional) {
                    that.setState({ shift: true });
                } else {
                    that.setState({ shift: false });
                }
            } else {
                otherNote[val["key"]] = [
                    val.style.left,
                    val.style.top,
                    val.style.width,
                    val.style.height
                ];
            }
        });
        if (this.state.resizebtn) {
            let event = events;
            let timerTop = null;
            let timerLeft = null;
            let topFlag = 0;
            let leftFlag = 0;
            that.disRom.addEventListener("mousemove", move, false);
            function move(events) {
                //shift 比例缩放
                if (!that.state.shift) {
                    that.state.shift = events.shiftKey;
                }
                //运行状态禁用编辑
                if (that.state.resizebtn) {

                } else {
                    return false;
                }
                let leftx = left,
                    widthx = width,
                    heightx = height,
                    topx = top,
                    mleft = 0,
                    mtop = 0,
                    mheight = 0,
                    mwidth = 0;
                let checkMany = () => {
                    mwidth = widthx - width;
                    mheight = heightx - height;
                    mtop = topx - top;
                    mleft = leftx - left;
                }
                /*
                    *swipe=>鼠标滑动的距离
                    *oldFalse=>鼠标滑动距离方向的原始值
                    *oldTrue=>需要随这变化的方向的原始值
                    *soures=>当前网格尺码
                */
                let shiftFn = (swipe, oldFalse, oldTrue, soures) => {
                    let itemW = swipe / oldFalse;
                    let newSize = oldTrue + oldTrue * itemW;
                    newSize = Math.ceil(newSize);
                    newSize = newSize - newSize % soures;
                    return newSize;
                };
                switch (title) {
                    case "1":
                        //宽高增长
                        heightx = (((top - that.state.scrollT) - (events.clientY - 60)) + height) - (((top - that.state.scrollT) - (events.clientY - 60)) + height) % Number(that.props.diamond);
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % Number(that.props.diamond);
                        //shift-1  比例增长 
                        if (that.state.shift) {
                            if (((left - that.state.scrollL) - events.clientX) > ((top - that.state.scrollT) - events.clientX)) {
                                heightx = shiftFn(
                                    ((left - that.state.scrollL) - events.clientX),
                                    width,
                                    height,
                                    Number(that.props.diamond)
                                );
                                // heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % Number(that.props.diamond);
                            } else if (((top - that.state.scrollT) - (events.clientY - 60)) > ((left - that.state.scrollL) - (events.clientY - 60))) {
                                widthx = shiftFn(
                                    (top - that.state.scrollT) - (events.clientY - 60),
                                    height,
                                    width,
                                    Number(that.props.diamond)
                                );
                                //widthx = (((top - that.state.scrollT) - (events.clientY - 60)) + width) - (((top - that.state.scrollT) - (events.clientY - 60)) + width) % Number(that.props.diamond);
                            }
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top - (heightx - height);
                        leftx = left - (widthx - width);
                        if (heightx <= 16) {
                            topx = top + height - 16;
                        }
                        if (widthx <= 16) {
                            leftx = left + width - 16;
                        }
                        //多选
                        checkMany();
                        break;
                    case "2":
                        //宽高增长
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % Number(that.props.diamond);
                        leftx = left - (widthx - width);
                        //shift-2  比例增长 
                        if (that.state.shift) {
                            heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % Number(that.props.diamond);
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top;
                        leftx = left - (widthx - width);
                        if (heightx <= 16) {
                            topx = top;
                        }
                        if (widthx <= 16) {
                            leftx = left + width - 16;
                        }
                        //多选
                        checkMany();
                        break;
                    case "3":
                        //宽高增长
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % Number(that.props.diamond);
                        heightx = ((events.clientY - 60) - (top - that.state.scrollT + height)) + height;
                        //shift-3  比例增长 
                        if (that.state.shift) {
                            if (((left - that.state.scrollL) - events.clientX) > ((events.clientY - 60) - (top - that.state.scrollT + height))) {
                                heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % Number(that.props.diamond);
                            } else if (((events.clientY - 60) - (top - that.state.scrollT + height)) > ((left - that.state.scrollL) - events.clientX)) {
                                widthx = (((events.clientY - 60) - (top - that.state.scrollT + height)) + width) - ((events.clientX - (top - that.state.scrollT + height)) + width) % Number(that.props.diamond);
                            }
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top;
                        leftx = left - (widthx - width);
                        if (heightx <= 16) {
                            topx = top;
                        }
                        if (widthx <= 16) {
                            leftx = left + width - 16;
                        }
                        //多选
                        checkMany();
                        break;
                    case "4":
                        //宽高增长
                        heightx = ((events.clientY - 60) - (top - that.state.scrollT + height)) + height;
                        heightx = heightx - heightx % Number(that.props.diamond);
                        //shift-5  比例增长 
                        if (that.state.shift) {
                            widthx = (((events.clientY - 60) - (top - that.state.scrollT + height)) + width) - (((events.clientY - 60) - (top - that.state.scrollT + height)) + width) % Number(that.props.diamond);
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 16) {
                            topx = top;
                        }
                        if (widthx <= 16) {
                            leftx = left;
                        }
                        //多选
                        checkMany();
                        break;
                    case "5":
                        //宽高增长
                        heightx = ((events.clientY - 60) - (top - that.state.scrollT + height)) + height;
                        heightx = heightx - heightx % Number(that.props.diamond);
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % Number(that.props.diamond);
                        //shift-5  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left - that.state.scrollL + width)) > ((events.clientY - 60) - (top - that.state.scrollT + height))) {
                                heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % Number(that.props.diamond);
                            } else if (((events.clientY - 60) - (top - that.state.scrollT + height)) > (events.clientX - (left - that.state.scrollL + width))) {
                                widthx = (((events.clientY - 60) - (top - that.state.scrollT + height)) + width) - (((events.clientY - 60) - (top - that.state.scrollT + height)) + width) % Number(that.props.diamond);
                            }
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 16) {
                            topx = top;
                        }
                        if (widthx <= 16) {
                            leftx = left;
                        }
                        //多选
                        checkMany();
                        break;
                    case "6":
                        //宽高增长
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % Number(that.props.diamond);
                        //shift-6  比例增长 
                        if (that.state.shift) {
                            heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % Number(that.props.diamond);
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top;
                        leftx = left;
                        if (heightx <= 16) {
                            topx = top;
                        }
                        if (widthx <= 16) {
                            leftx = left;
                        }
                        //多选
                        checkMany();
                        break;
                    case "7":
                        //宽高增长
                        heightx = ((top - that.state.scrollT - (events.clientY - 60)) + height) - ((top - that.state.scrollT - (events.clientY - 60)) + height) % Number(that.props.diamond);
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % Number(that.props.diamond);
                        //shift-7  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left - that.state.scrollL + width)) > ((top - that.state.scrollT - (events.clientY - 60)))) {
                                heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % Number(that.props.diamond);
                            } else if (((top - that.state.scrollT - (events.clientY - 60)) + height) > (events.clientX - (left - that.state.scrollL + width))) {
                                widthx = (((top - that.state.scrollT - (events.clientY - 60))) + width) - (((top - that.state.scrollT - (events.clientY - 60))) + width) % Number(that.props.diamond);
                            }
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top - (heightx - height);
                        leftx = left;
                        if (heightx <= 16) {
                            topx = top + height - 16;
                        }
                        if (widthx <= 16) {
                            leftx = left;
                        }
                        //多选
                        checkMany();
                        break;
                    case "8":
                        //宽高增长
                        heightx = ((top - that.state.scrollT - (events.clientY - 60)) + height) - ((top - that.state.scrollT - (events.clientY - 60)) + height) % Number(that.props.diamond);
                        topx = top - that.state.scrollT - (heightx - height);
                        //shift-8  比例增长 
                        if (that.state.shift) {
                            widthx = (((top - that.state.scrollT - (events.clientY - 60))) + width) - (((top - that.state.scrollT - (events.clientY - 60))) + width) % Number(that.props.diamond);
                        }
                        //位置控制
                        widthx <= 16 ? widthx = 16 : widthx;
                        heightx <= 16 ? heightx = 16 : heightx;
                        topx = top - (heightx - height);
                        leftx = left;
                        if (heightx <= 16) {
                            topx = top + height - 16;
                        }
                        if (widthx <= 16) {
                            leftx = left;
                        }
                        //多选
                        checkMany();
                        break;
                    case "9":
                        //已经生成滚动条的情况下(Y轴 纵向)
                        if (that.disRom.scrollTop) {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if ((events.clientY - 60) >= that.disRom.clientHeight - height / 2) {
                                if (!topFlag) {
                                    topFlag = 1;
                                    timerTop = setInterval(() => {
                                        that.state.scrollT += Number(that.props.diamond);
                                        that.disRom.scrollTop = that.state.scrollT;
                                    }, 100)
                                }
                            }
                            //当鼠标距离顶部的距离小于等于半个容器时触发滚动条向上滚动
                            else if ((events.clientY - 60) <= height / 2 + 60) {
                                if (!topFlag) {
                                    topFlag = 1;
                                    timerTop = setInterval(() => {
                                        that.state.scrollT -= Number(that.props.diamond);
                                        that.disRom.scrollTop = that.state.scrollT;
                                        that.state.scrollT <= 60 ? that.state.scrollT = 0 : 1;
                                    }, 100)
                                }
                            } else {
                                topFlag = 0;
                                clearInterval(timerTop);
                            }
                        }
                        //初始高度（未生成滚动条的情况下）
                        else {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if ((events.clientY - 60) >= that.disRom.clientHeight - height / 2) {
                                that.state.scrollT += 1;
                                that.disRom.scrollTop = that.state.scrollT;
                            }
                        }
                        //已经生成滚动条的情况下(x轴 纵向)
                        if (that.disRom.scrollLeft) {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if (events.clientX >= that.disRom.clientWidth - width / 2) {
                                if (!leftFlag) {
                                    leftFlag = 1;
                                    timerLeft = setInterval(() => {
                                        that.state.scrollL += Number(that.props.diamond);
                                        that.disRom.scrollLeft = that.state.scrollL;
                                    }, 100)
                                }
                            }

                            //当鼠标距离顶部的距离小于等于半个容器时触发滚动条向上滚动
                            else if (events.clientX <= width / 2) {
                                if (!leftFlag) {
                                    leftFlag = 1;
                                    timerLeft = setInterval(() => {
                                        that.state.scrollL -= Number(that.props.diamond);
                                        that.disRom.scrollLeft = that.state.scrollL;
                                        that.state.scrollL <= 0 ? that.state.scrollL = 0 : 1;
                                    }, 100)
                                }
                            } else {
                                leftFlag = 0;
                                clearInterval(timerLeft);
                            }
                        }
                        //初始高度（未生成滚动条的情况下）
                        else {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if (events.clientX >= that.disRom.clientWidth - width / 2) {
                                that.state.scrollL += 1;
                                that.disRom.scrollLeft = that.state.scrollL;
                            }
                        }
                        //最终位置设置
                        mtop = 0;
                        mleft = 0;
                        topx = (((events.clientY - 60) + that.disRom.scrollTop) - height / 2) - (((events.clientY - 60) + that.state.scrollT) - height / 2) % Number(that.props.diamond);
                        leftx = ((events.clientX + that.disRom.scrollLeft) - width / 2) - ((events.clientX + that.state.scrollL) - width / 2) % Number(that.props.diamond);
                        //多选拖动
                        mtop = topx - top;
                        mleft = leftx - left;
                        break;
                    default:

                        break;
                }
                //位置控制
                let sWidth = window.screen.width - width;
                let sHeight = window.screen.height - height;
                topx <= 0 ? topx = 0 : topx = topx;
                leftx <= 0 ? leftx = 0 : leftx = leftx;
                //防止同时调用
                if (id == that.state.id) {
                    let itemStyle = Object.assign({}, that.state.chart[eqi].style);
                    itemStyle.top = topx + "px";
                    itemStyle.left = leftx + "px";
                    itemStyle.width = widthx + "px";
                    itemStyle.height = heightx + "px";
                    itemStyle.top = topx + "px";
                    itemStyle.border = "4px dashed cadetblue";
                    that.state.chart[eqi].style = itemStyle;
                    _.forEach(that.state.chart, (val, i) => {
                        if (id != val.key && val.editMark.display == "block") {
                            let { cleft, ctop, cheight, cwidth } = 0;
                            _.forIn(otherNote, (vals, key) => {
                                if (val.key == key) {
                                    cleft = vals[0].split("px")[0];
                                    ctop = vals[1].split("px")[0];
                                    cwidth = vals[2].split("px")[0];
                                    cheight = vals[3].split("px")[0];
                                }
                            });
                            // 位置
                            let pxControlleft = (params) => {
                                if (params <= 0) params = 0;
                                return params;
                            };
                            let pxControltop = (params) => {
                                if (params <= 0) params = 0;
                                return params;
                            };
                            let pxControlWH = (params) => {
                                params <= 16 ? params = 16 : true;
                                return params;
                            }
                            let itemStyle = Object.assign({}, val.style);
                            itemStyle.width = pxControlWH(Number(cwidth) + Number(mwidth)) + "px";
                            itemStyle.height = pxControlWH(Number(cheight) + Number(mheight)) + "px";
                            itemStyle.left = pxControlleft(Number(cleft) + Number(mleft)) + "px";
                            itemStyle.top = pxControltop(Number(ctop) + Number(mtop)) + "px";
                            itemStyle.border = "4px dashed cadetblue";
                            val.style = itemStyle;
                            val.editPass.size = [pxControlWH(Number(cwidth) + Number(mwidth)), pxControlWH(Number(cheight) + Number(mheight))];
                            that.state.chart[i] = val;
                        }
                        val.editShow = { width: 0 };
                    });
                    that.state.chart[eqi].editPass.size = [widthx, heightx];
                }
                that.state.checks = 1;
                that.setState({ chart: that.state.chart });
            }

            that.disRom.onmouseup = () => {
                //移动结束后计算最大的距离
                let styleArrs = _.sortBy(_.map(this.state.chart, 'style'), val => {
                    return -val.left.split('px')[0];
                })[0];
                let styleArrs1 = _.sortBy(_.map(this.state.chart, 'style'), val => {
                    return -val.top.split('px')[0];
                })[0];
                this.state.zhanweiCss = {
                    top: Number(styleArrs1.top.split("px")[0]) + Number(styleArrs.height.split("px")[0]),
                    left: Number(styleArrs.left.split("px")[0]) + Number(styleArrs.width.split("px")[0])
                };
                //速度控制
                clearInterval(timerTop);
                clearInterval(timerLeft);
                leftFlag = 0;
                topFlag = 0;
                //边框控制
                _.forEach(this.state.chart, (val, i) => {
                    let itemStyle = Object.assign({}, val.style)
                    itemStyle.border = "none";
                    val.style = itemStyle;
                })
                //多选控制
                this.state.resizebtn = 0;
                this.setState({
                    resizebtn: this.state.resizebtn,
                    zhanweiCss: this.state.zhanweiCss,
                    checks: this.state.checks
                });
                that.disRom.removeEventListener("mousemove", move, false);
            }
        }
    }
    //编辑框修改值回传
    Editres(res) {
        _.forEach(this.state.chart, (val, i) => {
            if (val.key == res._id) {
                res.size[0] = Number(res.size[0]);
                res.size[1] = Number(res.size[1]);
                val.editPass = res;
                let itemStyle = Object.assign({}, val.style);
                itemStyle.width = res.size[0] + "px";
                itemStyle.height = res.size[1] + "px";
                val.style = itemStyle;
                this.state.chart[i] = val;
            } else {
                let width = Number(val.style.width.split('px')[0]);
                let height = Number(val.style.height.split('px')[0]);
                val.editPass.size = [width, height];
            }
        })
        this.setState({ chart: this.state.chart });
        //回传变化状态
        this.props.onChartlength(this.state.chart);
    }
    //取消全部选中状态
    clearEdit(event) {
        if (event.target.className === 'insertWrapper' && !event.altKey) {
            _.forEach(this.state.chart, (val, i) => {
                val.editShow = { width: 0 };
                val.editMark = { display: "none" };
                let itemStyle = Object.assign({}, val.style);
                itemStyle.border = 'none';
                val.style = itemStyle;
                this.state.chart[i] = val;
            });
            this.state.clickOrderList = [];
            this.setState({
                chart: this.state.chart,
                clickOrderList: this.state.clickOrderList
            });
            //回传变化状态
            this.props.onClickOrderList(this.state.clickOrderList);
            this.props.onChartlength(this.state.chart);
        }
    }
    //删除操作
    deleteFn(e) {
        let num = 0;
        _.forEach(this.state.chart, val => {
            if (val.editMark.display == 'block') {
                num++;
            }
        });
        if (num >= 2) {
            this.state.checks = 1;
            this.setState({
                charts: this.state.checks
            })
            this.props.ontipShow(true);
        } else {
            _.remove(this.state.chart, val => {
                return val.editMark.display == 'block';
            });
            this.setState({ chart: this.state.chart });
        }
        //回传变化状态
        this.props.onChartlength(this.state.chart);
    }
    //复制操作
    copyFn(e) {
        let event = e.currentTarget;
        let _id = event.attributes['data-key'].value;
        _.forEach(this.state.chart, (val, i) => {
            if (val.key == _id || val.editMark.display == 'block') {
                let newVal = Object.assign({}, val);
                newVal.key = newVal.key.split('_')[0] + "_" + _.now() + _.random(0.1, 9999.99);
                let itemStyle = Object.assign({}, newVal.style);
                itemStyle.top = Number(newVal.style.top.split('px')[0]) + Number(newVal.style.width.split('px')[0]) + "px";
                itemStyle.border = "none";
                newVal.style = itemStyle;
                this.state.chart.push(newVal);
            }
        });
        this.setState({ chart: this.state.chart });
        //回传变化状态
        this.props.onChartlength(this.state.chart);
    }
    //开始画框
    drawAreaStart(e) {
        if (e.altKey && !this.props.isplay.status) {
            this.state.scrollL = this.disRom.scrollLeft;
            this.state.scrollT = this.disRom.scrollTop;
            this.state.drawArea = 1;
            this.state.drawCss[2] = e.clientX + this.disRom.scrollLeft;
            this.state.drawCss[3] = (e.clientY - 60) + this.disRom.scrollTop;
            this.state.drawCssNote[0] = e.clientX + this.disRom.scrollLeft;
            this.state.drawCssNote[1] = (e.clientY - 60) + this.disRom.scrollTop;
            this.setState({
                drawArea: this.state.drawArea,
                drawCss: this.state.drawCss
            });
        }
    }
    //绘制框及判断位置选中容器
    drawAreaMove(e) {
        if (e.altKey && this.state.drawArea) {
            //width
            if ((e.clientX + this.disRom.scrollLeft) - this.state.drawCssNote[0] >= 0) {
                let mill = (e.clientX + this.disRom.scrollLeft) - this.state.drawCssNote[0];
                if (this.state.drawCssNote[0] + mill >= this.disRom.scrollWidth - 5) {
                    mill = this.disRom.scrollWidth - 5 - this.state.drawCssNote[0];
                }
                this.state.drawCss[2] = this.state.drawCssNote[0];
                this.state.drawCss[0] = mill;
                //超出屏幕范围
                if (this.disRom.scrollWidth > this.disRom.clientWidth && this.disRom.clientWidth - e.clientX < 50) {
                    this.disRom.scrollLeft >= this.disRom.scrollWidth - this.disRom.clientWidth - 5 ? this.disRom.scrollLeft = this.disRom.scrollLeft : this.disRom.scrollLeft += 8;
                    this.state.scrollL = this.disRom.scrollLeft;
                }
            } else if (this.state.drawCssNote[0] - (e.clientX + this.disRom.scrollLeft) >= 0) {
                let mill = this.state.drawCssNote[0] - (e.clientX + this.disRom.scrollLeft);
                this.state.drawCss[2] = e.clientX + this.disRom.scrollLeft;
                this.state.drawCss[0] = mill;
                //超出屏幕范围
                if (this.disRom.scrollWidth > this.disRom.clientWidth && e.clientX < 50) {
                    this.disRom.scrollLeft <= 0 ? this.disRom.scrollLeft = this.disRom.scrollLeft : this.disRom.scrollLeft -= 8;
                    this.state.scrollL = this.disRom.scrollLeft;
                }
            }
            //height
            if ((e.clientY - 60) + this.disRom.scrollTop - this.state.drawCssNote[1] > 0) {
                let mill = (e.clientY - 60) + this.disRom.scrollTop - this.state.drawCssNote[1];
                this.state.drawCss[3] = this.state.drawCssNote[1];
                this.state.drawCss[1] = mill;
            } else if (this.state.drawCssNote[1] - ((e.clientY - 60) + this.disRom.scrollTop) > 0) {
                this.state.drawCss[3] = (e.clientY - 60) + this.disRom.scrollTop;
                this.state.drawCss[1] = this.state.drawCssNote[1] - ((e.clientY - 60) + this.disRom.scrollTop);
            }
            let RDPXL1 = this.state.drawCss[2];
            let RDPXL2 = this.state.drawCss[0] + this.state.drawCss[2];
            let RDPXT2 = this.state.drawCss[1] + this.state.drawCss[3];
            let RDPXT1 = this.state.drawCss[3];
            _.forEach(this.state.chart, (val, i) => {
                let left = Number(val.style.left.split("px")[0]);
                let width = Number(val.style.width.split("px")[0]);
                let top = Number(val.style.top.split("px")[0]);
                let height = Number(val.style.height.split("px")[0]);
                let isOver = 0;
                //组合情况
                if (((RDPXL2 > left && RDPXL2 < left + width) || (RDPXL1 < left && RDPXL2 > left + width) || (RDPXL1 > left && RDPXL1 < left + width)) && ((RDPXT2 > top && RDPXT2 < top + height) || (RDPXT1 < top && RDPXT2 > top + height) || (RDPXT1 > top && RDPXT1 < top + height))) {
                    isOver = 1;
                }
                else {
                    isOver = 0;
                }
                if (isOver) {
                    val.editMark = { display: "block" };
                } else {
                    val.editMark = { display: "none" };
                }
                this.state.chart[i] = val;
                //获取选择顺序
                if (this.state.clickOrderList.length) {
                    if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                        if (val.editMark.display != 'block') {
                            _.remove(this.state.clickOrderList, cal => {
                                return cal == val.key;
                            });
                        }
                    } else {
                        if (val.editMark.display == 'block') {
                            this.state.clickOrderList.push(val.key);
                        }
                    }
                } else {
                    if (val.editMark.display == 'block') {
                        this.state.clickOrderList.push(val.key);
                    }
                }
            });
            this.setState({
                drawCss: this.state.drawCss,
                chart: this.state.chart
            });
            //回传变化状态
            this.props.onClickOrderList(this.state.clickOrderList);
            this.props.onChartlength(this.state.chart);
        }
    }
    //结束选取，判定事件及状态
    drawAreaEnd(e) {
        if (this.state.drawArea) {
            this.state.drawArea = 0;
            this.state.drawCss = [0, 0, 0, 0];
            this.state.drawCssNote = [0, 0];
            this.setState({
                drawArea: this.state.drawArea,
                drawCss: this.state.drawCss,
                drawCssNote: this.state.drawCssNote
            });
        }
    }

    //层级控制修改
    upIndex(e) {
        //获取点击的容器
        let num = e.currentTarget.attributes['data-num'].value;
        let key = e.currentTarget.attributes['data-key'].value;
        let type = e.currentTarget.attributes['data-type'].value;
        //存储各个容器位置信息数组
        let coners = [];
        //判断有重叠的容器数组,初始数值为点击的容器
        let valArr = [this.state.chart[num]];
        //获取容器的4个位置属性函数 top left right bottom
        let positionFn = (item) => {
            let itemStyle = Object.assign({}, item.style);
            let top = Number(itemStyle.top.split('px')[0]);
            let left = Number(itemStyle.left.split('px')[0]);
            let width = Number(itemStyle.width.split('px')[0]);
            let height = Number(itemStyle.height.split('px')[0]);
            let right = left + width;
            let bottom = top + height;
            return {
                top: top,
                left: left,
                bottom: bottom,
                right: right
            }
        }
        //添加初始值
        coners.push(
            positionFn(this.state.chart[num])
        );
        //判断是否重叠函数
        let isCurse = (item, valItem) => {
            //CASE 1
            let CASE = 1;
            if (valItem.top > item.bottom || valItem.bottom < item.top || valItem.right < item.left || valItem.left > item.right) {
                CASE = 0;
            }
            return CASE;
        };
        //防止重复添加至重叠容器数组
        let uniq = (list, VAL) => {
            //flag 1
            let flag = 1;
            _.forEach(list, lis => {
                if (lis.key == VAL.key) {
                    flag = 0;
                }
            });
            return flag;
        };
        //遍历所有容器数组，识别与当前点击的容器重叠的容器（以此类推，重叠链）
        _.forEach(this.state.chart, (val, i) => {
            _.forEach(coners, (cal, c) => {
                //防止重复添加
                if (isCurse(cal, positionFn(val))) {
                    if (uniq(valArr, val)) {
                        coners.push(positionFn(val));
                        valArr.push(val);
                    }
                }
            });
        });
        //开始改变层级
        if (valArr.length <= 1) {
            return false;
        }
        //当前点击的层级增高
        let indexKey = 0;
        _.forEach(valArr, (val, i) => {
            if (val.key == this.state.chart[num].key) {
                let itemStyle = Object.assign({}, val.style);
                let zindex = Number(itemStyle.zIndex);
                if (type == 'up') {
                    if (zindex - 99999 < valArr.length) {
                        zindex = zindex + 1;
                    };
                } else if (type == 'down') {
                    if (zindex != 99999) {
                        zindex = zindex - 1;
                    };
                }
                itemStyle.zIndex = zindex;
                val.style = itemStyle;
                valArr[i] = val;
                indexKey = zindex;
            }
        });
        //处理同级
        _.forEach(valArr, (val, i) => {
            if (val.key != key) {
                if (val.style.zIndex == indexKey) {
                    let itemStyle = Object.assign({}, val.style);
                    if (type == 'up') {
                        itemStyle.zIndex = Number(itemStyle.zIndex) - 1;

                    } else if (type == 'down') {
                        itemStyle.zIndex = Number(itemStyle.zIndex) + 1;
                    }
                    val.style = itemStyle;
                    valArr[i] = val;
                }
            }
        });
        //将最新的INDE更新到chart
        _.forEach(valArr, val => {
            _.forEach(this.state.chart, (cal, i) => {
                if (val.key == cal.key) {
                    this.state.chart[i] = val;
                }
            });
        });
        //
        this.state.chart = _.sortBy(this.state.chart, val => {
            return -val.style.zIndex;
        });
        this.setState({
            chart: this.state.chart
        });

        //回传变化状态
        this.props.onChartlength(this.state.chart);
    }
    render() {
        console.log(this.state.chart);
        let that = this;//函数作用域调整
        let dragParams = this.props.dragParams;
        if (dragParams.isadd) {
            dragParams.clx = dragParams.clx - this.props.chartElement[dragParams.shape].style.width / 2;
            dragParams.cly = dragParams.cly - this.props.chartElement[dragParams.shape].style.height / 2;
            dragParams.clx = dragParams.clx;
            dragParams.cly = dragParams.cly;
            let disRom = this.disRom;
            if (
                dragParams.clx <= disRom.clientWidth
                && dragParams.clx >= 0
                && dragParams.cly >= 0
                && dragParams.cly <= disRom.clientHeight) {
                //添加容器到显示区
                addMonitorElement(dragParams);
            }
        }
        function addMonitorElement(dps) {
            let top, left, width;
            top = dps.cly + that.disRom.scrollTop;
            left = dps.clx + that.disRom.scrollLeft;
            let dom = that.props.chartElement[dps.shape].style;
            width = (dom.width) + "px";
            let height = (dom.height) + "px";
            let radius = dom.borderRadius + "%";
            //位置必须是网格的倍数
            top = top - top % that.props.diamond + "px";
            left = left - left % that.props.diamond + "px";
            let style = {
                top: top,
                left: left,
                width: width,
                height: height,
                margin: 0,
                zIndex: 99999,
                overflow: "visible",
                border: "none",
                borderRadius: radius,
                background: 'transparent'
            }
            let item = { "key": dps.shape + "_" + _.now(), 'style': style };
            item['editMark'] = { display: 'none' };
            item['editShow'] = { width: 0 };
            item['editPass'] = Object.assign({}, that.props.chartElement[dps.shape].params);
            item['proportional'] = that.props.chartElement[dps.shape].proportional;
            item['zindex'] = that.state.chart.length + 1;
            item.editPass['size'] = [Number(width.split("px")[0]), Number(height.split("px")[0])];
            item.editPass['_id'] = item.key;
            item.editPass['editurn'] = {};
            that.state.chart.push(item);
            that.state.chart = _.sortBy(that.state.chart, val => {
                return -val.style.zIndex;
            });
            //回传变化状态
            that.props.onChartlength(that.state.chart);
            //添加完成后回传控制状态到父组件
            dps.isadd = 0;
            that.props.onOk({ dps })
        }
        //检测运行模式，更改编辑框的显示
        if (this.props.isplay.status) {
            _.forEach(this.state.chart, (mal, i) => {
                this.state.chart[i].editMark = { display: "none" };
                this.state.chart[i].editShow = { width: 0 };
            });
        }
        //二次编辑角标和拖拽按钮生成
        let eightConer = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //选择对应的图表
        function name(nameId, prams) {
            let valRes = "";
            if (nameId) {
                _.forIn(that.props.chartElement, (val, keyname) => {
                    //确认组件身份,防止冲突调用
                    if (keyname == nameId.split("_")[0]) {
                        valRes = val.comItem;
                    }
                })
            }
            if (valRes) {
                return valRes(prams);
            }
        }

        //工具栏样式
        let transtionW = (agment) => {
            let style = {
                width: 0
            };
            if (agment.editMark.display != 'none') {
                style.width = agment.style.width;
                style.top = Number(agment.style.top.split('px')[0]) - 40;
                style.left = agment.style.left;
            }
            return style;
        }
        //生成工具栏
        let tootsts = that.state.chart.map((vals, s) =>
            <div className='editTools' style={transtionW(vals)} key={s}>
                <div className='toolsList'>
                    <em data-key={vals.key} data-num={s} onClick={this.editModalshow.bind(this)} className="fa fa-pencil" title="编辑"></em>
                    <em data-key={vals.key} data-num={s} onClick={this.copyFn.bind(this)} className="fa fa-clone" title="复制"></em>
                    <em data-key={vals.key} data-num={s} onClick={this.deleteFn.bind(this)} className="fa fa-trash-o" title="删除"></em>
                    <em data-key={vals.key} data-type="up" data-num={s} onClick={this.upIndex.bind(this)} className="fa fa-arrow-up" title="层级上移"></em>
                    <em data-key={vals.key} data-type="down" data-num={s} onClick={this.upIndex.bind(this)} className="fa fa-arrow-down" title="层级下移"></em>
                </div>
            </div>
        );

        //容器尺寸控制按钮样式
        let sizebtnCss = (agment) => {
            let css = agment.style;
            let style = {
                width: css.width,
                height: css.height,
                top: css.top,
                left: css.left,
                display: agment.editMark.display
            };
            return style;
        }
        //生成容器尺寸位置控制按钮
        let sizeBtn = that.state.chart.map((vals, s) =>
            <div
                className='bgmark'
                style={sizebtnCss(vals)}
                data-id={vals.key}
                onMouseUp={this.checkMark.bind(this)}
                key={s}>
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
        );
        //生成编辑模块
        let edits = that.state.chart.map((vals, s) =>
            <div className='editDv'
                key={s}
                style={vals.editShow}>
                <Editmodal vals={vals} oneditres={this.Editres.bind(this)} />
            </div>
        );
        //生成图表容器
        let chartsElement = that.state.chart.map((vals, s) =>
            <div
                className={'initChart ' + vals.key}
                key={s}
                title={vals.key}
                style={vals.style}
                onClick={this.editParams.bind(this)}
            >
                {name(vals.key, vals.editPass)}
            </div>
        )
        //画框选取-框
        let drawCss = {
            width: this.state.drawCss[0],
            height: this.state.drawCss[1],
            left: this.state.drawCss[2],
            top: this.state.drawCss[3]
        };
        return (
            <div className='insertWrapper' ref={ref => this.disRom = ref}
                onClick={this.clearEdit.bind(this)}
                onMouseDown={this.drawAreaStart.bind(this)}
                onMouseMove={this.drawAreaMove.bind(this)}
                onMouseUp={this.drawAreaEnd.bind(this)}
            >
                <div id="markModal" style={drawCss}></div>
                <div id="conorFlag" style={this.state.zhanweiCss}></div>
                {tootsts}
                {edits}
                {sizeBtn}
                {chartsElement}
            </div>
        );
    }
}