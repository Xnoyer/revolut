import React, {Component} from 'react';
import './CurrencyInput.css';

class CurrencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.pocketValue};
    }

    render() {
        return (
            <div className="CurrencyInput">
                <input className="money-input" step="0.01" type="number"/>
            </div>
        );
    }
}

export default CurrencyInput;