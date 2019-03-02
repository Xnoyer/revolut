import React, {Component} from 'react';
import './App.css';
import Exchange from "./components/exchange/Exchange";

class App extends Component {
    // Listens for onExchange call from Exchange component. Moves certain amounts of "money" from pocket to pocket.
    onExchange(fromPocket, toPocket, value) {
        if (fromPocket === toPocket) {
            return;
        }
        this.setState((state, props) => ({
            pockets: {
                [fromPocket]: {
                    amount: state.pockets[fromPocket].amount - value
                },
                [toPocket]: {
                    amount: state.pockets[toPocket].amount + value * this.state.rates[fromPocket][toPocket]
                }
            }
        }));
    }

    constructor() {
        super();
        this.OPENEXCHANGERATES_ID = '16fed18503864b3ea1af861481eedac9';
        this.UPDATE_INTERVAL = 10000;
        this.state = {
            // Dummy pockets.
            pockets: {
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
            },
            // Dummy rates.
            // Should be generated accodring to the pockets, but pockets are fixed.
            rates: {
                'RUB': {
                    'USD': 0, 'EUR': 0, 'PLN': 0,
                },
                'USD': {
                    'RUB': 0, 'EUR': 0, 'PLN': 0,
                },
                'EUR': {
                    'USD': 0, 'RUB': 0, 'PLN': 0,
                },
                'PLN': {
                    'USD': 0, 'EUR': 0, 'RUB': 0,
                },
            }
        };
        this.onExchange = this.onExchange.bind(this);
    }

    componentDidMount() {
        // Fetching currencies on first open.
        this.fetchCurrencies();
        // And to it every this.UPDATE_INTERVAL milliseconds.
        this.interval = setInterval(this.fetchCurrencies.bind(this), this.UPDATE_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchCurrencies() {
        fetch('https://openexchangerates.org/api/latest.json?app_id=' + this.OPENEXCHANGERATES_ID + '&symbols=PLN,RUB,EUR')
            .then(response => response.json())
            .then(data => {
                // That's unfortunate. This service provides API with setting base currency only for paid account.
                // So I'll calculate all currency rates based on USD rates, sorry.
                const newRates = {
                    'USD': {
                        'EUR': data.rates.EUR,
                        'RUB': data.rates.RUB,
                        'PLN': data.rates.PLN,
                    },
                    'EUR': {
                        'USD': 1 / data.rates.EUR,
                        'RUB': (1 / data.rates.EUR) * data.rates.RUB,
                        'PLN': (1 / data.rates.EUR) * data.rates.PLN,
                    },
                    'RUB': {
                        'USD': 1 / data.rates.RUB,
                        'EUR': (1 / data.rates.RUB) * data.rates.EUR,
                        'PLN': (1 / data.rates.RUB) * data.rates.PLN,
                    },
                    'PLN': {
                        'USD': 1 / data.rates.PLN,
                        'RUB': (1 / data.rates.PLN) * data.rates.RUB,
                        'EUR': (1 / data.rates.PLN) * data.rates.EUR,
                    },
                };
                this.setState({rates: newRates});
            });
    }

    render() {
        return (
            <div className="App">
                <Exchange pockets={this.state.pockets} rates={this.state.rates} onExchange={this.onExchange}/>
            </div>
        );
    }
}

export default App;
