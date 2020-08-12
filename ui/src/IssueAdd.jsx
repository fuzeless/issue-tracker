import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
  Button,
  Nav,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import graphQLFetch from './graphql_fetch.js';

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.state = { show: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    // Prevent from submitting the form to GET HTTP when Add button is clicked
    e.preventDefault();

    // Get inputted Form and store it to form
    const form = document.forms.issueAdd;

    // Create issue based on form inputs
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
    };
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
          id
      }
  }`;
    const data = await graphQLFetch(query, { issue });
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.issueAdd.id}`);
      this.closeModal();
    }
  }

  showModal() {
    this.setState({ show: true });
    const { show } = this.state;
    console.log(show);
  }

  closeModal() {
    this.setState({ show: false });
  }

  render() {
    const createIssueTooltip = <Tooltip id="tooltip-create">Create Issue</Tooltip>;
    const { show } = this.state;
    return (
      <>
        <Nav.Link onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            overlay={createIssueTooltip}
          >
            <FaPlus />
          </OverlayTrigger>
        </Nav.Link>
        <Modal show={show} onHide={this.closeModal}>
          <Modal.Header closeButton><center><h4>Add Issue</h4></center></Modal.Header>
          <Modal.Body>
            <Form name="issueAdd" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label><strong>Owner</strong></Form.Label>
                {' '}
                <Form.Control as="input" type="text" name="owner" placeholder="Type your Owner here" />
              </Form.Group>
              <Form.Group>
                <Form.Label><strong>Title</strong></Form.Label>
                {' '}
                <Form.Control as="input" type="text" name="title" placeholder="Type your Title here" />
                {' '}
              </Form.Group>
              <Button
                type="button"
                className="mb-2"
                variant="outline-primary"
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withRouter(IssueAdd);
