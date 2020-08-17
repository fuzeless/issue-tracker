import React from 'react';
import {
  Nav, Navbar, NavDropdown,
  Container,
} from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';
import IssueAdd from './IssueAdd.jsx';

function Navigation() {
  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
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
          <IssueAdd />
          <NavDropdown
            alignRight
            id="user-dropdown"
            title={<FaChevronDown />}
          >
            <LinkContainer to="/about">
              <NavDropdown.Item>
                About
              </NavDropdown.Item>
            </LinkContainer>
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
      <Container fluid style={{ paddingLeft: '45px', paddingRight: '45px' }}>
        <Navigation />
        <Contents />
        <hr />
        <Footer />
      </Container>
    </div>
  );
}
