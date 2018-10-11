import React from 'react';
import ReactDOM from 'react-dom';
//必要依赖
import _ from "lodash";
//容器框架css
import './index.css';
//容器组件
import ChartMonitor from './Components/chartMonitor/chartMonitor';
//图表示例
import Trs from './Components/Trs';
import Ers from './Components/Ers';
import Ersedit from './Components/Editblock';

//配置项
let chartElement = {
    //对应组件名,必须与引入的名称一致
    'Trs': {
        //组件大小的初始值，包括宽高、圆角（无圆角可不写或者写none），纯数字，不可带单位
        "style": {
            "width": 120,
            "height": 120,
            "borderRadius": "none",
        },
        //引入的组件,组件必须在函数内=>必须有params参数用来接收回传的数据
        "comItem": (params) => {
            return <Trs params={params} />
        },
        //编辑框内的各项参数
        "params": {
            //编辑框内的名称输入值
            name: "名字",
            editPanel: (turnBack) => {
                return <Ersedit turnBack={turnBack} />
            }
        }
    },
    //同上
    'Ers': {
        "style": {
            "width": 240,
            "height": 240,
            "borderRadius": 50,
        },
        "comItem": (params) => {
            return <Ers params={params} />
        },
        "params": {
            name: "名字2",
            editPanel: (turnBack) => {
                return <Ersedit turnBack={turnBack} />
            }
        }
    }
};

//调用组件传值
const ele = <ChartMonitor chartElement={chartElement} />



//....
ReactDOM.render(
    ele,
    document.getElementById('containerWrapper'),
);

