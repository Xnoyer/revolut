import React, {Component} from 'react';
import './Exchange.css';
import Button from "../button/Button";
import PocketView from "../pocketview/PocketView";
import ExchangeControls from "../exchangecontrols/ExchangeControls";

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.currencyList = Object.keys(props.pockets);
        this.state = {fromPocketIndex: 0, toPocketIndex: 1};
        this.onFromCurrencyChanged = this.onFromCurrencyChanged.bind(this);
        this.onToCurrencyChanged = this.onToCurrencyChanged.bind(this);
    }

    onFromCurrencyChanged(newIndex) {
        this.setState({fromPocketIndex: newIndex});
    }

    onToCurrencyChanged(newIndex) {
        this.setState({toPocketIndex: newIndex});
    }

    render() {
        return (
            <div className="Exchange">
                <PocketView currencies={this.currencyList}
                            pocketIndex={this.state.fromPocketIndex}
                            balance={this.props.pockets[this.currencyList[this.state.fromPocketIndex]].amount}
                            onCurrencyChanged={this.onFromCurrencyChanged}/>
                <ExchangeControls rates={this.props.rates}/>
                <PocketView currencies={this.currencyList}
                            pocketIndex={this.state.toPocketIndex}
                            balance={this.props.pockets[this.currencyList[this.state.toPocketIndex]].amount}
                            onCurrencyChanged={this.onToCurrencyChanged}/>
                <Button text="Exchange"/>
            </div>
        );
    }
}

export default Exchange;