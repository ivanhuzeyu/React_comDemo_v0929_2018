import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//属性编辑框
export default class Editmodal extends React.Component {
    constructor() {
        super();
        this.state = {
            passParams: {},
            lis: [],
            colorCss: [
                "#000",
                "cadetblue",
                "red",
                "purple",
                "pink",
                "#ccc",
                "blue",
                "#eee"
            ]
        }
    };

    //state + 回传
    setParamsres(stval) {
        this.setState({ passParams: stval });
        let onEditres = this.state.passParams;
        const { oneditres } = this.props;
        oneditres(onEditres);
    }

    //更换主题样式事件
    changeCss(event) {
        let val = event.currentTarget.attributes['data-title'].value;
        this.state.passParams.css = Number(val);
        this.setParamsres(this.state.passParams);
    }
    //小刻度按钮控制
    stepFn(event) {
        this.state.passParams.scale ? this.state.passParams.scale = false : this.state.passParams.scale = true;
        this.setParamsres(this.state.passParams);
    }
    //添加变量线
    addLine(event) {
        if (this.state.passParams.line.length < 8) {
            this.state.passParams.line.push(
                {
                    vname: "",
                    vcolor: "#000",
                    vscale: 0,
                    voffset: 0
                }
            );
            this.state.lis.push(false);
            this.setParamsres(this.state.passParams);
        } else {
            return false;
        }
    }
    //删除变量线
    delLine(event) {
        if (this.state.passParams.line.length > 0) {
            this.state.passParams.line.pop();
            this.state.lis.pop();
            this.setParamsres(this.state.passParams);
        } else {
            return false;
        }
    }
    //选取变量的颜色列表显示
    choseColor(event) {
        event = event.currentTarget;
        //index值
        let num = event.attributes['data-num'].value;
        _.forEach(this.state.lis, (val, i) => {
            if (i != num) {
                this.state.lis[i] = false;
            }
        })
        this.state.lis[num] ? this.state.lis[num] = false : this.state.lis[num] = true;
        this.setState({ lis: this.state.lis });
    }
    //选择变量颜色
    choseRen(event) {
        //index值
        let num = event.currentTarget.attributes['data-color'].value;
        this.state.passParams.line[num[0]].vcolor = this.state.colorCss[num[2]];
        this.setParamsres(this.state.passParams);
    }
    //改变名字
    nameChange(event) {
        event = event.currentTarget;
        this.state.passParams.name = event.value;
        this.setParamsres(this.state.passParams);
    }
    //改变标题
    titleChange(event) {
        event = event.currentTarget;
        this.state.passParams.title = event.value;
        this.setParamsres(this.state.passParams);
    }
    //改变宽度
    widthChange(event) {
        event = event.currentTarget;
        this.state.passParams.size[0] = event.value;
        this.setState({ passParams: this.state.passParams });
        event.onblur = () => {
            if (event.value % 8 > 4) {
                event.value = event.value - event.value % 8 + 8;
            } else if (event.value % 8 <= 4 && event.value % 8 > 0) {
                event.value = event.value - event.value % 8;
            };
            if (event.value < 80) {
                event.value = 80
            };
            this.state.passParams.size[0] = event.value;
            this.setParamsres(this.state.passParams);
        }
    }
    //改变高度
    heightChange(event) {
        event = event.currentTarget;
        this.state.passParams.size[1] = event.value;
        this.setState({ passParams: this.state.passParams });
        event.onblur = () => {
            if (event.value % 8 > 4) {
                event.value = event.value - event.value % 8 + 8;
            } else if (event.value % 8 <= 4 && event.value % 8 > 0) {
                event.value = event.value - event.value % 8;
            };
            if (event.value < 80) {
                event.value = 80
            };
            this.state.passParams.size[1] = event.value;
            this.setParamsres(this.state.passParams);
        }
    }
    //改变x轴
    xChange(event) {
        event = event.currentTarget;
        this.state.passParams.x = event.value;
        this.setParamsres(this.state.passParams);
    }
    //改变线名称
    vnameChange(event) {
        event = event.currentTarget;
        let num = event.attributes['data-num'].value;
        this.state.passParams.line[num].vname = event.value;
        this.setParamsres(this.state.passParams);
    }
    //改变线缩放
    vscaleChange(event) {
        event = event.currentTarget;
        let num = event.attributes['data-num'].value;
        this.state.passParams.line[num].vscale = event.value;
        this.setParamsres(this.state.passParams);
    }
    //改变线偏移
    voffsetChange(event) {
        event = event.currentTarget;
        let num = event.attributes['data-num'].value;
        this.state.passParams.line[num].voffset = event.value;
        this.setParamsres(this.state.passParams);
    }
    //表盘变量名更改
    variablesChange(event) {
        event = event.currentTarget;
        this.state.passParams.variables = event.value;
        this.setParamsres(this.state.passParams);
    }
    //表盘最小值更改
    minChange(event) {
        event = event.currentTarget;
        this.state.passParams.range[0] = event.value;
        this.setParamsres(this.state.passParams);
    }
    //表盘最大值更改
    maxChange(event) {
        event = event.currentTarget;
        this.state.passParams.range[1] = event.value;
        this.setParamsres(this.state.passParams);
    }
    //系数更改
    kChange(event) {
        event = event.currentTarget;
        this.state.passParams.keys[0] = event.value;
        this.setParamsres(this.state.passParams);
    }
    //偏移更改
    bChange(event) {
        event = event.currentTarget;
        this.state.passParams.keys[1] = event.value;
        this.setParamsres(this.state.passParams);
    }

