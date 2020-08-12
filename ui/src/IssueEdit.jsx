import React from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Card,
  Form,
  Button,
  Row, Col,
  Container,
} from 'react-bootstrap';

import NumInput from './InputForms/NumInput.jsx';
import DateInput from './InputForms/DateInput.jsx';
import TextInput from './InputForms/TextInput.jsx';
import graphQLFetch from './graphql_fetch.js';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
      invalidFields: {},
      showingValidation: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) {
      this.loadData();
    }
  }

  onChange(e, naturalValue) {
    const { name, value: textValue } = e.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState) => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  onValidityChange(e, valid) {
    const { name } = e.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { issue, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;
    const { id, created, ...changes } = issue;
    const query = `mutation issueUpdate(
      $id: Int!,
      $changes: IssueUpdateInputs!
    ) {
        issueUpdate(id: $id, changes: $changes) {
          id title status owner
          effort created due description
      }
    }`;
    const data = await graphQLFetch(query, { id, changes });
    if (data) {
      this.setState({ issue: data.issueUpdate });
      this.showValidation();
    }
  }

  async loadData() {
    const query = `query issue($id: Int!){
      issue(id: $id) {
        id title owner status description
        effort created due
      }
    }`;
    let { match: { params: { id } } } = this.props;
    id = Number.parseInt(id, 10);
    const data = await graphQLFetch(query, { id });
    this.setState({
      issue: data ? data.issue : {},
      invalidFields: {},
    });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  render() {
    const { issue: { id } } = this.state;
    const { invalidFields, showingValidation } = this.state;
    let validationMessage = (
      <Alert variant="success" show={showingValidation} onClose={this.dismissValidation} dismissible>
        {`Issue ID ${id} updated successfully!`}
      </Alert>
    );
    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = (
        <Alert variant="danger" show={showingValidation} onClose={this.dismissValidation} dismissible>
          {`Issue ID ${id} failed to update!`}
        </Alert>
      );
    }
    const { match: { params: { id: propId } } } = this.props;
    if (id == null) {
      if (propId != null) {
        return <h3>{`Can't find issue with ID ${propId}`}</h3>;
      }
      return null;
    }

    const { issue: { title, status } } = this.state;
    const { issue: { owner, effort, description } } = this.state;
    const { issue: { created, due } } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Card>
            <Card.Header><center><h3>{`Edit Issue with ID ${id}`}</h3></center></Card.Header>
            <Card.Body>
              <Row>
                <Col lg={3} md={4} sm={4} xs={12}>
                  <Form.Group>
                    <Form.Label><strong>Owner</strong></Form.Label>
                    <Form.Control
                      as={TextInput}
                      name="owner"
                      value={owner}
                      onChange={this.onChange}
                      key={id}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={7} md={8} sm={8} xs={12}>
                  <Form.Group>
                    <Form.Label><strong>Title</strong></Form.Label>
                    <Form.Control
                      as={TextInput}
                      size={50}
                      name="title"
                      value={title}
                      onChange={this.onChange}
                      key={id}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={2} md={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label><strong>Status</strong></Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      value={status}
                      onChange={this.onChange}
                    >
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="Fixed">Fixed</option>
                      <option value="Closed">Closed</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label><strong>Created</strong></Form.Label>
                    <Form.Control placeholder={`${created.toDateString()}`} readOnly />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label><strong>Due Date</strong></Form.Label>
                    <Form.Control
                      as={DateInput}
                      name="due"
                      value={due}
                      onChange={this.onChange}
                      onValidityChange={this.onValidityChange}
                      key={id}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label><strong>Effort</strong></Form.Label>
                    <Form.Control
                      as={NumInput}
                      name="effort"
                      value={effort}
                      onChange={this.onChange}
                      key={id}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label><strong>Description</strong></Form.Label>
                <Form.Control
                  as={TextInput}
                  tag="textarea"
                  rows={8}
                  cols={50}
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  key={id}
                />
              </Form.Group>
              <Form.Group>
                {validationMessage}
              </Form.Group>
              <Button variant="outline-primary" type="submit">Submit</Button>
            </Card.Body>
            <Card.Footer>
              <Link to={`/edit/${id - 1}`}>Prev</Link>
              {' | '}
              <Link to={`/edit/${id + 1}`}>Next</Link>
            </Card.Footer>
          </Card>
        </Form>
      </Container>
    );
  }
}
