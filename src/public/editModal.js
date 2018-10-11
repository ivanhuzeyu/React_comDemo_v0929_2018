import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//属性编辑框
export default class Editmodal extends React.Component {
    constructor() {
        super();
        this.state = {
            passParams: {},
            turnback: ""
        }
    };

    //state + 回传
    setParamsres(stval) {
        this.setState({ passParams: stval });
        let onEditres = this.state.passParams;
        //const { oneditres } = this.props;
        this.props.oneditres(onEditres);
    }

    //改变名字
    nameChange(event) {
        event = event.currentTarget;
        this.state.passParams.name = event.value;
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

    //自定义回传值 
    turnback(res) {
        this.state.passParams.editurn = res;
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
            _id: this.props.vals.key || "",
            editurn: params.editurn
        };
        if (this.state.passParams != passParams) {
            this.state.passParams = passParams;
            _.forEach(this.state.passParams.line, val => {
                this.state.lis.push(false);
            });
        };
        let turnback;
        if (params.editPanel) {
            this.state.turnback = params.editPanel;
        }
        turnback = this.state.turnback;
        //相界面渲染值
        let statepassParams = this.state.passParams;
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
                {turnback(this.turnback.bind(this))}
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
                {turnback(this.turnback.bind(this))}
            </div >
        );

        let radius = 50 + "%";
        if (this.props.vals.style.borderRadius) {
            radius = this.props.vals.style.borderRadius.split("%")[0];
        }

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


















