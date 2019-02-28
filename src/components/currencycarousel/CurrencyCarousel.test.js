import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import CurrencyCarousel from './CurrencyCarousel';

Enzyme.configure({adapter: new Adapter()});

let wrapper;
const currencies = ['RUB', 'EUR', 'USD'];

it('renders without crashing', () => {
    wrapper = Enzyme.mount(<CurrencyCarousel currencies={currencies} currencyIndex={0}/>);
});

it('has label of selected currency', () => {
    wrapper = Enzyme.mount(<CurrencyCarousel currencies={currencies} currencyIndex={1}/>);
    expect(wrapper.find('.currency').text()).toBe(currencies[1]);
});

it('calls onCurrencyChanged with newIndex argument when arrow clicked', () => {
    let onCurrencyChanged = sinon.spy();
    wrapper = Enzyme.mount(
        <CurrencyCarousel currencies={currencies}
                          currencyIndex={0}
                          onCurrencyChanged={onCurrencyChanged}/>);
    wrapper.find('.arrow.left').simulate('click');
    expect(onCurrencyChanged.called).toBe(true);
    expect(onCurrencyChanged.withArgs(2).called).toBe(true);
});
