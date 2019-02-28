import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import CurrencyInput from './CurrencyInput';

Enzyme.configure({adapter: new Adapter()});

let wrapper;

it('renders without crashing', () => {
    wrapper = Enzyme.mount(<CurrencyInput/>);
});