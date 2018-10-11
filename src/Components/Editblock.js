import React from 'react';
import ReactDOM from 'react-dom';
export default class Ersedit extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }


    change(event) {
        let res = {
            "index": event.currentTarget.value
        };
        const { turnBack } = this.props;
        turnBack(res);
    }

    render() {

        return (
            <div className='indexErs'>
                <label>index:</label>
                <input type="text"
                    onChange={this.change.bind(this)}
                />
            </div>
        );
    }
}
