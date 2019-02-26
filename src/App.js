import React, {Component} from 'react';
import './App.css';
import Exchange from "./components/exchange/Exchange";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Exchange pockets={this.state.pockets} rates={this.state.rates} onExchange={this.onExchange}/>
            </div>
        );
    }

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
        this.state = {
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
            rates: {
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
        };
        this.onExchange = this.onExchange.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
        this.interval = setInterval(this.fetchCurrencies.bind(this), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchCurrencies() {
        fetch('https://openexchangerates.org/api/latest.json?app_id=' + this.OPENEXCHANGERATES_ID + '&symbols=PLN,RUB,EUR')
            .then(response => response.json())
            .then(data => {
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
}

export default App;
