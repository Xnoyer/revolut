import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PocketView from './PocketView';
import CurrencyCarousel from "../currencycarousel/CurrencyCarousel";
import CurrencyInput from "../currencyinput/CurrencyInput";

Enzyme.configure({adapter: new Adapter()});

let wrapper;

const currencies = ['RUB', 'EUR', 'USD'];

it('renders without crashing', () => {
    wrapper = Enzyme.mount(
        <PocketView currencies={currencies}
                    pocketIndex={0}
                    balance={1000}
                    value={0}/>);
});

it('contains internal controls', () => {
    wrapper = Enzyme.mount(
        <PocketView currencies={currencies}
                    pocketIndex={0}
                    balance={1000}
                    value={0}/>);
    expect(wrapper.find('CurrencyCarousel').instance() instanceof CurrencyCarousel).toBe(true);
    expect(wrapper.find('CurrencyInput').instance() instanceof CurrencyInput).toBe(true);
});

it('renders balance', () => {
    wrapper = Enzyme.mount(
        <PocketView currencies={currencies}
                    pocketIndex={0}
                    balance={1000}
                    value={0}/>);
    expect(wrapper.find('.balance').text()).toBe('Balance: 1000.00');
});

// No reason to test events because those events are passing through with React help.