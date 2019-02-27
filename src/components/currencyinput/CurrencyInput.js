import React, {Component} from 'react';
import './CurrencyInput.css';

class CurrencyInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.pocketValue};
        this.onValueChanged = this.onValueChanged.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onValueChanged(e) {
        if (this.props.onValueChanged) {
            this.props.onValueChanged(e.target.value);
        }
    }

    onKeyDown(e) {
        // Those allowed keys are the only, which will be passed to the input. Everything else is ignored.
        const allowedKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'
        ];
        if (e.key.length > 1) {
            // Not a symbol, special key, pass through.
            return;
        }
        if (allowedKeys.indexOf(e.key) === -1) {
            e.preventDefault();
            return;
        }
        let selectionStart = e.target.selectionStart;
        let selectionEnd = e.target.selectionEnd;
        let value = e.target.value;
        let valueHasDecimalSeparator = value.indexOf('.') > -1;
        if (e.key === '.') {
            if (valueHasDecimalSeparator || selectionEnd < value.length - 2) {
                // If decimal separator is going to be written, check if it's not already exist and if resulting decimal
                // part is shorter than 3 symbols (2 and less). If not, ignore input.
                e.preventDefault();
                return;
            }
        }
        if (valueHasDecimalSeparator) {
            // If number already contains decimal separator.
            let decimalPart = value.split('.')[1];
            if (decimalPart.length === 2 && selectionStart === selectionEnd && selectionStart > value.indexOf('.')) {
                // Do not allow to write third symbol after '.', but only if there is no selection.
                e.preventDefault();
                return;
            }
        }
        if (value === '0' && selectionStart === selectionEnd && selectionStart > 0) {
            // If value was '0' and user writes symbol after it, remove it.
            e.target.value = '';
        }
    }

    render() {
        return (
            <div className="CurrencyInput">
                <input className="money-input"
                       step="0.01"
                       value={this.props.value}
                       onKeyDown={this.onKeyDown}
                       onChange={this.onValueChanged}/>
            </div>
        );
    }
}

export default CurrencyInput;