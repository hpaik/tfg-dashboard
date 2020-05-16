import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Button from './button.js'
import OptionDisplayer from './optionDisplay.js'
const abiDecoder = require('abi-decoder');

class Network extends Component {

  getInput(){
    let userInput = document.getElementById("sourceData").value;
    return userInput;
  }

  addAbi(_abi) {
    abiDecoder.addABI(_abi);
  }

  getMethodsFromUML() {
    let obj = [];
    let data = d3.select("#uml").select("svg").selectAll("g");
      //all contracts
    data._groups.forEach(d=>{
      d.forEach(function(element){
        //each of the elements
        obj[element.id] = element.textContent;
      });
    });
    return obj;
  }

  findMethodInUML(_method) {
    let _obj = this.getMethodsFromUML();
    let result = [];
    Object.keys(_obj).forEach(function(data){
      if(_obj[data].search(_method) >= 0){
        result.push(data)
      }
    });
    return result[2];
  }

  methodNumberOfCalls(_data) {
    let _mapping = new Map();
    let contractMethods = [];
    let obj = {};

    for (var i = 0; i < _data.length; i++) {
      let decodedData = abiDecoder.decodeMethod(`0x${_data[i].input_hex}`).name;
      //array containing the methods parsed
      if(!(contractMethods.includes(decodedData))) {
        contractMethods.push(decodedData);
        _mapping.set(decodedData, 0);
      }else {
        _mapping.set(decodedData, _mapping.get(decodedData)+1);
      }
    }
    contractMethods.forEach(function(d){
      obj[d] = _mapping.get(d);
    });
    return obj;
  }

  async getAbi(){
    let result = [];
    try {
      const response = await fetch("abi.json");
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('JSON parsed successfully...');
        for(var i in jsonResponse){
          result.push(jsonResponse[i]);
        }
      return result;
      }

    } catch(error) {
        console.log(error);
    }
  }

  drawBarChart(_data, _htmlId) {
    // set the dimensions and margins of the graph
    var color = d3.scaleOrdinal()
      .domain(Object.keys(_data))
      .range(d3.schemeDark2);
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var tooltip = d3.select("body")
      	.append("div")
      	.style("position", "absolute")
      	.style("z-index", "10")
      	.style("visibility", "hidden")
        .style("color", "white")
        .style("background-color", "black")
        .style("border-radius", "6px")
        .style("padding", "5px 5px 5px 5px")


    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1)


    var y = d3.scaleLinear()
              .range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    d3.select(_htmlId).html("");
    var svg = d3.select(_htmlId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


      var data = _data;
      // Scale the range of the data in the domains
      x.domain(Object.keys(data).map(function(d) { return d; }));
      y.domain([0, d3.max(Object.values(data))]);



      // append the rectangles for the bar chart
      Object.keys(data).forEach(function(key){
        svg.append("rect")
            .attr("class", "bar")
            .attr("x", x(key))
            .attr("width", x.bandwidth())
            .attr("y", y(data[key]))
            .attr("height", height - y(data[key]))
            .attr("id", key)
            .attr("fill", color(key))
            .on("mouseover", function(d){

              tooltip.text(`Function: ${key}() | Number of calls: ${data[key]}`);
              return tooltip.style("visibility", "visible")
            })
            .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
      });
      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
            .text("")
      // add the y Axis
      svg.append("g")
          .call(d3.axisLeft(y));


  }

  drawPieChart(_width, _height, _margin, _htmlId, _data,_radius) {
    //create object from mapping
    // set the dimensions and margins of the graph
    var width = _width
    var height = _height
    var margin = _margin
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    //var radius = Math.min(width, height) / 2 - margin
    var radius = _radius

    // append the svg object to the div called 'my_dataviz'
    d3.select(_htmlId).html("");
    var svg = d3.select(_htmlId)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("max-width", width)
        .attr("max-height", height)
        /*.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");*/
        .attr("transform", "translate(200,200)");

    // Create dummy data
    // set the color scale
    var tooltip = d3.select("body")
  	.append("div")
  	.style("position", "absolute")
  	.style("z-index", "10")
  	.style("visibility", "hidden")
    .style("color", "white")
    .style("background-color", "black")
    .style("border-radius", "6px")
    .style("padding", "5px 5px 5px 5px")


    var color = d3.scaleOrdinal()
      .domain(Object.keys(_data))
      .range(d3.schemeDark2);
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .sort(null) // Do not sort group by size
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(_data))
    // The arc generator
    var arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8)
    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .on("mouseover", function(d){

        tooltip.text(`Function: ${d.data.key}() | Number of calls: ${d.data.value}`);
        return tooltip.style("visibility", "visible")
      })
    	.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
    	.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
      .attr("id", function(d){return d.data.key})
      .attr('d', arc)
      .attr('fill', function(d){ return(color(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

    // Add the polylines between chart and labels:
    /*svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          var posA = arc.centroid(d) // line insertion in the slice
          var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          var posC = outerArc.centroid(d); // Label position = almost the same as posB
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })*/

    // Add the polylines between chart and labels:
    /*svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
        .text( function(d) { return `${d.data.key}(${d.data.value})` } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })*/
  }

  relateToUml(_methods) {
    _methods.forEach(element=>{
      let p = d3.selectAll(`#${element}`);
      p.on("click", ()=>{
        let id = this.findMethodInUML(element);
        let contract = d3.select("#uml").select(`#${id}`).select("polygon");
        if(id === 'Not found'){};
        if(contract.attr("fill") === "red"){
          contract.attr("fill","#f2f2f2");
        }else {
          contract.attr("fill","red");
        }

      })
    });
  }

  getData() {

    this.getAbi().then(data =>{
      this.addAbi(data)
    }).then(()=>{
      d3.csv("data.csv").then(data => {
        return this.methodNumberOfCalls(data);
      }).then(data => {
        this.drawPieChart(410, 400, 0, "#plot1", data, 200);
        this.drawBarChart(data, "#plot2");
        this.relateToUml(Object.keys(data));

      });
    });

  }



  render () {

    return (
      <div>
        <OptionDisplayer title="Network analysis" options={['Method calls', 'Method costs', 'Greeting']}/>
        <div className="input-group md-form form-sm form-2 pl-0">
          <input  id="sourceData" className="form-control my-0 py-1 red-border" type="text" placeholder="Add PATH to source data" aria-label="Search" />
        </div>
        <button onClick={this.getData.bind(this)} type="button" className="btn btn-success">Graph</button>
      </div>
    );
  }
}
 export default Network;
