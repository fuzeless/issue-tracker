import React from 'react';
import { Link } from 'react-router-dom';
import NumInput from './InputForms/NumInput.jsx';
import graphQLFetch from './graphql_fetch.js';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const { issue } = this.state;
    console.log(issue);
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
    if (data) {
      const { issue } = data;
      issue.description = issue.description != null ? issue.description.toString() : '';
      issue.owner = issue.owner != null ? issue.owner.toString() : '';
      issue.due = issue.due ? issue.due.toDateString() : '';
      this.setState({
        issue,
      });
    } else {
      this.setState({ issue: {} });
    }
  }

  render() {
    const { issue: { id } } = this.state;
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
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing issue with ID ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Created:</td>
              <td>{created.toDateString()}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <select name="status" value={status} onChange={this.onChange}>
                  <option value="New">New</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Owner:</td>
              <td>
                <input
                  name="owner"
                  value={owner}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Effort:</td>
              <td>
                <NumInput
                  name="effort"
                  value={effort}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td>Due:</td>
              <td>
                <input
                  name="due"
                  value={due}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  size={50}
                  name="title"
                  value={title}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>
                <textarea
                  rows={8}
                  cols={50}
                  name="description"
                  value={description}
                  onChange={this.onChange}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        <Link to={`/edit/${id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${id + 1}`}>Next</Link>
      </form>
    );
  }
}
