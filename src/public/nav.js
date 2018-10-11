import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//导航
export default class Navlist extends React.Component {
    constructor() {
        super();
        this.state = {
            playstyle: {
                display: "block"
            }
        }
    }
    showLine(prams) {
        let modal = this.props.modal;
        if (this.props.onClick && this.props.modal) {
            modal === "block" ? modal = "none" : modal = "block";
            this.props.onClick({ modal });
        }
    }

    //点击运行按钮
    play(event) {
        event = event.currentTarget;
        if (!this.props.play.status) {
            this.props.play.status = 1;
            this.props.play.playshow = "none";
            let plays = this.props.play;
            this.props.onPlay({ plays });
            //按钮变更
            event.className = "monitorModal fa fa-edit";
        } else {
            this.props.play.status = 0;
            this.props.play.playshow = "block";
            let plays = this.props.play;
            this.props.onPlay({ plays });
            event.className = "monitorModal fa fa-toggle-right";
        }
        this.state.playstyle = { display: this.props.play.playshow };
        this.setState({ playstyle: this.state.playstyle });
    }

    //生成导航条
    render() {
        return (
            <div>
                <div className='navText'>监控面板</div>
                <div className='monitorModal fa fa-toggle-right' onClick={this.play.bind(this)}></div>
                <div style={this.state.playstyle} className='editModal fa fa-th' onClick={this.showLine.bind(this)}></div>
            </div>
        );
    }
};