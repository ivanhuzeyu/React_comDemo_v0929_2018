import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import InsertWrapper from './comshowArea';
import Backlinecover from './backLine';
import Positionnode from './falseCom';
import Indexlist from './menuList';
import Navlist from './nav';
import TipModal from './tipsModal';
import './chartMonitor.css';

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
            charts: [],
            chartElement: [],
            isAnimate: "",
            save: 0,
            tipShow: false,
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
        this.state.info = res.modal;
        this.setState({ info: this.state.info })
    }
    //拖拽位置传值函数
    addDrapFn(res) {
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

        this.setState({ info: this.state.info, play: this.state.play });
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
        sJson['charts'] = res;
        this.props.save(sJson);
        this.state.save = 0;
        this.setState({ save: this.state.save })
    }
    render() {
        let rightClass = 'artRight rightList_show';
        let flexStyle = {
            width: 80 + "%"
        }
        if (this.state.play.status) {
            flexStyle.width = 100 + "%";
            rightClass = 'artRight rightList_hide';
        } else {
            if (!this.state.isAnimate) {
                flexStyle.width = 80 + "%";
            } else {
                flexStyle.width = 100 + "%";
            }
        }
        return (
            <div className="conTent">
                {/* 提示框 */}
                <TipModal
                    tipShow={this.state.tipShow}
                    charts={this.state.charts}
                    tipRes={this.tipRes.bind(this)} />
                <div className="navGroup">
                    {/* 导航 */}
                    <Navlist
                        modal={this.state.info}
                        play={this.state.play}
                        onPlay={this.playParams.bind(this)}
                        onClick={this.passParms.bind(this)}
                        onSavedata={this.saveFlag.bind(this)}
                    />
                </div>
                <div className='articWrapper'>
                    {/* 模拟容器 */}
                    <Positionnode
                        paramsPosition={this.state.addDrap}
                        style={this.state.chartElement}
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
                            onOk={this.addFinsh.bind(this)}
                            onSavedateres={this.saveData.bind(this)}
                            onChartlength={this.chartListFn.bind(this)}
                            ontipShow={this.tipshow.bind(this)}
                        />
                        {/* 组件网格显示区域 */}
                        <Backlinecover
                            backmodal={this.state.info} />
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
