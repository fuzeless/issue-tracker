import React from 'react';
import { NavLink } from 'react-router-dom';
import Contents from './Contents.jsx';


function Navbar() {
  return (
    <div>
      <NavLink exact to="/">Home</NavLink>
      {' | '}
      <NavLink to="/issues">Issue List</NavLink>
      {' | '}
      <NavLink to="/report">Report</NavLink>
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
