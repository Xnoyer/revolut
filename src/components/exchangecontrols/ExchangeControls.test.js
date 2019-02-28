import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import ExchangeControls from './ExchangeControls';

Enzyme.configure({adapter: new Adapter()});

let wrapper;

const currencies = ['RUB', 'EUR'];
const rates = {'RUB': {'EUR': 0.5}, 'EUR': {'RUB': 2}};

it('renders without crashing', () => {
    wrapper = Enzyme.mount(
        <ExchangeControls rates={rates}
                          currencies={currencies}
                          fromIndex={0}
                          toIndex={1}/>
    );
});

it('has correct conversion label', () => {
    wrapper = Enzyme.mount(
        <ExchangeControls rates={rates}
                          currencies={currencies}
                          fromIndex={0}
                          toIndex={1}/>
    );
    expect(wrapper.find('.convertRate').text()).toBe('1 RUB = 0.5 EUR');
});

it('calls onClick when switch pockets button clicked', () => {
    let onCurrencySwitch = sinon.spy();
    wrapper = Enzyme.mount(
        <ExchangeControls rates={rates}
                          currencies={currencies}
                          fromIndex={0}
                          toIndex={1}
                          onCurrencySwitch={onCurrencySwitch}/>
    );
    wrapper.find('.switchButton').simulate('click');
    expect(onCurrencySwitch.called).toBe(true);
});