    render() {

        //宽高属性
        let styParams = this.props.vals.style;
        //参数传值
        let params = this.props.vals.editPass;
        //值给到state
        let passParams = {
            name: params.name,
            size: params.size || [0, 0],
            title: params.title,
            css: params.css,
            x: Number(params.x) || "",
            line: params.line || [],
            variables: params.variables || "",
            range: params.range || [0, 0],
            keys: params.keys || [0, 0],
            scale: params.scale || false,
            _id: this.props.vals.key || ""
        };
        if (this.state.passParams != passParams) {
            this.state.passParams = passParams;
            _.forEach(this.state.passParams.line, val => {
                this.state.lis.push(false);
            });
        };

        //相界面渲染值
        let statepassParams = this.state.passParams;
        //样式类型选择值
        let cssText = [1, 2, 3];
        //样式类型控制函数
        let cssFn = (agment) => {
            if (agment == statepassParams.css) {
                return {
                    background: "cadetblue",
                    color: "#fff"
                }
            }
        }

        //刻度动画1背景板
        let stepCss = (val) => {
            if (val) {
                return {
                    color: "#fff",
                    background: "cadetblue"
                }
            } else {
                return {
                    color: "#000",
                    background: "#fff"
                }
            }
        }

        //刻度动画2按钮
        let stepitemCss = (val) => {
            if (val) {
                return {
                    transform: "translate(26px)"
                }
            } else {
                return {
                    transform: "translate(0)"
                }
            }
        }

        //八条颜色
        let colorCss = this.state.colorCss;

        let colorChoseFn = (j) => {
            if (this.state.lis[j]) {
                return { display: "block" }
            }
        }


        let squre = (
            <div className='squreEdit'>
                <div className='name'>
                    <label>名称:</label>
                    <input type="text"
                        defaultValue={statepassParams.name}
                        onChange={this.nameChange.bind(this)}
                    />
                </div>
                <div className='size'>
                    <label>尺寸:</label>
                    <input type="number"
                        placeholder="宽度"
                        value={statepassParams.size[0]}
                        onChange={this.widthChange.bind(this)} />
                    <input type="number"
                        placeholder="高度"
                        value={statepassParams.size[1]}
                        onChange={this.heightChange.bind(this)}
                    />
                </div>
                <div className='title'>
                    <label>标题:</label>
                    <input type="text"
                        defaultValue={statepassParams.title}
                        onChange={this.titleChange.bind(this)}
                    />
                </div>
                <div className='cssstyle'>
                    <label>样式:</label>
                    {cssText.map((val, i) =>
                        <span
                            key={i}
                            data-title={val}
                            style={cssFn(val)}
                            onClick={this.changeCss.bind(this)}
                        >
                            样式{val}
                        </span>
                    )}
                </div>
                <div className='xset'>
                    <label>X轴范围:</label>
                    <input type='number'
                        defaultValue={statepassParams.x}
                        onChange={this.xChange.bind(this)}
                    />
                </div>
                <div className='table'>
                    <div className='tableTop'>
                        <span>变量</span>
                        <span>颜色</span>
                        <span>缩放</span>
                        <span>偏移</span>
                    </div>
                    {statepassParams.line.map((val, i) =>
                        <div className='lineSet' key={i}>
                            <span>
                                <input type="text"
                                    data-num={i}
                                    defaultValue={val.vname}
                                    onChange={this.vnameChange.bind(this)}
                                />
                            </span>
                            <span className="colorSet">
                                <ul
                                    data-num={i}
                                    onClick={this.choseColor.bind(this)}
                                >
                                    <div
                                        className='colorAgs'
                                    >
                                        <em style={{ background: val.vcolor }}></em>
                                        <i className="fa fa-chevron-down"></i>
                                    </div>
                                    {colorCss.map((jal, j) =>
                                        <li
                                            key={j}
                                            style={colorChoseFn(i)}
                                            data-color={[i, j]}
                                            onClick={this.choseRen.bind(this)}
                                        >
                                            <em style={{ background: jal }}>
                                            </em>
                                        </li>
                                    )}
                                </ul>
                            </span>
                            <span>
                                <input type="number"
                                    defaultValue={val.vscale}
                                    data-num={i}
                                    onChange={this.vscaleChange.bind(this)}
                                />
                            </span>
                            <span>
                                <input type="number"
                                    defaultValue={val.voffset}
                                    data-num={i}
                                    onChange={this.voffsetChange.bind(this)}
                                />
                            </span>
                        </div>
                    )}
                </div>
                <div className='squreBtn'>
                    <button className='removeLine' onClick={this.delLine.bind(this)}>删除</button>
                    <button className='addLine' onClick={this.addLine.bind(this)}>添加</button>
                </div>
            </div>
        );
        let round = (
            < div className='roundEdit' >
                <div className='name'>
                    <label>名称:</label>
                    <input type="text"
                        defaultValue={statepassParams.name}
                        onChange={this.nameChange.bind(this)}
                    />
                </div>
                <div className='size'>
                    <label>尺寸:</label>
                    <input type="number"
                        placeholder="宽度"
                        value={statepassParams.size[0]}
                        onChange={this.widthChange.bind(this)}
                    />
                    <input type="number"
                        placeholder="高度"
                        value={statepassParams.size[1]}
                        onChange={this.heightChange.bind(this)}
                    />
                </div>
                <div className='title'>
                    <label>变量:</label>
                    <input type="text"
                        defaultValue={statepassParams.variables}
                        onChange={this.variablesChange.bind(this)}
                    />
                </div>
                <div className='setMl'>
                    <label>范围:</label>
                    <input type="number"
                        placeholder="最小值"
                        defaultValue={statepassParams.range[0]}
                        onChange={this.minChange.bind(this)}
                    />
                    <input type="number"
                        placeholder="最大值"
                        defaultValue={statepassParams.range[1]}
                        onChange={this.maxChange.bind(this)}
                    />
                </div>
                <div className='litStep'>
                    <label>小刻度:</label>
                    <div
                        className='stepWrapper'
                        onClick={this.stepFn.bind(this)}
                        style={stepCss(statepassParams.scale)}
                    >
                        <b>开</b>
                        <b>关</b>
                        <em style={stepitemCss(statepassParams.scale)}></em>
                    </div>
                </div>
                <div className='title'>
                    <label>标签:</label>
                    <input type="text"
                        defaultValue={statepassParams.title}
                        onChange={this.titleChange.bind(this)}
                    />
                </div>
                <div className='cssstyle'>
                    <label>样式:</label>
                    {cssText.map((val, i) =>
                        <span
                            key={i}
                            data-title={val}
                            style={cssFn(val)}
                            onClick={this.changeCss.bind(this)}
                        >
                            样式{val}
                        </span>
                    )}
                </div>
                <div className='lineKeys'>
                    <label>线性变化:</label>
                    <input type="number"
                        placeholder="系数K"
                        defaultValue={statepassParams.keys[0]}
                        onChange={this.kChange.bind(this)}
                    />
                    <input type="number"
                        placeholder="偏移b"
                        defaultValue={statepassParams.keys[1]}
                        onChange={this.bChange.bind(this)}
                    />
                </div>
            </div >
        );

        const radius = this.props.vals.style.borderRadius.split("%")[0];
        let showArea = "error";
        if (radius === "none") {
            showArea = squre;
        } else {
            showArea = round;
        }
        return (
            <div className='editWrapper' >
                {showArea}
            </div>
        )
    }
}


















