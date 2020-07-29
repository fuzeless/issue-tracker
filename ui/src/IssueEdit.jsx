import React from 'react';

export default function IssueEdit({ match }) {
  const { id } = match.params;
  return (
    <h1>{`Placeholder to edit Issue ${id}`}</h1>
  );
}
