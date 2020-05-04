import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Heading extends Component {

  render () {
    return (
      <div className="heading">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
 export default Heading;
