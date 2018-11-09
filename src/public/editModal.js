import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";

//属性编辑框
export default class Editmodal extends React.Component {
    constructor() {
        super();
        this.state = {
            passParams: "",
            turnback: "",
            width: 0,
            height: 0
        }
    };

    //初始加载
    componentWillMount() {
        this.state.width = this.props.vals.editPass.size[0];
        this.state.height = this.props.vals.editPass.size[1];
        this.setState({
            width: this.state.width,
            height: this.state.height
        });
    }

    //state + 回传
    setParamsres(stval) {
        this.setState({ passParams: stval });
        let onEditres = this.state.passParams;
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
            event.value = Math.ceil(event.value);
            if (event.value < 16) {
                event.value = 16
            };
            if (this.props.vals.proportional) {
                //计算缩放比例，*不能直接加增量
                let height = this.state.width;
                height = (event.value - this.state.width) / this.state.width;
                this.state.height = Number(this.state.height) + Number(this.state.height) * Number(height);
                this.state.height = Math.ceil(this.state.height);
                this.state.passParams.size[1] = this.state.height;
            }
            this.state.passParams.size[0] = event.value;
            this.state.width = event.value;
            this.setState({
                width: this.state.width,
                height: this.state.height
            });
            this.setParamsres(this.state.passParams);
        }
    }
    //改变高度
    heightChange(event) {
        event = event.currentTarget;
        this.state.passParams.size[1] = event.value;
        this.setState({ passParams: this.state.passParams });
        event.onblur = () => {
            event.value = Math.ceil(event.value);
            if (event.value < 16) {
                event.value = 16
            };
            if (this.props.vals.proportional) {
                let width = this.state.height;
                width = (event.value - this.state.height) / this.state.height;
                this.state.width = Number(this.state.width) + Number(this.state.width) * Number(width);
                this.state.width = Math.ceil(this.state.width);
                this.state.passParams.size[0] = this.state.width;
            }
            this.state.passParams.size[1] = event.value;
            this.state.height = event.value;
            this.setState({
                width: this.state.width,
                height: this.state.height
            });
            this.setParamsres(this.state.passParams);
        }
    }

    //改变背景颜色
    bgColor(e) {
        let event = e.currentTarget;
        this.state.passParams.background = event.value;
        this.setParamsres(this.state.passParams);
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
            background: styParams.background,
            editurn: params.editurn,
            editPanel: params.editPanel
        };
        this.state.passParams = passParams;
        let turnback;
        if (params.editPanel) {
            this.state.turnback = params.editPanel;
        }
        turnback = this.state.turnback;
        //相界面渲染值
        let statepassParams = this.state.passParams;
        //方形
        let squre = (
            <div className='squreEdit'>
                <div className='name'>
                    <label>名称:</label>
                    <input type="text"
                        defaultValue={passParams.name}
                        onChange={this.nameChange.bind(this)}
                    />
                </div>
                <div className='size'>
                    <label>尺寸:</label>
                    <input type="number"
                        placeholder="宽度"
                        value={passParams.size[0]}
                        onChange={this.widthChange.bind(this)} />
                    <input type="number"
                        placeholder="高度"
                        value={passParams.size[1]}
                        onChange={this.heightChange.bind(this)}
                    />
                </div>
                <div className='color'>
                    <label>背景颜色:</label>
                    <input type="color"
                        defaultValue={styParams.background}
                        onChange={this.bgColor.bind(this)}
                    />
                </div>
                {turnback(this.turnback.bind(this))}
            </div>
        );
        //圆形
        let round = (
            < div className='roundEdit' >
                <div className='name'>
                    <label>名称:</label>
                    <input type="text"
                        defaultValue={passParams.name}
                        onChange={this.nameChange.bind(this)}
                    />
                </div>
                <div className='size'>
                    <label>尺寸:</label>
                    <input type="number"
                        placeholder="宽度"
                        value={passParams.size[0]}
                        onChange={this.widthChange.bind(this)}
                    />
                    <input type="number"
                        placeholder="高度"
                        value={passParams.size[1]}
                        onChange={this.heightChange.bind(this)}
                    />
                </div>
                <div className='color'>
                    <label>背景颜色:</label>
                    <input type="color"
                        onChange={this.bgColor.bind(this)}
                        defaultValue={styParams.background}
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


















