import React from 'react';

function displayFormat(date) {
  const newDate = new Date(date);
  return (date != null) ? newDate.toDateString() : '';
}

function editFormat(date) {
  const newDate = new Date(date);
  return (date != null) ? newDate.toISOString().substr(0, 10) : '';
}

function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const { value, valid: oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue != null;
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid });
    if (valid) onChange(e, dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: origValue, onValidityChange, ...props } = this.props;
    const displayValue = (focused || !valid) ? value : displayFormat(origValue);
    return (
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        value={displayValue}
        placeholder={focused ? 'YYYY-MM-DD' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
