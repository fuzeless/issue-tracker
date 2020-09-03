import React from 'react';
import {
  NavDropdown,
  Button,
  Nav,
  Modal,
} from 'react-bootstrap';

export default class SignInNavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: false,
      user: {
        signedIn: false,
        givenName: '',
      },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  signIn() {
    this.setState({ user: { signedIn: true, givenName: 'User1' } });
    this.hideModal();
  }

  signOut() {
    this.setState({ user: { signedIn: false, givenName: '' } });
  }

  render() {
    const { user, showing } = this.state;

    //* If signed in, show "Sign Out" button instead
    if (user.signedIn) {
      return (
        <NavDropdown title={user.givenName} id="user">
          <NavDropdown.Item onClick={this.signOut}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      );
    }

    //* If not signed in, render Sign In Modal
    return (
      <>
        <Nav.Link onClick={this.showModal}>
          Sign In
        </Nav.Link>
        <Modal show={showing} onHide={this.hideModal} backdrop="static">
          <Modal.Header closeButton>
            Choose your Sign In method
          </Modal.Header>
          <Modal.Body>
            <Button variant="primary" onClick={this.signIn}>
              Sign In
            </Button>
            <Button variant="primary">
              Sign In using Google Account
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
