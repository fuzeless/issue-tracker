import React from 'react';
import { withRouter, Link, NavLink } from 'react-router-dom';
import {
  FaRegEdit, FaRegStickyNote, FaRegWindowClose, FaRegTrashAlt,
} from 'react-icons/fa';
import { Button, OverlayTrigger, Tooltip, Table } from 'react-bootstrap';

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
        <center>
          <Link to={`/edit/${issue.id}`}>
            <OverlayTrigger overlay={editTooltip}>
              <Button size="sm" variant="primary">
                <FaRegEdit />
              </Button>
            </OverlayTrigger>
          </Link>
          {' '}
          <NavLink to={selectLocation}>
            <OverlayTrigger overlay={descriptionTooltip}>
              <Button size="sm" variant="primary">
                <FaRegStickyNote />
              </Button>
            </OverlayTrigger>
          </NavLink>
          {' '}
          <OverlayTrigger overlay={closeTooltip}>
            <Button variant="success" size="sm" onClick={() => closeIssue(index)}>
              <FaRegWindowClose />
            </Button>
          </OverlayTrigger>
          {' '}
          <OverlayTrigger overlay={deleteTooltip}>
            <Button variant="danger" size="sm" onClick={() => deleteIssue(index)}>
              <FaRegTrashAlt />
            </Button>
          </OverlayTrigger>
        </center>
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
    <Table striped bordered hover size="lg" variant="dark" responsive>
      <thead>
        <tr>
          <th><center>ID</center></th>
          <th><center>Status</center></th>
          <th><center>Owner</center></th>
          <th><center>Date Created</center></th>
          <th><center>Effort</center></th>
          <th><center>Due Date</center></th>
          <th><center>Title</center></th>
          <th><center>Tools</center></th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </Table>
  );
}
