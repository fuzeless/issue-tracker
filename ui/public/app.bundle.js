/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/Clock.js":
/*!*************************!*\
  !*** ./public/Clock.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Clock; });\n/* eslint-disable react/react-in-jsx-scope */\nclass Clock extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      date: new Date()\n    };\n  }\n\n  componentDidMount() {\n    // this.timerID = setInterval(\n    //     () => this.tick(),\n    //     1000\n    // );\n    // requestAnimationFrame(() => this.tick());\n    this.tick();\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.timerID);\n  }\n\n  tick() {\n    this.setState({\n      date: new Date()\n    });\n    requestAnimationFrame(this.tick.bind(this));\n  }\n\n  render() {\n    const {\n      date\n    } = this.state;\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h1\", null, `It is ${date.toLocaleTimeString()}`));\n  }\n\n}\n\n//# sourceURL=webpack:///./public/Clock.js?");

/***/ }),

/***/ "./public/app.js":
/*!***********************!*\
  !*** ./public/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _graphql_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphql_fetch */ \"./public/graphql_fetch.js\");\n/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Clock */ \"./public/Clock.js\");\n/* eslint-disable react/prop-types */\n\n/* eslint-disable max-classes-per-file */\n\n/* eslint \"react/react-in-jsx-scope\": \"off\" */\n\n/* globals React ReactDOM PropTypes */\n\n/* eslint \"no-alert\": \"off\" */\n\n // eslint-disable-next-line no-unused-vars\n\nconst initialIssues = [{\n  id: 1,\n  status: 'New',\n  owner: 'Fuzeless',\n  created: new Date('2019-05-30'),\n  effort: 5,\n  due: new Date('2019-06-08'),\n  title: 'Missing Title for IssueTracker!!!'\n}, {\n  id: 2,\n  status: 'Closed',\n  owner: 'Ethan',\n  created: new Date('2018-07-19'),\n  effort: 5,\n  due: new Date(''),\n  title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, assumenda!'\n}, {\n  id: 3,\n  status: 'New',\n  owner: 'Fuzeless',\n  created: new Date('2019-05-30'),\n  effort: 5,\n  due: new Date('2019-06-08'),\n  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'\n}, {\n  id: 4,\n  status: 'New',\n  owner: 'Fuzeless',\n  created: new Date('2019-05-30'),\n  effort: 5,\n  due: new Date('2019-06-08'),\n  title: 'Missing Title for IssueTracker'\n}]; // Sample Issue for adding new Issue.\n// eslint-disable-next-line no-unused-vars\n\nconst sampleIssue = {\n  status: 'New',\n  owner: 'Pierra',\n  title: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, fuga?'\n}; // eslint-disable-next-line no-unused-vars\n\nfunction randomDate(start, end) {\n  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));\n} // eslint-disable-next-line react/prefer-stateless-function\n\n\nclass IssueFilter extends React.Component {\n  render() {\n    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"div\", null, \"Placeholder for IssueFilter\"), /*#__PURE__*/React.createElement(\"p\", null, \"what should i do lmao\"));\n  }\n\n}\n\nfunction IssueTable({\n  issues\n}) {\n  const issueRows = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {\n    key: issue.id,\n    issue: issue\n  })); // console.log(this.state);\n\n  return /*#__PURE__*/React.createElement(\"table\", {\n    className: \"bordered-table\"\n  }, /*#__PURE__*/React.createElement(\"thead\", null, /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"th\", null, \"ID\"), /*#__PURE__*/React.createElement(\"th\", null, \"Status\"), /*#__PURE__*/React.createElement(\"th\", null, \"Owner\"), /*#__PURE__*/React.createElement(\"th\", null, \"Date Created\"), /*#__PURE__*/React.createElement(\"th\", null, \"Effort\"), /*#__PURE__*/React.createElement(\"th\", null, \"Due Date\"), /*#__PURE__*/React.createElement(\"th\", null, \"Title\"))), /*#__PURE__*/React.createElement(\"tbody\", null, issueRows));\n}\n\nfunction IssueRow({\n  issue\n}) {\n  return /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"td\", null, issue.id), /*#__PURE__*/React.createElement(\"td\", null, issue.status), /*#__PURE__*/React.createElement(\"td\", null, issue.owner), /*#__PURE__*/React.createElement(\"td\", null, issue.created.toDateString()), /*#__PURE__*/React.createElement(\"td\", null, issue.effort), /*#__PURE__*/React.createElement(\"td\", null, issue.due ? issue.due.toDateString() : ' '), /*#__PURE__*/React.createElement(\"td\", null, issue.title));\n}\n\nclass IssueAdd extends React.Component {\n  constructor() {\n    super();\n    this.handleSubmit = this.handleSubmit.bind(this);\n  }\n\n  handleSubmit(e) {\n    // Prevent from submitting the form to GET HTTP when Add button is clicked\n    e.preventDefault(); // Get inputted Form and store it to form\n\n    const form = document.forms.issueAdd; // Create issue based on form inputs\n\n    const issue = {\n      owner: form.owner.value,\n      title: form.title.value,\n      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4)\n    };\n    const {\n      createIssue\n    } = this.props;\n    createIssue(issue); // Reset form fields.\n\n    form.owner.value = '';\n    form.title.value = '';\n  }\n\n  render() {\n    return /*#__PURE__*/React.createElement(\"form\", {\n      name: \"issueAdd\",\n      onSubmit: this.handleSubmit\n    }, /*#__PURE__*/React.createElement(\"input\", {\n      type: \"text\",\n      name: \"owner\",\n      placeholder: \"Owner\"\n    }), /*#__PURE__*/React.createElement(\"input\", {\n      type: \"text\",\n      name: \"title\",\n      placeholder: \"Title\"\n    }), /*#__PURE__*/React.createElement(\"button\", {\n      type: \"submit\"\n    }, \"Add\"));\n  }\n\n}\n\nIssueAdd.propTypes = {\n  createIssue: PropTypes.func.isRequired\n};\n\nclass IssueList extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      issues: []\n    };\n    this.createIssue = this.createIssue.bind(this);\n  }\n\n  componentDidMount() {\n    this.loadData();\n  }\n\n  async loadData() {\n    // GraphQL Query for loadData() method\n    const query = `query {\n            issueList {\n                id\n                status\n                title\n                owner\n                effort\n                created\n                due\n            }\n        }`;\n    const data = await Object(_graphql_fetch__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(query);\n\n    if (data) {\n      this.setState({\n        issues: data.issueList\n      });\n    } // this.setState({ issues: result.data.issueList });\n\n  } // Create new issue sample.\n\n\n  async createIssue(issue) {\n    // const query = `mutation {\n    //     issueAdd(issue: {\n    //         owner: \"${issue.owner}\",\n    //         title: \"${issue.title}\",\n    //         due: \"${issue.due.toISOString()}\"\n    //     })\n    //     {\n    //         id\n    //     }\n    // }`;\n    const query = `mutation issueAdd($issue: IssueInputs!) {\n            issueAdd(issue: $issue) {\n                id\n            }\n        }`;\n    const data = await Object(_graphql_fetch__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(query, {\n      issue\n    });\n\n    if (data) {\n      this.loadData();\n    }\n  }\n\n  render() {\n    const {\n      issues\n    } = this.state;\n    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"h1\", null, \"Issue Tracker\"), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(IssueTable, {\n      issues: issues\n    }), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(IssueAdd, {\n      createIssue: this.createIssue\n    }), /*#__PURE__*/React.createElement(\"hr\", null), /*#__PURE__*/React.createElement(_Clock__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/React.createElement(\"hr\", null));\n  }\n\n}\n\nconst element = /*#__PURE__*/React.createElement(IssueList, null);\nReactDOM.render(element, document.getElementById('content'));\n\n//# sourceURL=webpack:///./public/app.js?");

