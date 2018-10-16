import React from 'react';
import ReactDOM from 'react-dom';
import { resTingdata } from '../../public/chartMonitor'

import Trsedit from './Editblock';



class Trs extends React.Component {
    constructor() {
        super();
        this.state = {
            test1: {

            }
        }
    }
    render() {

        if (this.props) {
            this.state.test1 = this.props.params;

        }
        return <div></div>

    }
}

resTingdata('Trs2', {

    style: {
        width: 240,
        height: 240,
        borderRadius: 'none',
    },
    comItem: (params) => {
        return <Trs params={params} />
    },
    params: {
        name: "名字",
        editPanel: (turnBack) => {
            return <Trsedit turnBack={turnBack} />
        }
    },
    group: "基本形状-（圆方）",
    proportional:false

})


