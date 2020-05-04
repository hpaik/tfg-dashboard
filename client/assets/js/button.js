import React, { Component} from 'react'
import ReactDOM from 'react-dom'


class Button extends Component {


  render () {

    return (
        <button type="button" className={this.props.classType}>
          {this.props.text}
        </button>
    );
  }
}
 export default Button;
