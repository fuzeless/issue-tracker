/* globals React PropTypes */

export default class IssueAdd extends React.Component {
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