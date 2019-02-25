import React, {Component} from 'react';
import './App.css';
import Exchange from "./components/exchange/Exchange";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Exchange pockets={this.pockets} rates={this.rates}/>
      </div>
    );
  }

    constructor() {
        super();
        this.pockets = {
            'RUB': {
                amount: 5000,
            },
            'USD': {
                amount: 500,
            },
            'EUR': {
                amount: 1000,
            },
            'PLN': {
                amount: 700,
            }
        };

        this.rates = {
            'RUB': {
                'USD': 0.0153,
                'EUR': 0.0134,
                'PLN': 0.0583,
            },
            'USD': {
                'RUB': 65.5178,
                'EUR': 0.8801,
                'PLN': 3.8180,
            },
            'EUR': {
                'USD': 1.1362,
                'RUB': 74.4390,
                'PLN': 4.3380,
            },
            'PLN': {
                'USD': 0.2619,
                'EUR': 0.2305,
                'RUB': 17.1616,
            },
        }
    }
}

export default App;
