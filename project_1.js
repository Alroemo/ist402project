
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear().range([480, width]),
    y = d3.scale.linear().range([height-20,0]);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis().scale(x).orient("bottom");

var yAxis = d3.svg.axis().scale(y).orient("left");

var loyalty =[];

d3.csv("loyalty_data.csv", type, function(error, data) {
    loyalty = data;
    drawXY();
});

function drawXY(){

    x.domain([d3.min(loyalty, function(d) { return d.timestamp; }), d3.max(loyalty, function(d) { return d.timestamp; })]);
    y.domain([d3.min(loyalty, function(d) { return d.price; }), d3.max(loyalty, function(d) { return d. price; })]);

    var yPos = height;
    chart.append("g")
	   .attr("class", "xaxis")
	   .attr("transform", "translate(0," + yPos + ")")
	   .call(xAxis);

    chart.append("g")
	   .attr("class", "yaxis")
	   .attr("transform", "translate(50,0)")
	   .call(yAxis);
    
    chart.selectAll(".dot")
	   .data(loyalty)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.timestamp); })
	   .attr("cy", function(d) { return y(d.price); })
	   .attr("r", 2);
}

function type(d) {
    d.timestamp = +d.timestamp; // coerce to number
    d.location = +d.locationt; // coerce to number
    d.price = +d.price; // coerce to number
    d.FristName = +d.FristName; 
    d.LastName = +d.LastName;
    return d;
}




