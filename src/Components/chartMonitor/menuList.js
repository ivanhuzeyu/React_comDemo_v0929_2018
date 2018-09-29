import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//内容图形+拖拽添加事件
class Blockshape extends React.Component {

    //拖拽添加事件
    shapeDragst(events) {
        if (events.target.title) {
            if (this.props.onClick && this.props.drapflag) {
                this.props.drapflag.flag = 1;
                this.props.drapflag.shape = events.target.className;
                this.props.drapflag.isadd = 0;
            }

            let body = document.getElementsByClassName('articWrapper')[0];
            body.onmousemove = (event) => {
                if (this.props.onClick && this.props.drapflag && this.props.drapflag.flag) {
                    let drapflag = this.props.drapflag;
                    drapflag.clx = event.clientX;
                    drapflag.cly = event.clientY;
                    this.props.onClick({ drapflag });
                }
            }
            body.onmouseup = (e) => {
                let drapflag = this.props.drapflag;
                drapflag.clx = e.clientX;
                drapflag.cly = e.clientY;
                if (drapflag.flag) {
                    this.props.drapflag.flag = 0;
                    this.props.drapflag.isadd = 1;
                    let used = this.props.used;
                    _.forEach(used, (val, i) => {
                        if (val.name === drapflag.shape) {
                            val.num++;
                            used[i] = val;
                        }
                    });
                    this.props.onused({ used });
                    this.props.onClick({ drapflag });
                }
            }
        }
    }
    render() {
        let that = this;
        //设置样式+判定是否为圆形
        function styleFn(agments) {
            let radius = "none";
            if (that.props.styJson) {
                _.forIn(that.props.styJson, (val, key) => {
                    if (key == agments) {
                        radius = val.style.borderRadius || "none";
                    }
                });
            }
            let style = {
                height: 60 + "px",
                width: 60 + "px",
                border: "1px solid cadetblue",
                marginTop: 10 + "px",
                marginLeft: 10 + "px",
                marginBottom: 5 + "px",
                float: "left",
                borderRadius: radius
            }
            return style;
        }
        //创建图形模型
        return (<div>
            {this.props.keyname.map(vals =>
                <div
                    title="shapeFlag"
                    key={vals}
                    style={styleFn(vals)}
                    className={vals}
                    onMouseDown={this.shapeDragst.bind(this)}
                ></div>
            )}
        </div>);
    }
}

//右侧列表
export default class Indexlist extends React.Component {
    //..
    constructor() {
        super();
        this.state = {
            capingList: [],
            child: [],
            used: [],
        }
    }
    //css3动画
    listShow(parms) {
        let emIcon = parms.target.className;
        let isshow = this.refs.rightList.parentNode.parentNode.className;
        let btnshow = this.refs.listTop.className;
        emIcon === "fa fa-angle-double-right" ? parms.target.className = "desig fa fa-angle-double-right" : parms.target.className = "fa fa-angle-double-right";
        isshow === "artRight rightList_show" ? this.refs.rightList.parentNode.parentNode.className = 'artRight rightList_hide' : this.refs.rightList.parentNode.parentNode.className = 'artRight rightList_show';
        btnshow === "topBtn_show" ? this.refs.listTop.className = "topBtn_hide" : this.refs.listTop.className = "topBtn_show";
    }

    listConter(events) {
        let nodeEle = events.target;

        //阻止冒泡
        if (nodeEle.nodeName == 'SPAN') {
            nodeEle = events.target.parentNode;
        }

        //三角动画
        let sanjiao = nodeEle.lastElementChild.className;
        sanjiao === 'desingIcon' ? nodeEle.lastElementChild.className = "desingIcon_animat" : nodeEle.lastElementChild.className = "desingIcon";

        //图形区动画
        let blockConani = nodeEle.nextElementSibling.className;
        blockConani === 'blockRom' ? nodeEle.nextElementSibling.className = 'blockRom_show' : nodeEle.nextElementSibling.className = "blockRom";
    }

    //向父级传拖拽
    addDrapFn(res) {
        this.props.onClick({ res });
    }

    //最近常用添加
    usedLock(res) {
        this.state.used = res.used;
        this.setState({ used: this.state.used });
    }


    render() {

        //设置列表内图表缩略的样式以及常用统计初始值
        if (this.props.chartElement.length != 0) {
            let child = this.props.chartElement;
            if (this.state.child.length == 0) {
                this.state.child = child;
                let used = [];
                _.forEach(_.keys(this.state.child), val => {
                    let temp = {};
                    temp["num"] = 0;
                    temp['name'] = val;
                    used.push(temp);
                })
                this.setState({ used: used });
                this.setState({ child: child });
            };
        }

        //拖拽值
        let dragParams = this.props.dragParams;

        //使用次数靠前排序计算
        let usedFn = (params) => {
            let sortUsed = [];
            _.forEach(params, val => {
                if (val.num) {
                    sortUsed.push(val);
                }
            });
            sortUsed = _.sortBy(sortUsed, o => {
                return -o.num;
            });
            return _.map(sortUsed, "name");
        }

        //接收列表数据渲染DOM
        let capingList = [
            {
                "name": "最近常用",
                "children": usedFn(this.state.used),
            },
            {
                "name": "基本形状",
                "children": _.keys(this.state.child),
            }
        ];
        const dvRong = (
            <div className="swipRom">
                {capingList.map(vals =>
                    <div className='listBlock' key={vals.name}>
                        <div className='listTip'
                            onClick={this.listConter.bind(this)} >
                            <span className="desingIcon"></span>
                            {vals.name}
                        </div>
                        <div className='blockRom'>
                            <Blockshape
                                onused={this.usedLock.bind(this)}
                                styJson={this.state.child}
                                used={this.state.used}
                                onClick={this.addDrapFn.bind(this)}
                                drapflag={dragParams}
                                keyname={vals.children}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
        return (
            <div id='rightList'>
                <div className='topBtn_show' id='listTop' ref="listTop">
                    <div id="topBtn" onClick={this.listShow.bind(this)}><em className="fa fa-angle-double-right"></em></div>
                    仪表库
                </div>
                <div id='listIcon' ref='rightList'>
                    {dvRong}
                </div>
            </div>
        );
    }
}