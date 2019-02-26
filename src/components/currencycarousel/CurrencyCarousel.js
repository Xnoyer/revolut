import React, {Component} from 'react';
import './CurrencyCarousel.css';

class CurrencyCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {currencyIndex: props.currencyIndex};
        this.onLeftButtonClick = this.onLeftButtonClick.bind(this);
        this.onRightButtonClick = this.onRightButtonClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currencyIndex !== prevProps.currencyIndex) {
            this.setState({currencyIndex: this.props.currencyIndex});
        }
    }

    onLeftButtonClick() {
        const newIndex = this.state.currencyIndex > 0 ? this.state.currencyIndex - 1 : this.props.currencies.length - 1;
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
        this.setState({currencyIndex: newIndex});
    }

    onRightButtonClick() {
        const newIndex = this.state.currencyIndex < this.props.currencies.length - 1 ? this.state.currencyIndex + 1 : 0;
        if (this.props.onCurrencyChanged) {
            this.props.onCurrencyChanged(newIndex);
        }
        this.setState({currencyIndex: newIndex});
    }

    render() {
        return (
            <div className="CurrencyCarousel">
                <div className="arrow left" onClick={this.onLeftButtonClick}>
                    <span>&lt;</span>
                </div>
                <div className="currency">{this.props.currencies[this.state.currencyIndex]}</div>
                <div className="arrow right" onClick={this.onRightButtonClick}>
                    <span>&gt;</span>
                </div>
            </div>
        );
    }
}

export default CurrencyCarousel;