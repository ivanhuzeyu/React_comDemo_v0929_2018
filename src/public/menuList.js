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
                let drapflag = this.props.drapflag;
                drapflag.clx = events.clientX;
                drapflag.cly = events.clientY;
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

    render() {
        let that = this;
        //设置样式+判定是否为圆形
        function styleFn(agments) {
            let radius = "none";
            let bgimg = "";
            if (that.props.styJson) {
                _.forIn(that.props.styJson, (val, key) => {
                    if (key == agments) {
                        radius = val.style.borderRadius || "none";
                        bgimg = val.menuImg || "";
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
                borderRadius: radius,
                backgroundImage: `url(${bgimg})`,
                backgroundSize: "100% 100%",
            }
            return style;
        }

        //创建图形模型
        return (<div>
            {this.props.keyname.map(vals =>
                <div
                    title={this.props.styJson[vals].params.name}
                    key={vals}
                    style={styleFn(vals)}
                    className={vals}
                    onMouseDown={this.shapeDragst.bind(this)}
                >
                </div>
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
            isanimate: false,
            chartList: [],
        }
    }

    //组件加载完毕后
    componentDidMount() {
        this.state.chartList = this.props.chartList;
        this.setState({
            chartList: this.state.chartList
        });
    }
    //组件加载之前
    componentWillMount() {
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
                this.state.used = used;
                this.state.child = child;
            };
        }

        //接收列表数据渲染DOM
        this.state.capingList = [
            {
                name: "最近常用",
                children: [],
                desingIcon: "desingIcon",
                blockRom: "blockRom"
            },
        ];
        let names = [];
        if (!_.isEmpty(this.state.child)) {
            names = _.map(this.state.child, 'group');
            names = _.uniq(names);
        }
        _.forEach(names, val => {
            let keys = [];
            let objs = {
                name: val,
                children: [],
                desingIcon: "desingIcon",
                blockRom: "blockRom"
            };
            _.forIn(this.state.child, (value, key) => {
                if (value.group == val) {
                    keys.push(key);
                }
            });
            objs.children = keys;
            this.state.capingList.push(objs);
        });
        this.setState({
            used: this.state.used,
            child: this.state.child,
            capingList: this.state.capingList
        })

    }

    //组件接收到props变化但还没有更新时
    shouldComponentUpdate(nextProps, nextState) {
        nextState.chartList = nextProps.chartList;
        nextState.chartList = _.compact(nextState.chartList);
        return true;
    }

    //css3动画
    listShow(parms) {
        let emIcon = parms.target.className;
        let isshow = this.rightList.parentNode.parentNode.className;
        let btnshow = this.listTop.className;
        emIcon === "fa fa-angle-double-right" ? parms.target.className = "desig fa fa-angle-double-right" : parms.target.className = "fa fa-angle-double-right";
        isshow === "artRight rightList_show" ? this.rightList.parentNode.parentNode.className = 'artRight rightList_hide' : this.rightList.parentNode.parentNode.className = 'artRight rightList_show';
        btnshow === "topBtn_show" ? this.listTop.className = "topBtn_hide" : this.listTop.className = "topBtn_show";
        this.state.isanimate = !this.state.isanimate;
        this.setState({ isanimate: this.state.isanimate });
        this.props.onAnimates(this.state.isanimate);
    }
    listConter(events) {
        let nodeEle = events.currentTarget;
        if (nodeEle.innerText == '最近常用') {
            return false;
        }
        let num = nodeEle.attributes['data-num'].value;
        //三角动画
        this.state.capingList[num].desingIcon === 'desingIcon' ? this.state.capingList[num].desingIcon = "desingIcon_animat" : this.state.capingList[num].desingIcon = "desingIcon";
        //图形区动画
        this.state.capingList[num].blockRom === 'blockRom' ? this.state.capingList[num].blockRom = 'blockRom_show' : this.state.capingList[num].blockRom = "blockRom";
        this.setState({
            capingList: this.state.capingList
        });
    }
    //向父级传拖拽
    addDrapFn(res) {
        this.props.onClick({ res });
    }
    //最近常用添加
    usedLock(res) {
        this.state.used = res.used;
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
            if (_.size(sortUsed) > 5) {
                sortUsed = sortUsed.slice(0, 5);
            }
            return _.map(sortUsed, "name");
        }
        this.state.capingList[0].children = usedFn(this.state.used);
        this.setState({
            used: this.state.used,
            capingList: this.state.capingList
        });
    }
    //点击单个选取
    inputCheck(e) {
        //点击选中
        let event = e.currentTarget;
        let _id = event.attributes['data-key'].value;
        _.forEach(this.state.chartList, (val, i) => {
            if (val.key == _id) {
                if (event.checked) {
                    val.editMark = { display: "block" };
                } else {
                    val.editMark = { display: "none" };
                }
                this.state.chartList[i] = val;
            }
        });
        this.setState({
            chartList: this.state.chartList
        });
        this.props.chartListdata(this.state.chartList);
    }
    //点击多选
    allCheck(e) {
        let event = e.currentTarget;
        _.forEach(this.state.chartList, (val, i) => {
            event.checked ? val.editMark = { display: "block" } : val.editMark = { display: 'none' };
            this.state.chartList[i] = val;
        });
        this.setState({
            chartList: this.state.chartList
        });
        this.props.chartListdata(this.state.chartList);
    }
    //点击删除
    deleteFn(e) {
        if (this.state.chartList.length) {
            let num = 0;
            _.forEach(this.state.chartList, val => {
                if (val.editMark.display == 'block') {
                    num++;
                }
            });
            if (num >= 2) {
                this.props.ontipShow(true);
            } else {
                _.remove(this.state.chartList, val => {
                    return val.editMark.display == 'block';
                });
                this.setState({
                    chartList: this.state.chartList
                });
            }
            this.props.chartListdata(this.state.chartList);
        }
    }
    //点击复制
    copyFn(e) {
        if (this.state.chartList.length) {
            let newChartList = new Array();
            _.forEach(this.state.chartList, (val, i) => {
                if (val.editMark.display == 'block') {
                    let item = Object.assign({}, val);
                    item.key = item.key.split('_')[0] + "_" + _.now() + _.random(0.1, 9999.99);
                    item.style = {
                        top: Number(item.style.top.split('px')[0]) + Number(item.style.width.split('px')[0]) + "px",
                        left: item.style.left,
                        width: item.style.width,
                        height: item.style.height,
                        margin: item.style.margin,
                        overflow: item.style.overflow,
                        zIndex: item.style.zIndex,
                        border: "4px dashed transparent",
                        borderRadius: item.style.borderRadius
                    }
                    newChartList.push(
                        val,
                        item
                    );
                } else {
                    newChartList.push(val);
                }
            });
            this.state.chartList = newChartList;
            this.setState({
                chartList: this.state.chartList
            });
        }
        this.props.chartListdata(this.state.chartList);
    }
    //层级变化
    changeIndex(e) {
        //获取点击的容器
        let num = e.currentTarget.attributes['data-num'].value;
        let key = e.currentTarget.attributes['data-key'].value;
        let type = e.currentTarget.attributes['data-type'].value;
        //存储各个容器位置信息数组
        let coners = [];
        //判断有重叠的容器数组,初始数值为点击的容器
        let valArr = [this.state.chartList[num]];
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
            positionFn(this.state.chartList[num])
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
        _.forEach(this.state.chartList, (val, i) => {
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
            if (val.key == this.state.chartList[num].key) {
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
            _.forEach(this.state.chartList, (cal, i) => {
                if (val.key == cal.key) {
                    this.state.chartList[i] = val;
                }
            });
        });
        //
        this.state.chartList = _.sortBy(this.state.chartList, val => {
            return -val.style.zIndex;
        });
        this.setState({
            chartList: this.state.chartList
        });
        this.props.chartListdata(this.state.chartList);
    }
    render() {
        //运行状态调整位置
        let iconClass = 'fa fa-angle-double-right';
        let listClass = 'topBtn_show'
        if (this.props.endPlay) {
            iconClass = "desig fa fa-angle-double-right";
            listClass = "topBtn_hide";
            // this.state.isanimate = !this.state.onAnimates;
        }
        //拖拽值
        let dragParams = this.props.dragParams;

        //最近常用默认显示
        let desingIcon = (vals) => {
            let className = vals.desingIcon;
            if (vals.name == '最近常用') {
                className = 'desingIcon_animat';
            }
            return className;
        };
        let blockRom = (vals) => {
            let className = vals.blockRom;
            if (vals.name == '最近常用') {
                className = 'blockRom_show';
            }
            return className;
        };
        //渲染列表
        const dvRong = (
            <div className="swipRom">
                {this.state.capingList.map((vals, s) =>
                    <div className='listBlock' key={vals.name}>
                        <div className='listTip'
                            data-num={s}
                            onClick={this.listConter.bind(this)} >
                            <span className={desingIcon(vals)}></span>
                            {vals.name}
                        </div>
                        <div className={blockRom(vals)}>
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
        //列表渲染
        let listElement = "";
        let listMaps = [];
        let allLength = 0;
        if (this.state.chartList.length) {
            _.forEach(this.state.chartList, (val, i) => {
                let item = {};
                if (val) {
                    if (val.editMark.display == "block") {
                        item['check'] = true;
                        item['style'] = { color: 'rgb(31, 87, 88)' }
                        allLength++;
                    } else {
                        item['check'] = false;
                        item['style'] = { color: 'cadetblue' }
                    }
                    item['_id'] = val.key;
                    item['name'] = val.editPass.name || '暂无名称';

                    listMaps.push(item);
                }
            });
        };
        //元素及绑定事件
        listElement = listMaps.map((val, i) =>
            <li key={i} style={val.style}>
                <input
                    type="checkBox"
                    checked={val.check}
                    data-key={val._id}
                    onChange={this.inputCheck.bind(this)}
                />
                <em>{val.name}</em>
                <b data-type="up" data-key={val._id} data-num={i} onClick={this.changeIndex.bind(this)} className="fa fa-arrow-up upLeave" title="层级上移"></b>
                <b data-type="down" data-key={val._id} data-num={i} onClick={this.changeIndex.bind(this)} className="fa fa-arrow-down downLeave" title="层级上移"></b>
            </li>
        );

        //多选状态控制
        let allChecks = false;
        if (allLength && allLength == listMaps.length) {
            allChecks = true;
        } else {
            allChecks = false;
        }

        return (

            <div id='rightList'>
                <div className={listClass} id='listTop' ref={ref => this.listTop = ref}>
                    <div id="topBtn" onClick={this.listShow.bind(this)}>
                        <em ref={ref => this.icon = ref} className={iconClass}></em>
                    </div>
                    仪表库
                </div>
                <div id='listIcon' ref={ref => this.rightList = ref}>
                    {dvRong}
                </div>
                <div id="elementList">
                    <div className="listTool">
                        <p>
                            <i>全选:</i>
                            <input
                                type="checkbox"
                                checked={allChecks}
                                onChange={this.allCheck.bind(this)}
                            />
                        </p>
                        |
                        {/* <em
                            className="fa fa-clone"
                            onClick={this.copyFn.bind(this)}
                            title="复制">
                        </em> */}
                        <em
                            className="fa fa-trash-o"
                            onClick={this.deleteFn.bind(this)}
                            title="删除">
                        </em>
                    </div>
                    <div className='eleSwiper'>
                        <div className="eleScroll">
                            <ul>
                                {listElement}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}