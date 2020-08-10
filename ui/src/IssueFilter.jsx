import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import URLSearchParams from 'url-search-params';

// eslint-disable-next-line react/prefer-stateless-function
class IssueFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);
    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (search !== prevSearch) this.showOriginalFilter();
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
      changed: true,
    });
  }

  onChangeEffortMin(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effortMin: e.target.value,
        changed: true,
      });
    }
  }

  onChangeEffortMax(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({
        effortMax: e.target.value,
        changed: true,
      });
    }
  }

  applyFilter() {
    const { status, effortMin, effortMax } = this.state;
    const { history } = this.props;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);
    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({
      pathname: '/issues',
      search,
    });
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      status: params.get('status') || '',
      effortMin: params.get('effortMin') || '',
      effortMax: params.get('effortMax') || '',
      changed: false,
    });
  }

  clearAllFilters() {
    this.setState({
      status: '',
      effortMin: '',
      effortMax: '',
      changed: false,
    });
    const { history } = this.props;
    history.push({
      pathname: '/issues',
      search: '',
    });
  }

  render() {
    // const { location: { search } } = this.props;
    // const params = new URLSearchParams(search);
    const {
      status,
      changed,
      effortMax,
      effortMin,
    } = this.state;
    return (
      <div>
        Status:
        {' '}
        <select value={status} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Closed">Closed</option>
        </select>
        {' '}
        Effort from
        {' '}
        <input size={2} value={effortMin} onChange={this.onChangeEffortMin} />
        {' '}
        to
        {' '}
        <input size={2} value={effortMax} onChange={this.onChangeEffortMax} />
        {' | '}
        <Button variant="outline-primary" onClick={this.applyFilter}>Apply</Button>
        {' '}
        <Button
          variant="outline-primary"
          onClick={this.showOriginalFilter}
          disabled={!changed}
        >
          Reset
        </Button>
        {' | '}
        <Button variant="outline-danger" onClick={this.clearAllFilters}>Clear all filters</Button>
      </div>
    );
  }
}

// Default Class doesn't have any Routes => no location, history component
export default withRouter(IssueFilter);
