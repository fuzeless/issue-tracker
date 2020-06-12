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
        return (
            <div title='Outer Div'>
                <h1>
                    It is {new Date().toLocaleTimeString()}.
                </h1>
            </div>  
        );
    }
}

const element = <HelloWorld />;
ReactDOM.render(element, document.getElementById('Content'));

setInterval(render, 1000);