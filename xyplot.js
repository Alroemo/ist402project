
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([50, width]),
    y = d3.scale.linear().range([height-20,0]);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis().scale(x).orient("bottom");

var yAxis = d3.svg.axis().scale(y).orient("left");

var cars=[];

d3.csv("cars.csv", type, function(error, data) {
    cars = data;
    drawXY();
});

function drawXY(){

    x.domain([d3.min(cars, function(d) { return d.year; }), d3.max(cars, function(d) { return d.year; })]);
    y.domain([d3.min(cars, function(d) { return d.power; }), d3.max(cars, function(d) { return d.power; })]);

    var yPos = height -20;
    chart.append("g")
	   .attr("class", "xaxis")
	   .attr("transform", "translate(0," + yPos + ")")
	   .call(xAxis);

    chart.append("g")
	   .attr("class", "yaxis")
	   .attr("transform", "translate(50,0)")
	   .call(yAxis);
    
    chart.selectAll(".dot")
	   .data(cars)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.year); })
	   .attr("cy", function(d) { return y(d.power); })
	   .attr("r", 3);
}

function type(d) {
    d.economy = +d.economy; // coerce to number
    d.displacement = +d.displacement; // coerce to number
    d.power = +d.power; // coerce to number
    d.weight = +d.weight; // coerce to number
    d.year = +d.year;
    return d;
}




