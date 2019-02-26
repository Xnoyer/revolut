import React, {Component} from 'react';
import './Exchange.css';
import Button from "../button/Button";
import PocketView from "../pocketview/PocketView";
import ExchangeControls from "../exchangecontrols/ExchangeControls";

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.currencyList = Object.keys(props.pockets);
        this.state = {fromPocketIndex: 0, toPocketIndex: 1, fromValue: 0, toValue: 0};
        this.onFromCurrencyChanged = this.onFromCurrencyChanged.bind(this);
        this.onToCurrencyChanged = this.onToCurrencyChanged.bind(this);
        this.onCurrencySwitch = this.onCurrencySwitch.bind(this);
        this.onFromValueChanged = this.onFromValueChanged.bind(this);
        this.onToValueChanged = this.onToValueChanged.bind(this);
        this.onExchange = this.onExchange.bind(this);
    }

    onFromCurrencyChanged(newIndex) {
        this.setState({fromPocketIndex: newIndex});
    }

    onToCurrencyChanged(newIndex) {
        this.setState({toPocketIndex: newIndex});
    }

    onCurrencySwitch() {
        this.setState((state, params) => ({
            toPocketIndex: state.fromPocketIndex,
            fromPocketIndex: state.toPocketIndex,
        }));
    }

    onFromValueChanged(newValue) {
        if (newValue === this.state.fromValue) {
            return;
        }
        this.setState({
            fromValue: newValue,
            toValue: this.convert(this.state.fromPocketIndex, this.state.toPocketIndex, newValue)
        });
    }

    onToValueChanged(newValue) {
        if (newValue === this.state.toValue) {
            return;
        }
        this.setState({
            toValue: newValue,
            fromValue: this.convert(this.state.toPocketIndex, this.state.fromPocketIndex, newValue)
        });
    }

    onExchange() {
        if (this.props.onExchange) {
            this.props.onExchange(this.currencyList[this.state.fromPocketIndex], this.currencyList[this.state.toPocketIndex], this.state.fromValue);
            this.setState({toValue: 0, fromValue: 0});
        }
    }

    convert(fromIndex, toIndex, value) {
        const rate = fromIndex !== toIndex ? this.props.rates[this.currencyList[fromIndex]][this.currencyList[toIndex]] : 1;
        return (value * rate).toFixed(2);
    }

    render() {
        return (
            <div className="Exchange">
                <PocketView currencies={this.currencyList}
                            pocketIndex={this.state.fromPocketIndex}
                            balance={this.props.pockets[this.currencyList[this.state.fromPocketIndex]].amount}
                            value={this.state.fromValue}
                            onCurrencyChanged={this.onFromCurrencyChanged}
                            onValueChanged={this.onFromValueChanged}/>
                <ExchangeControls rates={this.props.rates}
                                  currencies={this.currencyList}
                                  fromIndex={this.state.fromPocketIndex}
                                  toIndex={this.state.toPocketIndex}
                                  onCurrencySwitch={this.onCurrencySwitch}/>
                <PocketView currencies={this.currencyList}
                            pocketIndex={this.state.toPocketIndex}
                            balance={this.props.pockets[this.currencyList[this.state.toPocketIndex]].amount}
                            value={this.state.toValue}
                            onCurrencyChanged={this.onToCurrencyChanged}
                            onValueChanged={this.onToValueChanged}/>
                <Button text="Exchange" onClick={this.onExchange}/>
            </div>
        );
    }
}

export default Exchange;