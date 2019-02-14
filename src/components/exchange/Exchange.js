import React, {Component} from 'react';
import './Exchange.css';
import PocketView from "../pocketview/PocketView";
import ExchangeControls from "../exchangecontrols/ExchangeControls";

class Exchange extends Component {
  render() {
    return (
      <div className="Exchange">
        <PocketView/>
        <ExchangeControls />
        <PocketView/>
      </div>
    );
  }
}

export default Exchange;