import React from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';

import IssueFilter from './IssueFilter.jsx';

export default class IssueReport extends React.Component {
  constructor() {
    super();
    this.state = {
      isFilterOpened: false,
    }
  }

  render() {
    const { isFilterOpened } = this.state;
    return (
      <>
        <Card bg="dark" text="white">
          <Card.Header>
            <Button
              style={{ backgroundColor: 'transparent', border: 'transparent' }}
              block
              onClick={() => this.setState({ isFilterOpened: !isFilterOpened })}
            >
              <h4>Filter</h4>
            </Button>
          </Card.Header>
          <Collapse in={isFilterOpened}>
            <div>
              <Card.Body>
                <IssueFilter urlBase="/report" />
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      </>
    );
  }
}
