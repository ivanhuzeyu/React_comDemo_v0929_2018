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
            //编辑框内的标题输入值
            title: "折线",
            //编辑框内的样式选择 共有3个样式 1、2、3
            css: 1,
            /*========以上为两种类型都有的属性（必填），以下为两种类型不同属性，不同属性有则填写，无则为空或者可不写===========================*/
            //X轴范围
            x: 30,
            //折线图的变量参数 为：变量名（vname）、颜色(vcolor)、缩放值(vscale)、偏移值(voffset)，最多为八条，初始值可以为空，如果有值，请按照Json写法，每一个对象是一各变量（线）
            line: [
                {
                    vname: "first",
                    vcolor: '#cccccc',
                    vscale: 1.0,
                    voffset: 0
                },
                {
                    vname: "second",
                    vcolor: '#eeeeee',
                    vscale: 2.0,
                    voffset: 0.5
                },
            ],
            //表盘的变量名
            variables: "",
            //表盘的范围 ： 最小值、最大值
            range: [],
            //表盘线性变化 系数K 偏移B
            keys: [],
            //表盘是否开启小刻度  false true 
            scale: false
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
            title: "表盘2",
            css: 2,
            variables: "guage",
            range: [0, 100],
            keys: [1, 0],
            scale: false
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

