import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Option from './option'
import Button from './button'


class ValuesForm extends Component {


  handleClickSvg () {
    let userInput = document.getElementById("insertName").value;
    d3.xml(rawData).then(data => {
      d3.select("#uml").html("");
      d3.select("#uml").node().append(data.documentElement);
      d3.select("svg").attr("id", "svgUml");
      let svgElement = document.getElementById("svgUml");
      let panZoomTiger = svgPanZoom(svgElement);
    });
  }
  getData (){
    let userInput = document.getElementById("insertName").value;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
      console.log(xhr.response);
      d3.select("#uml").html("");
      d3.select("#uml").append('div').html(xhr.response);
      d3.select("svg").attr("id", "svgUml");
      let svgElement = document.getElementById("svgUml");
      let panZoomTiger = svgPanZoom(svgElement);
    });
    xhr.open('GET', `http://localhost:8080/?address=${userInput}`);
    xhr.send();
  }

  render () {

    const items = [];
    for (const [index, value] of this.props.elements.entries()) {
      items.push(<Option key={value} type="checkbox" id={value} name={value} value={this.props.elements[index]} />)
    }
    return (
      <div id="valuesForm">
        <h3>{this.props.formTitle}</h3>
        <div className="input-group md-form form-sm form-2 pl-0">
          <input  id="insertName" className="form-control my-0 py-1 red-border" type="text" placeholder="Insert Address / absolute PATH" aria-label="Search" />
        </div>
        <form>
          {items}
        </form>
        <br></br>
        <button onClick={this.getData.bind(this)} type="button" className="btn btn-primary">Generate Diagram!</button>
      </div>
    );
  }
}
 export default ValuesForm;
