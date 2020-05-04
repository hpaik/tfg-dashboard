import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Column from './column'
import Uml from './uml'
class Row extends Component {

  render () {
    const items = [];

    for (const [index, value] of this.props.sizes.entries()) {
      items.push(<Column key={index} size={value} innerChild={this.props.innerChilds[index]} />)
    }
    {
      /*
        // warning: It is not being used at the moment
        we create as many columns inside the Parent passes
        items[] contains the Child Component for each Column
      */
    }

    return (
      <div className={`row ${this.props.rowclass}`}>
        {items}
      </div>
    );
  }
}
 export default Row;
