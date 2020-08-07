import React from 'react';
import {
  Nav, Navbar, NavItem, NavDropdown,
  MenuItem, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { FaPlus, FaChevronDown, FaEllipsisV } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';

function Navigation() {
  const createIssueTooltip = <Tooltip id="tooltip-create">Create Issue</Tooltip>
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>
          Issue Tracker
        </Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/issues">
            <Nav.Link>Issue List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/report">
            <Nav.Link>Report</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav>
          {/* Create Issue icon */}
          <Nav.Link>
            <OverlayTrigger
              placement="left"
              overlay={createIssueTooltip}
            >
              <FaPlus />
            </OverlayTrigger>
          </Nav.Link>
          <NavDropdown
            id="user-dropdown"
            title={<FaChevronDown />}
            noCaret
          >
            <NavDropdown.Item>About</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <Navigation />
      <Contents />
    </div>
  );
}
