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

it('calls onValueChanged when input value changed', () => {
    const onValueChanged = sinon.spy();
    wrapper = Enzyme.mount(<CurrencyInput onValueChanged={onValueChanged}/>);
    wrapper.find('input').simulate("change", {target: {value: '100'}});
    expect(onValueChanged.called).toBe(true);
});

// Don't know how to test actual keyboard events on input, so I'll test preventDefault() calls.
it('calls preventDefault in certain cases', () => {
    const preventDefault = sinon.spy();
    const event = {preventDefault: preventDefault, target: {selectionStart: 0, selectionEnd: 0, value: '0'}};

    event.key = 'Backspace';
    CurrencyInput.onKeyDown(event);
    // Shouldn't be called, all special keys should pass through.
    expect(preventDefault.called).toBe(false);

    event.key = '1';
    CurrencyInput.onKeyDown(event);
    // Shouldn't be called, all special keys should pass through.
    expect(preventDefault.called).toBe(false);

    event.key = 'A';
    CurrencyInput.onKeyDown(event);
    // Should be called, all keys except numbers should be blocked.
    expect(preventDefault.called).toBe(true);

    event.key = '.';
    event.target.value = '12345';
    event.target.selectionStart = 3;
    event.target.selectionEnd = 3;
    CurrencyInput.onKeyDown(event);
    // Shouldn't be called, putting dot should be allowed.
    expect(preventDefault.callCount).toBe(1);

    event.key = '.';
    event.target.value = '12345';
    event.target.selectionStart = 1;
    event.target.selectionEnd = 1;
    CurrencyInput.onKeyDown(event);
    // Should be called, putting dot in this position is not allowed.
    expect(preventDefault.callCount).toBe(2);

    event.key = '.';
    event.target.value = '123.45';
    event.target.selectionStart = 3;
    event.target.selectionEnd = 3;
    CurrencyInput.onKeyDown(event);
    // Should be called, putting second dot is not allowed.
    expect(preventDefault.callCount).toBe(3);

    event.key = '0';
    event.target.value = '123.45';
    event.target.selectionStart = 4;
    event.target.selectionEnd = 4;
    CurrencyInput.onKeyDown(event);
    // Should be called, putting third number in decimal part is not allowed.
    expect(preventDefault.callCount).toBe(4);

    event.key = '0';
    event.target.value = '123.45';
    event.target.selectionStart = 4;
    event.target.selectionEnd = 5;
    CurrencyInput.onKeyDown(event);
    // Shouldn't be called, replacing numbers in decimal part is allowed.
    expect(preventDefault.callCount).toBe(4);

    event.key = '0';
    event.target.value = '1';
    event.target.selectionStart = 1;
    event.target.selectionEnd = 1;
    CurrencyInput.onKeyDown(event);
    // Should replace value with new key to prevent values like '01'
    expect(event.target.value).toBe('1');
});