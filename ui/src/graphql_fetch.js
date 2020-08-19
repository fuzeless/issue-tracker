/* eslint-disable no-alert */
import fetch from 'isomorphic-fetch';

// Convert ISO Date to Locale Date using JSON.parse()
const dateRegex = new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

// Fetch GraphQL Data
export default async function graphQLFetch(query, variables = {}) {
  const apiEndpoint = (__isBrowser__)
    ? window.ENV.UI_API_ENDPOINT : process.env.UI_SERVER_API_ENDPOINT;
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    // TODO: Re-implement errors handling using bootstrap
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        console.log(`${error.message}:\n ${details}`);
      } else {
        console.log(`${error.extensions.code}:\n ${error.message}`);
      }
    }

    return result.data;
  } catch (e) {
    console.log(`Error in sending data to server: ${e.message}`);
    return null;
  }
}
