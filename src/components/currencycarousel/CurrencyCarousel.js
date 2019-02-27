import React, {Component} from 'react';
import './CurrencyCarousel.css';

class CurrencyCarousel extends Component {
    constructor(props) {
        super(props);
        this.onLeftButtonClick = this.onLeftButtonClick.bind(this);
        this.onRightButtonClick = this.onRightButtonClick.bind(this);
    }

    onLeftButtonClick() {
        // Rotate currency index to the left.
        const newIndex = this.props.currencyIndex > 0 ? this.props.currencyIndex - 1 : this.props.currencies.length - 1;
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
    }

    onRightButtonClick() {
        // Rotate currency index to the right.
        const newIndex = this.props.currencyIndex < this.props.currencies.length - 1 ? this.props.currencyIndex + 1 : 0;
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
    }

    render() {
        return (
            <div className="CurrencyCarousel">
                <div className="arrow left" onClick={this.onLeftButtonClick}>
                    <div className="arrowInner">&lt;</div>
                </div>
                <div className="currency">{this.props.currencies[this.props.currencyIndex]}</div>
                <div className="arrow right" onClick={this.onRightButtonClick}>
                    <div className="arrowInner">&gt;</div>
                </div>
            </div>
        );
    }
}

export default CurrencyCarousel;