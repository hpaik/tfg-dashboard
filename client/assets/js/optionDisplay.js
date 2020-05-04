import React, { Component} from 'react'
import ReactDOM from 'react-dom'
class OptionDisplayer extends Component {

  render () {
    const items = [];
    for (const [index, value] of this.props.options.entries()) {
      items.push(<option key={index} value={value}>{value}</option>)
    }
    return (
      <div id="optionDisplayer">
        <h3>{this.props.title}</h3>
        <label htmlFor="options">Choose an option:</label>
        <select id="options" className="browser-default custom-select">
          {items}
        </select>
        <br></br>
      </div>
    );
    {
      /*
      These component is composed of different options for the user to select
      when interacting with the UML diagram
      */
    }
  }
}
 export default OptionDisplayer;
