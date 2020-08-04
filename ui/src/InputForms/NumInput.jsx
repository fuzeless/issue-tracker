import React from 'react';

function format(value) {
  return value != null ? value.toString() : '';
}

function unformat(value) {
  const val = Number.parseInt(value, 10);
  return !Number.isNaN(val) ? val : null;
}

export default class NumInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: format(props.value),
    };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({
        value: e.target.value,
      });
    }
  }

  onBlur(e) {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(e, unformat(value));
  }

  render() {
    const { value } = this.state;
    return (
      <input
        type="text"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...this.props}
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
