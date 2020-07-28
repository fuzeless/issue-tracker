/* globals React */
import IssueRow from './IssueRow.jsx';

export default function IssueTable({ issues }) {
  const issueRows = issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);
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
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}