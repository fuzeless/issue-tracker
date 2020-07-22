const aboutMessage = 'Issue Tracker API v0.1';
const defaultName = 'Le Quang Nhat';

// Also, Mutation functions.
function setAboutMessage(_, { message }) {
  return message;
}
function getMessage() {
  return aboutMessage;
}

const setName = (_, { name }) => name;
function getName() {
  return defaultName;
}

module.exports = { setName, setAboutMessage, getName, getMessage };
