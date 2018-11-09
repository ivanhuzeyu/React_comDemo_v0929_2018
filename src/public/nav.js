import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//导航
export default class Navlist extends React.Component {

    constructor() {
        super();
        this.state = {
            playstyle: {
                display: "block",
            },
        }
    }
    //网格线尺寸变换
    showLine(prams) {
        let size = 8;
        this.props.diamond == 8 ? size = 40 : size = 8;

        this.props.onClick(size);
    }

    //点击运行按钮
    play(event) {
        event = event.currentTarget;
        if (!this.props.play.status) {
            this.props.play.status = 1;
            this.props.play.playshow = "none";
            let plays = this.props.play;
            this.props.onPlay({ plays });
        } else {
            this.props.play.status = 0;
            this.props.play.playshow = "block";
            let plays = this.props.play;
            this.props.onPlay({ plays });
        }
        this.state.playstyle = { display: this.props.play.playshow };
        this.setState({ playstyle: this.state.playstyle });
    }

    //网格线颜色变换
    skinLine(e) {
        let color = e.currentTarget.value;
        this.props.onLineColor(color);
    }

    //背景颜色变换
    bgLine(e) {
        let color = e.currentTarget.value;
        this.props.onBgColor(color);
    }
    //点击保存数据按钮
    isSave(e) {
        this.props.onSavedata(true);
    }

    //水平对齐
    horizontal(e) {
        let key = e.currentTarget.attributes['data-key'].value;
        this.props.horizontal(key);
    }


    //生成导航条
    render() {

        let btnClass = 'fa fa-toggle-right';
        if (this.props.play.status) {
            btnClass = 'fa fa-edit';
        } else {
            btnClass = 'fa fa-toggle-right';
        }
        let thLogo = 'fa fa-th-large';
        if (this.props.diamond == 8) {
            thLogo = 'fa fa-th';
        } else if (this.props.diamond == 40) {
            thLogo = 'fa fa-th-large';
        }
        //获取颜色
        let colorObj = {
            lineColor: '',
            bgColor: ''
        };
        this.props.lineColor ? colorObj.lineColor = this.props.lineColor : colorObj.lineColor = '#ccc';
        this.props.bgColor ? colorObj.bgColor = this.props.bgColor : colorObj.bgColor = '#fff';

        return (
            <div>
                <div className='navText'>监控面板</div>
                <div className="monitorModal">
                    <em
                        className={btnClass}
                        onClick={this.play.bind(this)}
                        title="运行模式"
                    ></em>
                </div>
                <div className="saveBtn" style={{ display: this.props.play.playshow }}>
                    <em
                        className="fa fa-save"
                        title="保存当前界面设置"
                        onClick={this.isSave.bind(this)}
                    ></em>
                </div>
                <div className="editLine" style={{ display: this.props.play.playshow }} >
                    <i
                        className={thLogo}
                        onClick={this.showLine.bind(this)}
                        title="网格尺寸切换"
                    ></i>
                </div>
                <div className='alginCenter' style={{ display: this.props.play.playshow }} >
                    <em
                        className="fa fa-ellipsis-h"
                        title="水平对齐"
                        data-key='h'
                        onClick={this.horizontal.bind(this)}
                    ></em>
                </div>
                <div className='alginCenter' style={{ display: this.props.play.playshow }} >
                    <em
                        className="fa fa-ellipsis-v"
                        title="垂直对齐"
                        data-key='v'
                        onClick={this.horizontal.bind(this)}
                    ></em>
                </div>
                <div className='alginCenter' style={{ display: this.props.play.playshow }} >
                    <em
                        className="fa fa-square-o"
                        title="大小相等"
                        data-key='o'
                        onClick={this.horizontal.bind(this)}
                    ></em>
                </div>
                <div className="skin" style={{ display: this.props.play.playshow }}>
                    <p>
                        网格线颜色
                    </p>
                    <label htmlFor="lineSkin">
                        <b
                            className="clickColor"
                            style={{ background: colorObj.lineColor }}
                        ></b>
                    </label>
                    <input
                        type="color"
                        id="lineSkin"
                        onChange={this.skinLine.bind(this)}
                        defaultValue={colorObj.lineColor}
                    />
                </div>
                <div className="skin" style={{ display: this.props.play.playshow }}>
                    <p>
                        背景颜色
                    </p>
                    <label htmlFor="bgSkin">
                        <b
                            className="clickColor"
                            style={{ background: colorObj.bgColor }}
                        ></b>
                    </label>
                    <input
                        type="color"
                        id="bgSkin"
                        onChange={this.bgLine.bind(this)}
                        defaultValue={colorObj.bgColor}
                    />
                </div>
            </div>

        );
    }
};