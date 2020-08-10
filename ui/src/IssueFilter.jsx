import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
      <Form>
        <Form.Group>
          <Form.Label><h5>Status</h5></Form.Label>
          <Form.Control as="select"
            value={status}
            onChange={this.onChangeStatus}
          >
            <option value="">(All)</option>
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Closed">Closed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label><h5>Effort Between</h5></Form.Label>
          <InputGroup className="mb-3">
            <Form.Control />
            <InputGroup.Prepend>
              <InputGroup.Text>and</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Button variant="outline-primary" onClick={this.applyFilter}>Apply</Button>
          {' '}
          <Button
            variant="outline-primary"
            onClick={this.showOriginalFilter}
            disabled={!changed}
          >
            Reset
          </Button>
          {' '}
          <Button variant="outline-danger" onClick={this.clearAllFilters}>Clear all filters</Button>
        </Form.Group>
      </Form>
    );
  }
}

// Default Class doesn't have any Routes => no location, history component
export default withRouter(IssueFilter);
