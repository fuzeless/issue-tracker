import React from 'react';
import {
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // Prevent from submitting the form to GET HTTP when Add button is clicked
    e.preventDefault();

    // Get inputted Form and store it to form
    const form = document.forms.issueAdd;

    // Create issue based on form inputs
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
    };
    const { createIssue } = this.props;
    createIssue(issue);

    // Reset form fields.
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      // <Form name="issueAdd" onSubmit={this.handleSubmit}>
      //   <input type="text" name="owner" placeholder="Owner" />
      //   <input type="text" name="title" placeholder="Title" />
      //   <button type="submit">Add</button>
      // </Form>
      <Card bg="dark" text="white">
        <Card.Header><center><h4>Add Issue</h4></center></Card.Header>
        <Card.Body>
          <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
            <Form.Group className="mb-2 mr-sm-2">
              <Form.Label className="mr-sm-2">Owner</Form.Label>
              {' '}
              <Form.Control as="input" type="text" name="owner" placeholder="Type your Owner here" />
            </Form.Group>
            <Form.Group className="mb-2 mr-sm-2">
              <Form.Label className="mr-sm-2">Title</Form.Label>
              {' '}
              <Form.Control as="input" type="text" name="title" placeholder="Type your Title here" />
              {' '}
            </Form.Group>
            <Button type="submit" className="mb-2">Add</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired,
};
