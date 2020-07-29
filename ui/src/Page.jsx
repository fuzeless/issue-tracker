import React from 'react';
import Contents from './Contents.jsx';

function Navbar() {
  return (
    <div>
      <a href="/#/">Home</a>
      {' | '}
      <a href="/#/issue">Issue List</a>
      {' | '}
      <a href="/#/report">Report</a>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Navbar />
      <Contents />
    </div>
  );
}
