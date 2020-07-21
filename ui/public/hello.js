// const element = (
//     <div title="Outer Div ">
//         <h1>Hello World using JSX</h1>
//     </div>
// );
// ReactDOM.render(element, document.getElementById('Content'));
class HelloWorld extends React.Component {
  render() {
    const continents = ['Africa', 'America', 'Asia', 'Australia', 'Europe'];
    const helloContinent = Array.from(continents, c => `Hello ${c}!`);
    const message = helloContinent.join(' ');
    return /*#__PURE__*/React.createElement("div", {
      title: "Outer Div"
    }, /*#__PURE__*/React.createElement("h1", null, "It is ", new Date().toLocaleTimeString(), "."));
  }

}

const element = /*#__PURE__*/React.createElement(HelloWorld, null);
ReactDOM.render(element, document.getElementById('Content'));
setInterval(render, 3000);