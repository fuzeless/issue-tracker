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
      disabled: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ client_id: clientId })
          .then(() => this.setState({ disabled: false }));
      }
    });
  }

  showModal() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) {
      // eslint-disable-next-line no-alert
      alert('Missing environment variable GOOGLE_CLIENT_ID');
      return;
    }
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async signIn() {
    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
    } catch (error) {
      alert(`Error communicating with Google: ${error.error}`);
    }

    //* Send googleToken to backend server for authentication
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, givenName } = result;

      this.setState({ user: { givenName, signedIn } });
    } catch (error) {
      alert(`Error signing into app: ${error}`)
    }
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
              Sign In with Google (Beta)
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
