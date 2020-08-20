import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  Collapse,
  Button,
  InputGroup,
  FormControl, FormGroup, FormLabel, Form,
  Row,
  Col,
} from 'react-bootstrap';
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
      isFilterOpened: false,
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
    const { history, urlBase } = this.props;
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (effortMin) params.set('effortMin', effortMin);
    if (effortMax) params.set('effortMax', effortMax);
    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({
      pathname: urlBase,
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
      isFilterOpened,
    } = this.state;
    return (
      <Card bg="dark" text="white">
        <Card.Header>
          <Button
            style={{ backgroundColor: 'transparent', border: 'transparent' }}
            block
            onClick={() => this.setState({ isFilterOpened: !isFilterOpened })}
          >
            <h4>Filter</h4>
          </Button>
        </Card.Header>
        <Collapse in={isFilterOpened}>
          <div>
            <Card.Body>
              <Row>
                <Col sm={12} md={6} lg={4}>
                  <FormGroup>
                    <FormLabel><h5>Status</h5></FormLabel>
                    <FormControl
                      as="select"
                      value={status}
                      onChange={this.onChangeStatus}
                    >
                      <option value="">(All)</option>
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Closed">Closed</option>
                    </FormControl>
                  </FormGroup>
                </Col>

                <Col sm={12} md={6} lg={4}>
                  <FormGroup>
                    <FormLabel><h5>Effort Between</h5></FormLabel>
                    <InputGroup className="mb-3">
                      <Form.Control value={effortMin} onChange={this.onChangeEffortMin} />
                      <InputGroup.Prepend>
                        <InputGroup.Text>and</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control value={effortMax} onChange={this.onChangeEffortMax} />
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col sm={12} md={12} lg={4}>
                  <FormLabel><h5>&nbsp;</h5></FormLabel>
                  <FormGroup>
                    <Button
                      variant="primary"
                      onClick={this.applyFilter}
                    >
                      Apply
                    </Button>
                    {' '}
                    <Button
                      variant="primary"
                      onClick={this.showOriginalFilter}
                      disabled={!changed}
                    >
                      Reset
                    </Button>
                    {' '}
                    <Button
                      variant="danger"
                      onClick={this.clearAllFilters}
                    >
                      Clear all filters
                    </Button>
                    {' '}
                  </FormGroup>
                </Col>
              </Row>
            </Card.Body>
          </div>
        </Collapse>
      </Card>
    );
  }
}

// Default Class doesn't have any Routes => no location, history component
export default withRouter(IssueFilter);
