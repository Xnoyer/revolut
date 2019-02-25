import React, { Component } from 'react';
import './PocketView.css';
import CurrencyCarousel from "../currencycarousel/CurrencyCarousel";
import CurrencyInput from "../currencyinput/CurrencyInput";

class PocketView extends Component {
    constructor(props) {
        super(props);
        this.state = {pocketIndex: this.props.pocketIndex};
        this.onCurrencyChanged = this.onCurrencyChanged.bind(this);
    }

    onCurrencyChanged(newIndex) {
        this.setState({pocketIndex: newIndex});
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
    }

    render() {
        return (
            <div className="PocketView">
                <div className="topRow">
                    <CurrencyCarousel currencies={this.props.currencies}
                                      currencyIndex={this.state.pocketIndex}
                                      currencyChanged={this.onCurrencyChanged}/>
                    <CurrencyInput/>
                </div>
                <div className="balance">Balance: {this.props.balance}</div>
            </div>
        );
    }
}

export default PocketView;