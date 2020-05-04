import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Uml from './uml'


class Column extends Component {

  render () {
    return (
      <div className={`col-${ this.props.size }`}>
        {this.props.innerChild}
        {
          /*this.props.size determine the boostrap styling size of the column
          this.props.innerChild refers to any other Component/Components to be appended*/
        }

      </div>
    );
  }
}
 export default Column;
