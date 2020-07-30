import React from 'react';
import { Link } from 'react-router-dom';

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
      <td><Link to={`edit/${issue.id}`}><center>Edit</center></Link></td>
    </tr>
  );
}
