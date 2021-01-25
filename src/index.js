import React from "react";
import ReactDOM from "react-dom";

const scales = {c: 'Celsius', f: 'Fahrenheit'}

function toFahrenheit(c){
  return (((9/5)*c) + 32)
}
function toCelsius(f){
  return (5/9*(f-32))
}
function tryConvert(temp, convert){
  const t = parseFloat(temp)
  if (Number.isNaN(t)){
    return ''
  }
  const output = convert(t);

  return (Math.round(output * 1000) / 1000).toString();
}

class TempInput extends React.Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event) {
    this.props.onTempretureChange(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="temp">{scales[this.props.scale]}: </label>
        <input
          value={this.props.tempreture}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

class Converter extends React.Component {
  constructor(props){
    super(props);
    this.state = {tempreture: '', scale: 'c'}
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
  }
  handleCelsiusChange(tempreture){
    this.setState({scale: 'c', tempreture})
  }
  handleFahrenheitChange(tempreture){
    this.setState({scale: 'f', tempreture})
  }

  render() {
    const scale = this.state.scale;
    const tempreture = this.state.tempreture;
    const fahrenheit = scale === 'f' ? tempreture : tryConvert(tempreture, toFahrenheit)
    const celsius = scale === 'c' ? tempreture : tryConvert(tempreture, toCelsius)

    return (
      <>
        <TempInput 
          scale='c'
          tempreture={celsius}
          onTempretureChange={this.handleCelsiusChange}
          />
         
        <TempInput 
          scale="f" 
          tempreture={fahrenheit}
          onTempretureChange={this.handleFahrenheitChange} 
          />
      </>
    );
  }
}



ReactDOM.render(<Converter />, document.getElementById("root"));
