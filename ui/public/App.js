// import React from 'react';
// import ReactDOM from 'react-dom';;
// import Clock from './Clock';
const initialIssues = [{
  id: 1,
  status: 'New',
  owner: 'Fuzeless',
  created: new Date('2019-05-30'),
  effort: 5,
  due: new Date('2019-06-08'),
  title: 'Missing Title for IssueTracker!!!'
}, {
  id: 2,
  status: 'Closed',
  owner: 'Ethan',
  created: new Date('2018-07-19'),
  effort: 5,
  due: new Date(""),
  title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!"
}, {
  id: 3,
  status: 'New',
  owner: 'Fuzeless',
  created: new Date('2019-05-30'),
  effort: 5,
  due: new Date('2019-06-08'),
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
}, {
  id: 4,
  status: 'New',
  owner: 'Fuzeless',
  created: new Date('2019-05-30'),
  effort: 5,
  due: new Date('2019-06-08'),
  title: 'Missing Title for IssueTracker'
}]; //Sample Issue for adding new Issue.

const sampleIssue = {
  status: "New",
  owner: "Pierra",
  title: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, fuga?'
};

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
} //Convert ISO Date to Locale Date using JSON.parse()


const dateRegex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
} //Fetch GraphQL Data


async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join("\n ");
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}:\n ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message()}`);
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    // this.timerID = setInterval(
    //     () => this.tick(),
    //     1000
    // );
    // requestAnimationFrame(() => this.tick());
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "It is ", this.state.date.toLocaleTimeString()));
  }

}

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, "Placeholder for IssueFilter"), /*#__PURE__*/React.createElement("p", null, "what should i do lmao"));
  }

}

function IssueTable(props) {
  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  })); // console.log(this.state);

  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Date Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
}

;

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ' '), /*#__PURE__*/React.createElement("td", null, issue.title));
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    //Prevent from submitting the form to GET HTTP when Add button is clicked
    e.preventDefault(); // Get inputted Form and store it to form

    const form = document.forms.issueAdd; // Create issue based on form inputs

    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4)
    };
    this.props.createIssue(issue); // Reset form fields.

    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "issueAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "owner",
      placeholder: "Owner"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "title",
      placeholder: "Title"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
  }

}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    //GraphQL Query for loadData() method
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
      this.setState({
        issues: data.issueList
      });
    } // this.setState({ issues: result.data.issueList });

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
    const data = await graphQLFetch(query, {
      issue
    });

    if (data) {
      this.loadData();
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
      issues: this.state.issues
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
      createIssue: this.createIssue
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Clock, null), /*#__PURE__*/React.createElement("hr", null));
  }

}

const element = /*#__PURE__*/React.createElement(IssueList, null);
ReactDOM.render(element, document.getElementById('content'));