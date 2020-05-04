import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Uml from './uml'
import ValuesForm from './valuesForm'
import UmlStyler from './umlStyler'

class Container extends Component {

  render () {
    return (
      <div className="container-fluid">
        <div className="row big-row">
          <div className="col-9">
            <Uml />
          </div>
          <div className="col-3">
            <div className="row">
              <ValuesForm formTitle="UML Generator" elements={['Abstract', 'Interface', 'Library']}/>
            </div>
            <div className="row">
              <UmlStyler />
            </div>
          </div>
        </div>
      </div>
    );
    {
      /*
        This component contains the main structure of the content area
        The html structure is specified, using other components.
      */
    }
  }
}
 export default Container;
