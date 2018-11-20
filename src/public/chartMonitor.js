import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import InsertWrapper from './comshowArea';
import Positionnode from './falseCom';
import Indexlist from './menuList';
import Navlist from './nav';
import TipModal from './tipsModal';
import './css/chartMonitor.css'
import { SketchPicker } from 'react-color';



//接口函数
let obj = {};
let resTingdata = (key, value) => {
    obj[key] = value;
};



//父级组件 调用回传
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            info: "block",
            diamond: 8,
            lineColor: "#ccc",
            lineChose: false,
            bgColor: "#fff",
            bgChose: false,
            addDrap: {
                'flag': 0,
                'clx': 0,
                'cly': 0,
                'shape': 'squre',
                'isadd': 0,
            },
            play: {
                status: 1,
                playshow: "none"
            },
            navShow: false,
            charts: [],
            clickOrderList: [],
            chartElement: [],
            isAnimate: "",
            save: 0,
            tipShow: false,
            undoreList: [],
            undoNum: 0
        }
    }

    //接收传值开始调用
    componentWillMount() {
        if (!_.isEmpty(this.props.load)) {
            let loadData = this.props.load;
            this.state.diamond = loadData.diamond;
            this.state.lineColor = loadData.lineColor;
            this.state.bgColor = loadData.bgColor;
            this.state.charts = loadData.charts;
        }
        this.state.play = {
            status: 1,
            playshow: "none"
        };
        this.state.info = 'none';
        this.state.chartElement = obj;
        this.doChild(this.state.charts);
        this.setState({
            play: this.state.play,
            info: this.state.info,
            charts: this.state.charts,
            chartElement: this.state.chartElement,
            isAnimate: this.state.isAnimate
        });
    }
    //doChild
    doChild(res) {
        let newres = JSON.stringify(res);
        if (newres != this.state.undoreList[this.state.undoNum]) {
            this.state.undoreList.splice(this.state.undoNum + 1, 0, newres);
            this.state.undoNum++;
            this.setState({
                undoreList: this.state.undoreList,
                undoNum: this.state.undoNum
            });
        } else {
            return false;
        }
    }
    //undo
    undo() {
        this.state.undoNum ? this.state.undoNum-- : this.state.undoNum;
        this.state.charts = JSON.parse(this.state.undoreList[this.state.undoNum]);
        this.setState({
            charts: this.state.charts,
            undoNum: this.state.undoNum
        });
    }
    //redo
    redo() {
        this.state.undoNum >= this.state.undoreList.length - 1 ? this.state.undoNum : this.state.undoNum++;
        this.state.charts = JSON.parse(this.state.undoreList[this.state.undoNum]);
        this.setState({
            charts: this.state.charts,
            undoNum: this.state.undoNum
        });
    }
    //网格显示控制传值函数
    passParms(res) {
        this.state.diamond = res;
        this.setState({
            diamond: this.state.diamond
        });
    }
    //网格线颜色变化
    lineColor(res) {
        this.state.lineColor = res.hex;
        this.setState({
            lineColor: this.state.lineColor
        });
    }
    //网格颜色调节器是否显示
    lineChose(res) {
        this.state.lineChose = res;
        this.setState({
            lineChose: this.state.lineChose
        });
    }
    //背景颜色变化
    bgColor(res) {
        this.state.bgColor = res.hex;
        this.setState({
            bgColor: this.state.bgColor
        });
    }

    //背景颜色调节器是否显示
    bgChose(res) {
        this.state.bgChose = res;
        this.setState({
            bgChose: this.state.bgChose
        });
    }
    //拖拽位置传值函数
    addDrapFn(res) {
        this.state.addDrap = res.res.drapflag;
        this.setState({ addDrap: this.state.addDrap })
    }
    //价值完毕
    consTrue(res) {
        let borderLeft = window.innerWidth - window.innerWidth * 0.2;
        let width = this.state.chartElement[res.res.drapflag.shape].style.width;
        if (res.res.drapflag.clx + width / 2 > borderLeft && !res.res.drapflag.flag) {
            return false;
        }
        this.state.addDrap = res.res.drapflag;
        this.setState({ addDrap: this.state.addDrap })
    }
    //添加容器完成回传控制函数
    addFinsh(res) {
        this.state.addDrap = res.dps;
        this.setState({ addDrap: this.state.addDrap })
    }
    //点击运行按钮
    playParams(res) {
        this.state.play = res.plays;
        this.state.info = res.plays.playshow;
        this.state.lineChose = false;
        this.state.bgChose = false;
        res.plays.status ? this.state.navShow = false : this.state.navShow = true;
        if (this.state.play.status == 0) {
            this.state.isAnimate = false;
        }
        this.setState({
            info: this.state.info,
            play: this.state.play,
            isAnimate: this.state.isAnimate,
            navShow: this.state.navShow,
            lineChose: this.state.lineChose,
            bgChose: this.state.bgChose
        });
    }
    //动画运行回传状态
    isAnimates(res) {
        this.state.isAnimate = res;
        this.setState({ isAnimate: this.state.isAnimate })
    }
    //接收容器实例
    chartListFn(res) {
        this.state.charts = res;
        this.doChild(this.state.charts);
        this.setState({
            charts: this.state.charts
        });
    }
    //操作容器列表回传值
    chartListdataFn(res) {
        this.state.charts = res;
        this.doChild(this.state.charts);
        this.setState({
            charts: this.state.charts,
        });
    };
    //容器选择顺序记载
    clickOrderList(res) {
        this.state.clickOrderList = res;
        this.setState({
            clickOrderList: this.state.clickOrderList
        });
    }
    //调用提示框
    tipshow(res) {
        this.state.tipShow = true;
        this.setState({
            tipShow: this.state.tipShow
        });
    }
    //调用提示框回传
    tipRes(res) {
        this.state.tipShow = res.show;
        this.state.charts = res.charts;
        this.doChild(this.state.charts);
        this.setState({
            show: this.state.show,
            charts: this.state.charts
        });
    }
    //回传保存的数据
    saveFlag(res) {
        this.state.save = res;
        this.setState({ save: this.state.save })
    }
    saveData(res) {
        let sJson = {};
        sJson['play'] = this.state.play;
        sJson['info'] = this.state.info;
        sJson['diamond'] = this.state.diamond;
        sJson['lineColor'] = this.state.lineColor;
        sJson['bgColor'] = this.state.bgColor;
        sJson['charts'] = res;
        this.props.save(sJson);
        this.state.save = 0;
        this.setState({ save: this.state.save })
    }
    //导航隐藏控函数
    navHide(e) {
        if (!this.state.play.status) {
            return false;
        }
        this.state.navShow = !this.state.navShow;
        this.setState({
            navShow: this.state.navShow
        });
    }
    //水平垂直居中状态传递
    horizontal(res) {
        //当被选取的容器数量为单数或者为0时不触发任何操作
        if (this.state.clickOrderList.length < 2) {
            return false;
        };
        //取出第一个选取的容器的相应属性
        let sameObj = {
            size: [],
            width: "",
            height: "",
            left: "",
            top: "",
        };
        _.forEach(this.state.charts, (val, i) => {
            if (val.key == this.state.clickOrderList[0]) {
                sameObj.size = val.editPass.size;
                sameObj.width = val.style.width;
                sameObj.height = val.style.height;
                sameObj.left = val.style.left;
                sameObj.top = val.style.top;
            }
        });
        //大小相等函数
        if (res == 'o') {
            _.forEach(this.state.charts, (val, i) => {
                if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                    val.editPass.size = sameObj.size;
                    let itemStyle = Object.assign({}, val.style);
                    itemStyle.width = sameObj.width;
                    itemStyle.height = sameObj.height;
                    val.style = itemStyle;
                    this.state.charts[i] = val;
                };
            });
        }
        //垂直对齐函数
        else if (res == 'v') {
            _.forEach(this.state.charts, (val, i) => {
                if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                    let itemPx = (Number(sameObj.width.split('px')[0]) - Number(val.style.width.split('px')[0])) / 2;
                    let itemStyle = Object.assign({}, val.style);
                    itemStyle.left = Number(sameObj.left.split('px')[0]) + itemPx + "px";
                    val.style = itemStyle;
                    this.state.charts[i] = val;
                };
            });
        }
        //水平对齐函数
        else if (res == 'h') {
            _.forEach(this.state.charts, (val, i) => {
                if (_.indexOf(this.state.clickOrderList, val.key) != -1) {
                    let itemPx = (Number(sameObj.height.split('px')[0]) - Number(val.style.height.split('px')[0])) / 2;
                    let itemStyle = Object.assign({}, val.style);
                    itemStyle.top = Number(sameObj.top.split('px')[0]) + itemPx + "px";
                    val.style = itemStyle;
                    this.state.charts[i] = val;
                };
            });
        }
        this.doChild(this.state.charts);
        this.setState({
            charts: this.state.charts
        });
    }
    //点击撤销操作
    ctrlZ() {
        this.undo();
    }
    ctrlY() {
        this.redo();
    }
    //键盘撤销恢复事件
    keyCtrlz(e) {
        e.persist()
        if (!this.state.play.status && e.ctrlKey && e.key == 'z') {
            this.undo();
        } else if (!this.state.play.status && e.ctrlKey && e.key == 'y') {
            this.redo();
        }
    }
    render() {
        //菜单栏以及显示区域样式变化
        let rightClass = 'artRight rightList_show';
        let btnClass = "fa fa-chevron-circle-down";
        let flexStyle = {
            width: 80 + "%",
            background: this.state.bgColor
        };
        if (this.state.play.status) {
            flexStyle.width = 100 + "%";
            rightClass = 'artRight rightList_hide';
        } else {
            if (!this.state.isAnimate) {
                flexStyle.width = 80 + "%";
            } else {
                flexStyle.width = 100 + "%";
            }
        };
        let artheight = window.innerHeight - 60;
        flexStyle['height'] = artheight;
        flexStyle['marginTop'] = 60;
        //导航样式变化
        let navStyle = {
            top: 0
        };
        if (this.state.navShow) {
            navStyle.top = 0;
            btnClass = "fa fa-chevron-circle-up";
        } else {
            navStyle.top = -60;
            flexStyle['height'] = 100 + "%";
            flexStyle['marginTop'] = 0;
            btnClass = "fa fa-chevron-circle-down";
        }
        //网格线颜色选择器显示
        let lineChoseStyle = {
            display: this.state.lineChose ? 'block' : 'none'
        }
        //背景颜色选择器
        let bgChoseStyle = {
            display: this.state.bgChose ? 'block' : "none"
        }
        return (
            <div
                className="conTent"
                tabIndex='-1'
                onKeyDown={this.keyCtrlz.bind(this)}
            >
                {/* 提示框 */}
                <TipModal
                    tipShow={this.state.tipShow}
                    charts={this.state.charts}
                    tipRes={this.tipRes.bind(this)} />
                {/* 颜色选择择器 */}
                <div id='lineColor_wrapper' style={lineChoseStyle}>
                    <SketchPicker
                        color={this.state.lineColor}
                        onChange={this.lineColor.bind(this)}
                    />
                </div>
                {/* 背景颜色选择器 */}
                <div id='bgColor_wrapper' style={bgChoseStyle}>
                    <SketchPicker
                        color={this.state.bgColor}
                        onChange={this.bgColor.bind(this)}
                    />
                </div>
                <div
                    className="navGroup"
                    style={navStyle}
                >
                    {/* 导航 */}
                    <Navlist
                        modal={this.state.info}
                        play={this.state.play}
                        diamond={this.state.diamond}
                        lineColor={this.state.lineColor}
                        lineChose={this.state.lineChose}
                        bgColor={this.state.bgColor}
                        bgChose={this.state.bgChose}
                        horizontal={this.horizontal.bind(this)}
                        onPlay={this.playParams.bind(this)}
                        onClick={this.passParms.bind(this)}
                        onSavedata={this.saveFlag.bind(this)}
                        onLineChose={this.lineChose.bind(this)}
                        onBgChose={this.bgChose.bind(this)}
                        onCtrlZ={this.ctrlZ.bind(this)}
                        onCtrlY={this.ctrlY.bind(this)}
                    />
                </div>
                <div id='navShowbtn'>
                    <em
                        className={btnClass}
                        onClick={this.navHide.bind(this)}
                    ></em>
                </div>
                <div className='articWrapper'>
                    {/* 模拟容器 */}
                    <Positionnode
                        paramsPosition={this.state.addDrap}
                        diamond={this.state.diamond}
                        style={this.state.chartElement}
                        onres={this.consTrue.bind(this)}
                    />
                    <div
                        className='artLeft'
                        style={flexStyle}

                    >
                        {/* 真实组件显示区域 */}
                        <InsertWrapper
                            isplay={this.state.play}
                            dragParams={this.state.addDrap}
                            chartElement={this.state.chartElement}
                            charts={this.state.charts}
                            saveresFlag={this.state.save}
                            diamond={this.state.diamond}
                            clickOrderList={this.state.clickOrderList}
                            lineColor={this.state.lineColor}
                            bgColor={this.state.bgColor}
                            onOk={this.addFinsh.bind(this)}
                            onSavedateres={this.saveData.bind(this)}
                            onChartlength={this.chartListFn.bind(this)}
                            ontipShow={this.tipshow.bind(this)}
                            onClickOrderList={this.clickOrderList.bind(this)}
                        />
                    </div>
                    <div
                        className={rightClass}
                        style={{ display: this.state.play.playshow }}>
                        {/* 右侧列表组 */}
                        <Indexlist
                            chartElement={this.state.chartElement}
                            dragParams={this.state.addDrap}
                            endPlay={this.state.play.status}
                            chartList={this.state.charts}
                            clickOrderList={this.state.clickOrderList}
                            isAnimate={this.state.isAnimate}
                            onClick={this.addDrapFn.bind(this)}
                            onAnimates={this.isAnimates.bind(this)}
                            chartListdata={this.chartListdataFn.bind(this)}
                            ontipShow={this.tipshow.bind(this)}
                            onClickOrderList={this.clickOrderList.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export {
    resTingdata,
    App
} 
