import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import InsertWrapper from './comshowArea';
import Backlinecover from './backLine';
import Positionnode from './falseCom';
import Indexlist from './menuList';
import Navlist from './nav';
import './chartMonitor.css';


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
            chartElement: [],
            isAnimate: "",
        }
    }

    //接收传值开始调用
    componentDidMount() {
        this.setState({ chartElement: obj });
        this.props.save(obj);
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
        if (this.state.play) {
            this.setState({ isAnimate: true });
        }
        this.setState({ info: this.state.info, play: this.state.play });
    }
    //动画运行回传状态
    isAnimates(res) {
        this.state.isAnimate = res;
        this.setState({ isAnimate: this.state.isAnimate })
    }
    render() {
        let flexStyle = {
            width: 80 + "%"
        }
        if (this.state.isAnimate) {
            flexStyle.width = 100 + "%";
        } else {
            flexStyle.width = 80 + "%";
        }
        return (
            <div className="conTent">
                <div className="navGroup">
                    {/* 导航 */}
                    <Navlist
                        modal={this.state.info}
                        play={this.state.play}
                        onPlay={this.playParams.bind(this)}
                        onClick={this.passParms.bind(this)} />
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
                            onOk={this.addFinsh.bind(this)}
                            chartElement={this.state.chartElement}
                        />
                        {/* 组件网格显示区域 */}
                        <Backlinecover
                            backmodal={this.state.info} />
                    </div>
                    <div
                        className='artRight rightList_show'
                        style={{ display: this.state.play.playshow }}>
                        {/* 右侧列表组 */}
                        <Indexlist
                            chartElement={this.state.chartElement}
                            dragParams={this.state.addDrap}
                            onClick={this.addDrapFn.bind(this)}
                            onAnimates={this.isAnimates.bind(this)}
                            endPlay={this.state.play.status}
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
