import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Option extends Component {

  render () {

    return (
      <div>
        <input type={this.props.type} name={this.props.name} id={this.props.id} value={this.props.value} className="checkmark"/>
        <label htmlFor={this.props.id}>{this.props.value}</label>

        {
          /*Option is a component which creates a input + label (used in the options form)*/
        }

      </div>
    );
  }
}
 export default Option;
