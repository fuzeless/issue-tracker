import React from 'react';
import URLSearchParams from 'url-search-params';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueDetail from './IssueDetail.jsx';
import Clock from './Clock.jsx';
import graphQLFetch from './graphql_fetch.js';
import store from './store.js';

export default class IssueList extends React.Component {
  static async fetchData(match, search) {
    const params = new URLSearchParams(search);
    const vars = { hasSelection: false, selectedId: 0 };

    if (params.get('status')) vars.status = params.get('status');
    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const { params: { id } } = match;
    const idInt = Number.parseInt(id, 10);
    if (!Number.isNaN(idInt)) {
      vars.hasSelection = true;
      vars.selectedId = idInt;
    }
    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
      $hasSelection: Boolean!
      $selectedId: Int!
      ){
            issueList(
              status: $status
              effortMin: $effortMin
              effortMax: $effortMax
              ) {
                id
                status
                title
                owner
                effort
                created
                due
            }
            issue(id: $selectedId) @include (if: $hasSelection){
              id description
            }
        }`;
    const data = await graphQLFetch(query, vars);
    return data;
  }

  constructor() {
    super();
    const issues = store.data ? store.data.issueList : null;
    const selectedIssue = store.data ? store.data.issue : null;
    this.state = {
      issues,
      selectedIssue,
    };
    delete store.data;
    this.createIssue = this.createIssue.bind(this);
    this.closeIssue = this.closeIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    const { issues } = this.state;
    if (issues == null) {
      this.loadData();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
      match: { params: { id: prevId } },
    } = prevProps;
    const {
      location: { search },
      match: { params: { id } },
    } = this.props;
    if (prevSearch !== search || prevId !== id) this.loadData();
  }

  async loadData() {
    const { location: { search }, match } = this.props;
    const data = await IssueList.fetchData(match, search);
    if (data) {
      this.setState({ issues: data.issueList, selectedIssue: data.issue });
    }
  }

  async createIssue(issue) {
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

  async closeIssue(index) {
    const query = `mutation issueClose($id: Int!) {
      issueUpdate(id: $id, changes: { status: Closed }) {
        id title status owner effort created due description
      }
    }`;
    const { issues } = this.state;
    const data = await graphQLFetch(query, { id: issues[index].id });
    if (data) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        newList[index] = data.issueUpdate;
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  async deleteIssue(index) {
    const query = `mutation issueDelete($id: Int!) {
      issueDelete(id: $id)
    }`;
    const { issues } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = issues[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.issueDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        if (pathname === `/issues/${id}`) {
          history.push({ pathname: '/issues', search });
        }
        newList.splice(index, 1);
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { issues, selectedIssue } = this.state;
    if (issues == null) return null;
    return (
      <>
        <br />
        <IssueFilter urlBase="/issues" />
        <br />
        <IssueTable issues={issues} closeIssue={this.closeIssue} deleteIssue={this.deleteIssue} />
        <hr />
        <IssueDetail issue={selectedIssue} />
        <hr />
        <Clock />
      </>
    );
  }
}
