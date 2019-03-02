import React, {Component} from 'react';
import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        // Do not fire event if button disabled.
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div className={'Button' + (this.props.disabled ? ' disabled' : '')} onClick={this.onClick}>
                {this.props.text}
            </div>
        );
    }
}

export default Button;