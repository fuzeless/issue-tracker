/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM PropTypes */
/* eslint "no-alert": "off" */
import graphQLFetch from './graphql_fetch';
import Clock from './Clock';

// eslint-disable-next-line no-unused-vars
const initialIssues = [
  {
    id: 1,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Missing Title for IssueTracker!!!',
  },
  {
    id: 2,
    status: 'Closed',
    owner: 'Ethan',
    created: new Date('2018-07-19'),
    effort: 5,
    due: new Date(''),
    title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!',
  },
  {
    id: 3,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    id: 4,
    status: 'New',
    owner: 'Fuzeless',
    created: new Date('2019-05-30'),
    effort: 5,
    due: new Date('2019-06-08'),
    title: 'Missing Title for IssueTracker',
  },
];
// Sample Issue for adding new Issue.
// eslint-disable-next-line no-unused-vars
const sampleIssue = {
  status: 'New',
  owner: 'Pierra',
  title: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, fuga?',
};

// eslint-disable-next-line no-unused-vars
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// eslint-disable-next-line react/prefer-stateless-function
class IssueFilter extends React.Component {
  render() {
    return (
      <>
        <div>Placeholder for IssueFilter</div>
        <p>what should i do lmao</p>
      </>
    );
  }
}

function IssueTable({ issues }) {
  const issueRows = issues.map((issue) => <IssueRow key={issue.id} issue={issue} />);
  // console.log(this.state);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Date Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td>{issue.title}</td>
    </tr>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // Prevent from submitting the form to GET HTTP when Add button is clicked
    e.preventDefault();

    // Get inputted Form and store it to form
    const form = document.forms.issueAdd;

    // Create issue based on form inputs
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
    };
    const { createIssue } = this.props;
    createIssue(issue);

    // Reset form fields.
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button type="submit">Add</button>
      </form>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired,
};

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    // GraphQL Query for loadData() method
    const query = `query {
            issueList {
                id
                status
                title
                owner
                effort
                created
                due
            }
        }`;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
    // this.setState({ issues: result.data.issueList });
  }

  // Create new issue sample.

  async createIssue(issue) {
    // const query = `mutation {
    //     issueAdd(issue: {
    //         owner: "${issue.owner}",
    //         title: "${issue.title}",
    //         due: "${issue.due.toISOString()}"
    //     })
    //     {
    //         id
    //     }
    // }`;
    const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
                id
            }
        }`;
    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  render() {
    const { issues } = this.state;
    return (
      <>
        <h1>Issue Tracker</h1>
        <hr />
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
        <Clock />
        <hr />
      </>
    );
  }
}

const element = <IssueList />;
ReactDOM.render(element, document.getElementById('content'));
