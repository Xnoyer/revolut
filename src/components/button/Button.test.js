import React from 'react';
import Enzyme from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

Enzyme.configure({adapter: new Adapter()});

let wrapper;

it('renders without crashing', () => {
    wrapper = Enzyme.mount(<Button/>);
});

it('has disabled class when disabled by props', () => {
    wrapper = Enzyme.mount(<Button disabled/>);
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.getDOMNode().classList.contains('disabled')).toBe(true);
});

it('has internal text from props', () => {
    wrapper = Enzyme.mount(<Button text="Button text"/>);
    expect(wrapper.text()).toBe('Button text');
});

it('calls onClick in enabled state and not calls in disabled', () => {
    let onClick = sinon.spy();
    wrapper = Enzyme.mount(<Button onClick={onClick}/>);
    wrapper.simulate('click');
    expect(onClick.called).toBe(true);
    wrapper.setProps({disabled: true});
    wrapper.simulate('click');
    expect(onClick.callCount).toBe(1);
});
