import React from 'react';
import {
  Nav, Navbar, NavDropdown,
  Tooltip, OverlayTrigger, Container,
} from 'react-bootstrap';
import { FaPlus, FaChevronDown, FaEllipsisV } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';

function Navigation() {
  const createIssueTooltip = <Tooltip id="tooltip-create">Create Issue</Tooltip>;
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>
          Issue Tracker
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Item>
            <LinkContainer exact to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/issues">
              <Nav.Link>Issue List</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/report">
              <Nav.Link>Report</Nav.Link>
            </LinkContainer>
          </Nav.Item>
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
            alignRight
            id="user-dropdown"
            title={<FaChevronDown />}
          >
            <NavDropdown.Item>About</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

function Footer() {
  return (
    <small>
      <p className="text-center">
        Helo
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <Container fluid>
        <Navigation />
        <Contents />
        <Footer />
      </Container>
    </div>
  );
}
