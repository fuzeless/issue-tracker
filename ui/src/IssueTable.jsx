import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import {
  FaRegEdit, FaRegStickyNote, FaRegWindowClose, FaRegTrashAlt,
} from 'react-icons/fa';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const IssueRow = withRouter(({
  issue,
  location: { search },
  closeIssue,
  index,
  deleteIssue,
}) => {
  const selectLocation = { pathname: `/issues/${issue.id}`, search };

  //* Tooltips
  const closeTooltip = <Tooltip id="tooltip-close" placement="top">Close Issue</Tooltip>;
  const deleteTooltip = <Tooltip id="tooltip-delete" placement="top">Delete Issue</Tooltip>;
  const descriptionTooltip = <Tooltip id="tooltip-description" placement="top">Show Description</Tooltip>;
  const editTooltip = <Tooltip id="tooltip-edit" placement="top">Edit Issue</Tooltip>;

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
        <Link to={`edit/${issue.id}`}>
          <OverlayTrigger overlay={editTooltip}>
            <Button size="sm" variant="outline-primary">
              <FaRegEdit />
            </Button>
          </OverlayTrigger>
        </Link>
        {' '}
        <NavLink to={selectLocation}>
          <OverlayTrigger overlay={descriptionTooltip}>
            <Button size="sm" variant="outline-primary">
              <FaRegStickyNote />
            </Button>
          </OverlayTrigger>
        </NavLink>
        {' '}
        <OverlayTrigger overlay={closeTooltip}>
          <Button variant="outline-success" size="sm" onClick={() => closeIssue(index)}>
            <FaRegWindowClose />
          </Button>
        </OverlayTrigger>
        {' '}
        <OverlayTrigger overlay={deleteTooltip}>
          <Button variant="outline-danger" size="sm" onClick={() => deleteIssue(index)}>
            <FaRegTrashAlt />
          </Button>
        </OverlayTrigger>
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
