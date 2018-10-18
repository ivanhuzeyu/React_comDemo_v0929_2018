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
        }
    }

    //render之前获取更新
    shouldComponentUpdate(nextProps, nextState) {
        nextState.chart = nextProps.charts;
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
        this.setState({
            chart: this.state.chart,
        });
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
                        //border 
                        this.state.chart[i].style = {
                            top: val.style.top,
                            left: val.style.left,
                            width: val.style.width,
                            height: val.style.height,
                            margin: val.style.margin,
                            overflow: val.style.overflow,
                            border: "4px dashed transparent",
                            zIndex: val.style.zIndex,
                            borderRadius: val.style.borderRadius
                        }
                        if (chartEdits[i].editMark.display == 'block') {
                            if(!this.state.checks){
                                chartEdits[i].editMark = { "display": "none" };
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
                }
            }
        );
        this.state.checks = 0;
        this.setState({
            chart: this.state.chart,
            checks: this.state.checks
        });
        //回传变化状态
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
                            this.state.chart[i].editShow = { display: 'block', minHeight: val.style.height, left: -400 + "px" };
                        } else {
                            this.state.chart[i].editShow = { display: 'block', minHeight: val.style.height, left: 100 + "%" };
                        }
                        this.setState({ chart: this.state.chart });
                    }
                }
            }
        });
    }
    //编辑参数模块隐藏
    editModalhide(event) {
        let classNames = event.currentTarget.className;
        classNames = classNames.split(" ")[1];
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
        let left, height, width, top, eqi, otherNote = {};
        _.forEach(that.state.chart, (val, i) => {
            if (name == val.key) {
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
                switch (title) {
                    case "1":
                        //宽高增长
                        heightx = (((top - that.state.scrollT) - events.clientY) + height) - (((top - that.state.scrollT) - events.clientY) + height) % 8;
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % 8;
                        //shift-1  比例增长 
                        if (that.state.shift) {
                            if (((left - that.state.scrollL) - events.clientX) > ((top - that.state.scrollT) - events.clientX)) {
                                heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % 8;
                            } else if (((top - that.state.scrollT) - events.clientY) > ((left - that.state.scrollL) - events.clientY)) {
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
                        //多选
                        checkMany();
                        break;
                    case "2":
                        //宽高增长
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % 8;
                        leftx = left - (widthx - width);
                        //shift-2  比例增长 
                        if (that.state.shift) {
                            heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % 8;
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
                        //多选
                        checkMany();
                        break;
                    case "3":
                        //宽高增长
                        widthx = (((left - that.state.scrollL) - events.clientX) + width) - (((left - that.state.scrollL) - events.clientX) + width) % 8;
                        heightx = (events.clientY - (top - that.state.scrollT + height)) + height;
                        //shift-3  比例增长 
                        if (that.state.shift) {
                            if (((left - that.state.scrollL) - events.clientX) > (events.clientY - (top - that.state.scrollT + height))) {
                                heightx = (((left - that.state.scrollL) - events.clientX) + height) - (((left - that.state.scrollL) - events.clientX) + height) % 8;
                            } else if ((events.clientY - (top - that.state.scrollT + height)) > ((left - that.state.scrollL) - events.clientX)) {
                                widthx = ((events.clientY - (top - that.state.scrollT + height)) + width) - ((events.clientX - (top - that.state.scrollT + height)) + width) % 8;
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
                        //多选
                        checkMany();
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
                        //多选
                        checkMany();
                        break;
                    case "5":
                        //宽高增长
                        heightx = (events.clientY - (top - that.state.scrollT + height)) + height;
                        heightx = heightx - heightx % 8;
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-5  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left - that.state.scrollL + width)) > (events.clientY - (top - that.state.scrollT + height))) {
                                heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % 8;
                            } else if ((events.clientY - (top - that.state.scrollT + height)) > (events.clientX - (left - that.state.scrollL + width))) {
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
                        //多选
                        checkMany();
                        break;
                    case "6":
                        //宽高增长
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-6  比例增长 
                        if (that.state.shift) {
                            heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % 8;
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
                        //多选
                        checkMany();
                        break;
                    case "7":
                        //宽高增长
                        heightx = ((top - that.state.scrollT - events.clientY) + height) - ((top - that.state.scrollT - events.clientY) + height) % 8;
                        widthx = (events.clientX - (left - that.state.scrollL + width)) + width;
                        widthx = widthx - widthx % 8;
                        //shift-7  比例增长 
                        if (that.state.shift) {
                            if ((events.clientX - (left - that.state.scrollL + width)) > ((top - that.state.scrollT - events.clientY) + height)) {
                                heightx = ((events.clientX - (left - that.state.scrollL + width)) + height) - ((events.clientX - (left - that.state.scrollL + width)) + height) % 8;
                            } else if (((top - that.state.scrollT - events.clientY) + height) > (events.clientX - (left - that.state.scrollL + width))) {
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
                        //多选
                        checkMany();
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
                        //多选
                        checkMany();
                        break;
                    case "9":
                        //已经生成滚动条的情况下(Y轴 纵向)
                        if (that.disRom.scrollTop) {
                            //当鼠标距离底部的距离小于等于半个容器时触发滚动条向下滚动
                            if (events.clientY >= that.disRom.clientHeight - height / 2) {
                                if (!topFlag) {
                                    topFlag = 1;
                                    timerTop = setInterval(() => {
                                        that.state.scrollT += 8;
                                        that.disRom.scrollTop = that.state.scrollT;
                                    }, 100)
                                }
                            }
                            //当鼠标距离顶部的距离小于等于半个容器时触发滚动条向上滚动
                            else if (events.clientY <= height / 2 + 60) {
                                if (!topFlag) {
                                    topFlag = 1;
                                    timerTop = setInterval(() => {
                                        that.state.scrollT -= 8;
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
                            if (events.clientY >= that.disRom.clientHeight - height / 2) {
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
                                        that.state.scrollL += 8;
                                        that.disRom.scrollLeft = that.state.scrollL;
                                    }, 100)
                                }
                            }
                            //当鼠标距离顶部的距离小于等于半个容器时触发滚动条向上滚动
                            else if (events.clientX <= width / 2) {
                                if (!leftFlag) {
                                    leftFlag = 1;
                                    timerLeft = setInterval(() => {
                                        that.state.scrollL -= 8;
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
                        topx = ((events.clientY + that.disRom.scrollTop) - height / 2) - ((events.clientY + that.state.scrollT) - height / 2) % 8;
                        leftx = ((events.clientX + that.disRom.scrollLeft) - width / 2) - ((events.clientX + that.state.scrollL) - width / 2) % 8;
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
                topx <= 60 ? topx = 60 : topx = topx;
                leftx <= 0 ? leftx = 0 : leftx = leftx;
                //防止同时调用
                if (id == that.state.id) {
                    that.state.chart[eqi].style = {
                        top: topx + "px",
                        left: leftx + "px",
                        width: widthx + "px",
                        height: heightx + "px",
                        margin: 0,
                        zIndex: that.state.chart[eqi].style.zIndex,
                        overflow: "visible",
                        border: "4px dashed cadetblue",
                        borderRadius: that.state.chart[eqi].style.borderRadius
                    };
                    _.forEach(that.state.chart, (val, i) => {
                        if (name != val.key && val.editMark.display == "block") {
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
                                if (params <= 60) params = 60;
                                return params;
                            };
                            let pxControlWH = (params) => {
                                params <= 80 ? params = 80 : true;
                                return params;
                            }
                            val.style = {
                                width: pxControlWH(Number(cwidth) + Number(mwidth)) + "px",
                                height: pxControlWH(Number(cheight) + Number(mheight)) + "px",
                                left: pxControlleft(Number(cleft) + Number(mleft)) + "px",
                                top: pxControltop(Number(ctop) + Number(mtop)) + "px",
                                margin: val.style.margin,
                                overflow: val.style.overflow,
                                border: "4px dashed cadetblue",
                                zIndex: val.style.zIndex,
                                borderRadius: val.style.borderRadius,
                            }
                            that.state.chart[i].editPass.size = [pxControlWH(Number(cwidth) + Number(mwidth)), pxControlWH(Number(cheight) + Number(mheight))];
                            that.state.chart[i] = val;
                        }
                    });
                    that.state.chart[eqi].editShow = { display: "none" };
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
                    val.style = {
                        width: val.style.width,
                        height: val.style.height,
                        left: val.style.left,
                        top: val.style.top,
                        margin: val.style.margin,
                        overflow: val.style.overflow,
                        border: "4px dashed transparent",
                        zIndex: val.style.zIndex,
                        borderRadius: val.style.borderRadius,
                    }
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
                val.editPass = res;
                val.style = {
                    top: val.style.top,
                    left: val.style.left,
                    width: res.size[0] + "px",
                    height: res.size[1] + "px",
                    margin: 0,
                    overflow: "visible",
                    zIndex: val.style.zIndex,
                    border: val.style.border,
                    borderRadius: val.style.borderRadius
                }
                this.state.chart[i] = val;
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
                val.editMark = { display: "none" };
                val.style = {
                    top: val.style.top,
                    left: val.style.left,
                    width: val.style.width,
                    height: val.style.height,
                    margin: val.style.margin,
                    zIndex: val.style.zIndex,
                    overflow: val.style.overflow,
                    border: "4px dashed transparent",
                    borderRadius: val.style.borderRadius
                }
                this.state.chart[i] = val;
            })
            this.setState({ chart: this.state.chart });
            //回传变化状态
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
                newVal.style = {
                    top: Number(newVal.style.top.split('px')[0]) + Number(newVal.style.width.split('px')[0]) + "px",
                    left: newVal.style.left,
                    width: newVal.style.width,
                    height: newVal.style.height,
                    margin: newVal.style.margin,
                    overflow: newVal.style.overflow,
                    zIndex: newVal.style.zIndex,
                    border: "4px dashed transparent",
                    borderRadius: newVal.style.borderRadius
                }
                this.state.chart.push(newVal);
            }
        });
        this.setState({ chart: this.state.chart });
        //回传变化状态
        this.props.onChartlength(this.state.chart);
    }
    //层级函数
    choseIndex(e) {
        let event = e.currentTarget;
        //层级范围
        if (event.value <= 1) {
            event.value = 1;
        } else if (event.value >= this.state.chart.length) {
            event.value = this.state.chart.length;
        };
        event.value = parseInt(event.value);
        let _id = event.attributes['data-key'].value;
        _.forEach(this.state.chart, (val, i) => {
            if (val.key == _id) {
                this.state.chart[i].style = {
                    top: val.style.top,
                    left: val.style.left,
                    width: val.style.width,
                    height: val.style.height,
                    margin: val.style.margin,
                    overflow: val.style.overflow,
                    zIndex: 99999 + Number(event.value),
                    border: val.style.border,
                    borderRadius: val.style.borderRadius
                };
            }
        });
        this.setState({ chart: this.state.chart });
    }
    //开始画框
    drawAreaStart(e) {
        if (e.altKey && !this.props.isplay.status) {
            this.state.scrollL = this.disRom.scrollLeft;
            this.state.scrollT = this.disRom.scrollTop;
            this.state.drawArea = 1;
            this.state.drawCss[2] = e.clientX + this.disRom.scrollLeft;
            this.state.drawCss[3] = e.clientY + this.disRom.scrollTop;
            this.state.drawCssNote[0] = e.clientX + this.disRom.scrollLeft;
            this.state.drawCssNote[1] = e.clientY + this.disRom.scrollTop;
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
            if (e.clientY + this.disRom.scrollTop - this.state.drawCssNote[1] > 0) {
                let mill = e.clientY + this.disRom.scrollTop - this.state.drawCssNote[1];
                this.state.drawCss[3] = this.state.drawCssNote[1];
                this.state.drawCss[1] = mill;
            } else if (this.state.drawCssNote[1] - (e.clientY + this.disRom.scrollTop) > 0) {
                this.state.drawCss[3] = e.clientY + this.disRom.scrollTop;
                this.state.drawCss[1] = this.state.drawCssNote[1] - (e.clientY + this.disRom.scrollTop);
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
            });
            this.setState({
                drawCss: this.state.drawCss,
                chart: this.state.chart
            });
            //回传变化状态
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

    render() {
        let that = this;//函数作用域调整
        let dragParams = this.props.dragParams;
        if (dragParams.isadd) {
            dragParams.clx = dragParams.clx - this.props.chartElement[dragParams.shape].style.width / 2;
            dragParams.cly = dragParams.cly - this.props.chartElement[dragParams.shape].style.height / 2;
            dragParams.clx = dragParams.clx - dragParams.clx % 8;
            dragParams.cly = dragParams.cly - dragParams.cly % 8;
            let disRom = this.disRom;
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
            top = dps.cly + that.disRom.scrollTop;
            left = dps.clx + that.disRom.scrollLeft;
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
                zIndex: 99999 + that.state.chart.length + 1,
                overflow: "visible",
                border: "4px dashed transparent",
                borderRadius: radius
            }
            let item = { "key": dps.shape + "_" + _.now(), 'style': style };
            item['editMark'] = { display: 'none' };
            item['editShow'] = { display: 'none' };
            item['editPass'] = Object.assign({}, that.props.chartElement[dps.shape].params);
            item.editPass['size'] = [Number(width.split("px")[0]), Number(height.split("px")[0])]
            item.editPass['_id'] = item.key;
            item.editPass['editurn'] = {};
            item['proportional'] = that.props.chartElement[dps.shape].proportional;
            item['zindex'] = that.state.chart.length + 1;
            that.state.chart.push(item);
            //添加完成后回传控制状态到父组件
            dps.isadd = 0;
            that.props.onOk({ dps })
        }
        //检测运行模式，更改编辑框的显示
        if (this.props.isplay.status) {
            _.forEach(this.state.chart, (mal, i) => {
                this.state.chart[i].editMark = { display: "none" };
                this.state.chart[i].editShow = { display: "none" };
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
        //工具栏显示
        let transtionW = (agment) => {
            let style = {
                width: 0
            };
            if (agment.display != 'none') {
                style.width = 100 + "%";
            }
            return style;
        }
        //生成图表容器
        let chartsElement = that.state.chart.map((vals, s) =>
            <div
                className={'initChart ' + vals.key}
                key={s}
                title={vals.key}
                style={vals.style}
                onClick={this.editParams.bind(this)}
                onMouseLeave={this.editModalhide.bind(this)}
            >
                <div className='editDv'
                    key={s}
                    style={vals.editShow}>
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
                <div className='editTools' style={transtionW(vals.editMark)}>
                    <div className='toolsList'>
                        <em data-key={vals.key} onClick={this.editModalshow.bind(this)} className="fa fa-pencil" title="编辑"></em>
                        <label htmlFor={'zIndex' + vals.key} className="input">
                            {vals.style.zIndex - 99999}
                        </label>
                        <em>层级:
                            <input
                                id={'zIndex' + vals.key}
                                data-key={vals.key}
                                type='number'
                                defaultValue={s + 1}
                                onChange={this.choseIndex.bind(this)}
                            />
                        </em>
                        <em data-key={vals.key} onClick={this.copyFn.bind(this)} className="fa fa-clone" title="复制"></em>
                        <em data-key={vals.key} onClick={this.deleteFn.bind(this)} className="fa fa-trash-o" title="删除"></em>
                    </div>
                </div>
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
                {chartsElement}
            </div>
        );
    }
}