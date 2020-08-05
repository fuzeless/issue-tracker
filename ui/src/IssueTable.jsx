import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';

const IssueRow = withRouter(({
  issue,
  location: { search },
  closeIssue,
  index,
  deleteIssue,
}) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };
  return (
    <tr>
      <td><center>{issue.id}</center></td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td><center>{issue.effort}</center></td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td>
        <Link to={`edit/${issue.id}`}>Edit</Link>
        {' | '}
        <NavLink to={selectLocation}>Select</NavLink>
        {' | '}
        <button type="button" onClick={() => closeIssue(index)}>Close</button>
        {' | '}
        <button type="button" onClick={() => deleteIssue(index)}>Delete</button>
      </td>
    </tr>
  );
});

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      closeIssue={closeIssue}
      deleteIssue={deleteIssue}
      index={index}
    />
  ));
  // console.log(this.state);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Date Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
          <th>Tools</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}
