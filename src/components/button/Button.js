import React, {Component} from 'react';
import './Button.css';

class Button extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        return (
            <div className="Button" onClick={this.onClick}>
                {this.props.text}
            </div>
        );
    }
}

export default Button;