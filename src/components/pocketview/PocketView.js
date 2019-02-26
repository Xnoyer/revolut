import React, { Component } from 'react';
import './PocketView.css';
import CurrencyCarousel from "../currencycarousel/CurrencyCarousel";
import CurrencyInput from "../currencyinput/CurrencyInput";

class PocketView extends Component {
    constructor(props) {
        super(props);
        this.state = {pocketIndex: this.props.pocketIndex};
        this.onCurrencyChanged = this.onCurrencyChanged.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.pocketIndex !== prevProps.pocketIndex) {
            this.setState({pocketIndex: this.props.pocketIndex});
        }
    }

    onCurrencyChanged(newIndex) {
        this.setState({pocketIndex: newIndex});
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
    }

    onValueChanged(newValue) {
        if (this.props.onValueChanged) {
            this.props.onValueChanged(newValue);
        }
    }

    render() {
        return (
            <div className="PocketView">
                <div className="topRow">
                    <CurrencyCarousel currencies={this.props.currencies}
                                      currencyIndex={this.state.pocketIndex}
                                      onCurrencyChanged={this.onCurrencyChanged}/>
                    <CurrencyInput onValueChanged={this.onValueChanged}
                                   value={this.props.value}/>
                </div>
                <div className="balance">Balance: {this.props.balance.toFixed(2)}</div>
            </div>
        );
    }
}

export default PocketView;