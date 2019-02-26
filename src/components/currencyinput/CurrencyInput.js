import React, {Component} from 'react';
import './CurrencyInput.css';

class CurrencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.pocketValue};
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    onValueChanged(e) {
        if (this.props.onValueChanged) {
            this.props.onValueChanged(e.target.value);
        }
    }

    render() {
        return (
            <div className="CurrencyInput">
                <input className="money-input"
                       step="0.01"
                       value={this.props.value}
                       type="number"
                       onChange={this.onValueChanged}/>
            </div>
        );
    }
}

export default CurrencyInput;