import React from 'react';
import { Router } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import Clock from './Clock.jsx';
import graphQLFetch from './graphql_fetch.js';

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) this.loadData();
  }

  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');
    // GraphQL Query for loadData() method
    const query = `query issueList($status: StatusType){
            issueList(status: $status) {
                id
                status
                title
                owner
                effort
                created
                due
            }
        }`;
    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ issues: data.issueList });
    }
    // this.setState({ issues: result.data.issueList });
  }

  // Create new issue sample.

  async createIssue(issue) {
    // const query = `mutation {
    //     issueAdd(issue: {
    //         owner: "${issue.owner}",
    //         title: "${issue.title}",
    //         due: "${issue.due.toISOString()}"
    //     })
    //     {
    //         id
    //     }
    // }`;
    const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
                id
            }
        }`;
    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { issues } = this.state;
    return (
      <>
        <h1>Issue Tracker</h1>
        <hr />
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
        <Router path={`${match.path}/:${id}`} component={IssueDetail} />
        <hr />
        <Clock />
        <hr />
      </>
    );
  }
}
