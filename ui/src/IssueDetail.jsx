import React from 'react';
import graphQLFetch from './graphql_fetch.js';

export default class IssueDetail extends React.Component {
  constructor() {
    super();
    this.state = { issue: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (prevId !== id) this.loadData();
  }

  async loadData() {
    const { match: { params: { id } } } = this.props;
    // eslint-disable-next-line radix
    const id2 = parseInt(id);
    const query = `query issue($id2: Int!) {
      issue(id: $id2) {
        id description
      }
    }`;
    const data = await graphQLFetch(query, { id2 });
    if (data) {
      this.setState({ issue: data.issue });
    } else {
      this.setState({ issue: {} });
    }
  }

  render() {
    const { issue: { description } } = this.state;
    return (
      <>
        <h3>Description</h3>
        <p>{description}</p>
      </>
    );
  }
}
