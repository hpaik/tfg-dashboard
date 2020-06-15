import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Button from './button.js'
import OptionDisplayer from './optionDisplay.js'
class UmlStyler extends Component {

  getInput(){
    let userInput = document.getElementById("contractSearch").value;
    return userInput;
  }

  selectContract(){
    let contract = `#${this.getInput()}`;
    return contract;
  }

  findContract() {
    d3.select(this.selectContract()).select("polygon").attr("fill", "red");

  }
  clearSearch() {
    d3.select(this.selectContract()).select("polygon").attr("fill", "#f2f2f2");
  }

  render () {

    return (
      <div>
        <OptionDisplayer title="Diagram Interactivity" options={['Select Element']}/>
        <div className="input-group md-form form-sm form-2 pl-0">
          <input  id="contractSearch" className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" />
        </div>
        <button onClick={this.findContract.bind(this)} type="button" className="btn btn-success">Find!</button>
        <button onClick={this.clearSearch.bind(this)} type="button" className="btn btn-danger">Clear</button>
      </div>
    );
  }
}
 export default UmlStyler;
