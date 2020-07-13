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

function IssueRow(props) {
  const issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.title));
}

class IssueFilter extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, "Placeholder for Issue Filter.", /*#__PURE__*/React.createElement("br", null), "Planned release date?");
  }

}

function IssueTable(props) {
  const issueRows = props.issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("table", {
    class: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, "ID"), /*#__PURE__*/React.createElement("tr", null, "Status"), /*#__PURE__*/React.createElement("tr", null, "Owner"), /*#__PURE__*/React.createElement("tr", null, "Created"), /*#__PURE__*/React.createElement("tr", null, "Effort"), /*#__PURE__*/React.createElement("tr", null, "Due Date"), /*#__PURE__*/React.createElement("tr", null, "Title")), /*#__PURE__*/React.createElement("tbody", null, issueRows)));
}

class IssueList extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, null), /*#__PURE__*/React.createElement("hr", null));
  }

}