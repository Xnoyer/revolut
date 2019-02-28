import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Exchange from "./components/exchange/Exchange";

Enzyme.configure({adapter: new Adapter()});

let wrapper;

it('renders without crashing', () => {
    wrapper = Enzyme.mount(<App/>);
});

it('contains Exchange control', () => {
    wrapper = Enzyme.mount(<App/>);
    expect(wrapper.find('Exchange').instance() instanceof Exchange).toBe(true);
});