import React, {Component} from 'react';
import './ExchangeControls.css';

class ExchangeControls extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {conversionString: ExchangeControls.calcConversionString(props)};
    }

    // Method which computes string with current currencies rate.
    // Format '1 <from_currency> = X <to_currency>
    static calcConversionString(props) {
        const fromCurrencyName = props.currencies[props.fromIndex];
        const toCurrencyName = props.currencies[props.toIndex];
        const rate = fromCurrencyName !== toCurrencyName ?
            props.rates[fromCurrencyName][toCurrencyName].toFixed(4).replace(/0*$/g, '').replace(/\.$/g, '') : 1;
        return `1 ${fromCurrencyName} = ${rate} ${toCurrencyName}`;
    }

    componentDidUpdate(prevProps) {
        // React on props update, recalc conversion string.
        if (this.props.fromIndex !== prevProps.fromIndex || this.props.toIndex !== prevProps.toIndex) {
            this.setState({conversionString: ExchangeControls.calcConversionString(this.props)});
        }
    }

    onClick() {
        if (this.props.onCurrencySwitch) {
            this.props.onCurrencySwitch();
        }
    }

    render() {
        return (
            <div className="ExchangeControls">
                <div className="switchButton" onClick={this.onClick}>Switch pockets</div>
                <div className="convertRate">{this.state.conversionString}</div>
            </div>
        );
    }
}

export default ExchangeControls;