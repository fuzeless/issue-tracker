import React from 'react';

export default function IssueRow({ issue }) {
  return (
    <tr>
      <td><center>{issue.id}</center></td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td><center>{issue.effort}</center></td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
      <td><a href={`/#/edit/${issue.id}`}><center>Edit</center></a></td>
    </tr>
  );
}
