/* globals React */

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
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

  async loadData() {
    // GraphQL Query for loadData() method
    const query = `query {
            issueList {
                id
                status
                title
                owner
                effort
                created
                due
            }
        }`;
    const data = await graphQLFetch(query);
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
        <Clock />
        <hr />
      </>
    );
  }
}
