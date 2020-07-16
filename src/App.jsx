// import React from 'react';
// import ReactDOM from 'react-dom';;
// import Clock from './Clock';
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
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//Convert ISO Date to Locale Date using JSON.parse()
const dateRegex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value))
        return new Date(value);
    return value;
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
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
        this.setState({ date: new Date() });
        requestAnimationFrame(this.tick.bind(this));
    }

    render() {
        return (
            <div>
                <h1>It is {this.state.date.toLocaleTimeString()}</h1>
            </div>
        );
    }
}


class IssueFilter extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>Placeholder for IssueFilter</div>
                <p>what should i do lmao</p>
            </React.Fragment>
        );
    }
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
        <IssueRow key={issue.id} issue={issue} />
    );
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
};



function IssueRow(props) {
    const issue = props.issue;
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
        //Prevent from submitting the form to GET HTTP when Add button is clicked
        e.preventDefault();

        // Get inputted Form and store it to form
        const form = document.forms.issueAdd;

        // Create issue based on form inputs
        const issue = {
            owner: form.owner.value,
            title: form.title.value,
            due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4)
        };
        this.props.createIssue(issue);

        // Reset form fields.
        form.owner.value = "";
        form.title.value = "";
    }

    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        );
    }
}


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

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);
        // console.log(body);
        this.setState({ issues: result.data.issueList });
        // console.log(this.state.issues);
    };

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
        }`
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: {issue} })
        });
        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <hr />
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
                <hr />
                <Clock />
                <hr />
            </React.Fragment>
        )
    }
}

const element = <IssueList />;
ReactDOM.render(element, document.getElementById('content'));