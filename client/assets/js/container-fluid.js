import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Uml from './uml'
import ValuesForm from './valuesForm'
import UmlStyler from './umlStyler'
import Network from './network'
import Plot1 from './plot1'
import Plot2 from './plot2'



class Container extends Component {

  render () {
    return (
      <div className="container-fluid">
        <div className="row big-row">
          <div className="col-5">
            <Uml />
          </div>
          <div className="col-4">
            <div className="row">
              <Plot1 />
            </div>
            <div className="row">
              <Plot2 />
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              <ValuesForm formTitle="UML Generator" elements={['Abstract', 'Interface', 'Library','All']}/>
            </div>
            <div className="row">
              <UmlStyler />
            </div>
            <div className="row">
              <Network />
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
