import React from 'react';

import ReactDOM from 'react-dom';

import _ from "lodash";

//导航
export default class tipModal extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            charts: []
        }
    }
    //更新后判定调用
    shouldComponentUpdate(nextProps, nextState) {
        nextState.show = nextProps.tipShow;
        nextState.charts = nextProps.charts;
        return true;
    }


    close(e) {
        this.state.show = false;
        this.setState({
            show: this.state.show
        });
        let item = {
            show: this.state.show,
            charts: this.state.charts
        };
        this.props.tipRes(item);
    }

    remove() {

        _.remove(this.state.charts, val => {
            return val.editMark.display == 'block';
        });
        this.state.show = false;
        this.setState({
            show: this.state.show,
            charts: this.state.charts
        })

        let item = {
            show: this.state.show,
            charts: this.state.charts
        };
        this.props.tipRes(item);
    }
    render() {
        //判定是否显示
        let SHOWSTYLE = {
            display: this.state.show ? 'block' : 'none'
        };

        return (
            <div
                id="tipWrapper"
                style={SHOWSTYLE}
            >
                <div className="backgroundDv"></div>
                <div className="tipContainer">
                    <div className="tipheader">
                        <h2>
                            <em>系统提示</em>
                            <i
                                className="fa fa-remove"
                                onClick={this.close.bind(this)}>
                            </i>
                        </h2>
                    </div>
                    <div className="tipMidle">
                        <p>
                            此次操作您将删除多个模块，是否继续删除？
                        </p>
                    </div>
                    <div className="tipFoot">
                        <span
                            className="cancel"
                            onClick={this.close.bind(this)}
                        >取消</span>
                        <span onClick={this.remove.bind(this)} className="sure">删除</span>
                    </div>
                </div>
            </div>
        );
    }
}