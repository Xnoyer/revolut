import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import Exchange from './Exchange';
import PocketView from "../pocketview/PocketView";
import ExchangeControls from "../exchangecontrols/ExchangeControls";
import Button from "../button/Button";

Enzyme.configure({adapter: new Adapter()});

let wrapper;

const pockets = {
    'RUB': {amount: 1000},
    'EUR': {amount: 2000},
    'USD': {amount: 3000}
};
const rates = {
    'RUB': {'EUR': 0.5, 'USD': 0.1},
    'EUR': {'RUB': 2, 'USD': 0.2},
    'USD': {'RUB': 10, 'EUR': 5}
};

it('renders without crashing', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
});

it('contains internal controls', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    expect(wrapper.find('PocketView').at(0).instance() instanceof PocketView).toBe(true);
    expect(wrapper.find('PocketView').at(1).instance() instanceof PocketView).toBe(true);
    expect(wrapper.find('ExchangeControls').instance() instanceof ExchangeControls).toBe(true);
    expect(wrapper.find('Button').instance() instanceof Button).toBe(true);
});

it('shows disabled button on init', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    expect(wrapper.find('Button').props().disabled).toBe(true);
});

it('switches currencies on button click', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    wrapper.find('.switchButton').simulate('click');
    wrapper.update();
    expect(wrapper.state().fromPocketIndex).toBe(1);
    expect(wrapper.state().toPocketIndex).toBe(0);
});

it('changes currency on arrow click', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    wrapper.find('.arrow.left').at(0).simulate('click');
    wrapper.update();
    expect(wrapper.state().fromPocketIndex).toBe(2);
});

it('enables and disables button according to conversion value', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    // This is not work anymore, setProps can be called only on root.
    //wrapper.find('PocketView').setProps({value: 500});
    wrapper.instance().onFromValueChanged('500');
    wrapper.update();
    expect(wrapper.state().exchangeAllowed).toBe(true);
    expect(wrapper.find('Button').props().disabled).toBe(false);
});

it('calls onExchange on button press', () => {
    const onExchange = sinon.spy();
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates} onExchange={onExchange}/>);
    wrapper.instance().onFromValueChanged('500');
    wrapper.update();
    wrapper.find('Button').simulate('click');
    expect(onExchange.called).toBe(true);
    expect(onExchange.withArgs('RUB', 'EUR', '500').called).toBe(true);
});

it('convert method returns right value', () => {
    wrapper = Enzyme.mount(<Exchange pockets={pockets} rates={rates}/>);
    expect(wrapper.instance().convert(0, 1, 300)).toBe('150');
});