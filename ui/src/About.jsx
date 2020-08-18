import React from 'react';
import graphQLFetch from './graphql_fetch.js';
import store from './store.js';

export default class About extends React.Component {
  static async fetchAbout() {
    const data = await graphQLFetch('query { about }');
    return data;
  }

  constructor() {
    super();
    const apiAbout = store.data ? store.data.about : null;
    delete store.data;
    this.state = { apiAbout };
  }

  async componentDidMount() {
    const { apiAbout } = this.state;
    if (apiAbout === null) {
      const data = await About.fetchAbout();
      this.setState({
        apiAbout: data.about,
      });
    }
  }

  render() {
    const { apiAbout } = this.state;
    return (
      <div className="text-center">
        <h3>{apiAbout}</h3>
      </div>
    );
  }
}
