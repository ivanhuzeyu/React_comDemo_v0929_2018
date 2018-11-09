import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import InsertWrapper from './comshowArea';
import Backlinecover from './backLine';
import Positionnode from './falseCom';
import Indexlist from './menuList';
import Navlist from './nav';
import TipModal from './tipsModal';
import './css/chartMonitor.css'

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
            bgColor: "#fff",
            addDrap: {
                'flag': 0,
                'clx': 0,
                'cly': 0,
                'shape': 'squre',
                'isadd': 0,
            },
            play: {
                status: 0,
                playshow: "block"
            },
            navShow: false,
            charts: [],
            chartElement: [],
            isAnimate: "",
            save: 0,
            tipShow: false,
            horizontal: ''

        }
    }

    //接收传值开始调用
    componentWillMount() {
        if (!_.isEmpty(this.props.load)) {
            let loadData = this.props.load;
            this.state.play = {
                status: 1,
                playshow: "none"
            };
            this.state.info = 'none';
            this.state.diamond = loadData.diamond;
            this.state.lineColor = loadData.lineColor;
            this.state.bgColor = loadData.bgColor;
            this.state.charts = loadData.charts;
        }
        this.state.chartElement = obj;
        this.setState({
            play: this.state.play,
            info: this.state.info,
            charts: this.state.charts,
            chartElement: this.state.chartElement,
            isAnimate: this.state.isAnimate
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
        this.state.lineColor = res;
        this.setState({
            lineColor: this.state.lineColor
        });
    }
    //背景颜色变化
    bgColor(res) {
        this.state.bgColor = res;
        this.setState({
            bgColor: this.state.bgColor
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
        res.plays.status ? this.state.navShow = false : this.state.navShow = true;
        this.setState({
            info: this.state.info,
            play: this.state.play,
            navShow: this.state.navShow
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
        this.setState({
            charts: this.state.charts
        });
    }
    //操作容器列表回传值
    chartListdataFn(res) {
        this.state.charts = res;
        this.setState({
            charts: this.state.charts,
        })
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
        this.state.navShow = !this.state.navShow;
        this.setState({
            navShow: this.state.navShow
        });
    }
    //水平垂直居中状态传递
    horizontal(res) {
        this.state.horizontal = res;
        this.setState({
            horizontal: this.state.horizontal
        });
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
        return (
            <div className="conTent">
                {/* 提示框 */}
                <TipModal
                    tipShow={this.state.tipShow}
                    charts={this.state.charts}
                    tipRes={this.tipRes.bind(this)} />
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
                        bgColor={this.state.bgColor}
                        horizontal={this.horizontal.bind(this)}
                        onPlay={this.playParams.bind(this)}
                        onClick={this.passParms.bind(this)}
                        onSavedata={this.saveFlag.bind(this)}
                        onBgColor={this.bgColor.bind(this)}
                        onLineColor={this.lineColor.bind(this)}
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
                            horizontal={this.state.horizontal}
                            onOk={this.addFinsh.bind(this)}
                            onSavedateres={this.saveData.bind(this)}
                            onChartlength={this.chartListFn.bind(this)}
                            ontipShow={this.tipshow.bind(this)}
                        />
                        {/* 组件网格显示区域 */}
                        <Backlinecover
                            backmodal={this.state.info}
                            diamond={this.state.diamond}
                            lineColor={this.state.lineColor}
                            bgColor={this.state.bgColor}
                        />
                    </div>
                    <div
                        className={rightClass}
                        style={{ display: this.state.play.playshow }}>
                        {/* 右侧列表组 */}
                        <Indexlist
                            chartElement={this.state.chartElement}
                            dragParams={this.state.addDrap}
                            onClick={this.addDrapFn.bind(this)}
                            onAnimates={this.isAnimates.bind(this)}
                            endPlay={this.state.play.status}
                            chartList={this.state.charts}
                            chartListdata={this.chartListdataFn.bind(this)}
                            ontipShow={this.tipshow.bind(this)}
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