/***/ }),

/***/ "./public/graphql_fetch.js":
/*!*********************************!*\
  !*** ./public/graphql_fetch.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return graphQLFetch; });\n/* eslint-disable no-alert */\n// Convert ISO Date to Locale Date using JSON.parse()\nconst dateRegex = new RegExp('\\\\d\\\\d\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d');\n\nfunction jsonDateReviver(key, value) {\n  if (dateRegex.test(value)) return new Date(value);\n  return value;\n} // Fetch GraphQL Data\n\n\nasync function graphQLFetch(query, variables = {}) {\n  try {\n    const response = await fetch(window.ENV.UI_API_ENDPOINT, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        query,\n        variables\n      })\n    });\n    const body = await response.text();\n    const result = JSON.parse(body, jsonDateReviver);\n\n    if (result.errors) {\n      const error = result.errors[0];\n\n      if (error.extensions.code === 'BAD_USER_INPUT') {\n        const details = error.extensions.exception.errors.join('\\n ');\n        alert(`${error.message}:\\n ${details}`);\n      } else {\n        alert(`${error.extensions.code}:\\n ${error.message}`);\n      }\n    }\n\n    return result.data;\n  } catch (e) {\n    alert(`Error in sending data to server: ${e.message()}`);\n    return null;\n  }\n}\n\n//# sourceURL=webpack:///./public/graphql_fetch.js?");

/***/ })

/******/ });