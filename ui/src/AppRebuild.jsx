const initialIssues = [
    {
        id: 1,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Missing Title for IssueTracker!!!'
    },
    {
        id: 2,
        status: 'Closed',
        owner: 'Ethan',
        created: new Date('2018-07-19'),
        effort: 5,
        due: new Date(""),
        title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!"
    },
    {
        id: 3,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
    },
    {
        id: 4,
        status: 'New',
        owner: 'Fuzeless',
        created: new Date('2019-05-30'),
        effort: 5,
        due: new Date('2019-06-08'),
        title: 'Missing Title for IssueTracker'
    }
]

//Sample Issue for adding new Issue.
const sampleIssue = {
    status: "New",
    owner: "Pierra",
    title: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, fuga?'
}

function IssueRow(props) {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due.toDateString()}</td>
            <td>{issue.title}</td>
        </tr>
    )
}

class IssueFilter extends React.Component {
    render() {
        return (
            <div>
                Placeholder for Issue Filter.
                <br />
                Planned release date?
            </div>
        )
    }
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);
    return (
        <React.Fragment>
            <table class='bordered-table'>
                <thead>
                    <tr>ID</tr>
                    <tr>Status</tr>
                    <tr>Owner</tr>
                    <tr>Created</tr>
                    <tr>Effort</tr>
                    <tr>Due Date</tr>
                    <tr>Title</tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        </React.Fragment>
    )
}

class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
                <hr />
            </React.Fragment>
        )
    }
}