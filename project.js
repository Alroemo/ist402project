var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


	
	
	var parseDate= d3.time.format("%m/%d/%Y_%H%M").parse;
	


	x = d3.time.scale().range(0, width),
    y = d3.scale.linear().range([height-20,0]);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y).orient("left");

var ccinfo=[];

d3.csv("cc_data.csv", type, function(error, data) {
    ccinfo = data;
	data.forEach(function (d){
		d.date =d3.time.format("%m/%d/%Y_%H%M").parse;
	//d.date=parseDate(d.date);
		//d.close = +d.close;
	});
    drawXY();
	console.log(data);
});

function drawXY(){
	

   x.domain([d3.min(ccinfo, function(d) { return d.date; }), d3.max(ccinfo, function(d) { return d.date; })]);
 
    y.domain([d3.min(ccinfo, function(d) { return d.price; }), d3.max(ccinfo, function(d) { return d.price; })]);

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
	   .data(ccinfo)
	   .enter().append("circle")
	   .attr("class", "dot")
	   .attr("cx", function(d) { return x(d.date); })
	   .attr("cy", function(d) { return y(d.price); })
	   .attr("r", 3);
}

function type(d) {
   
    d.price = +d.price; // coerce to number
    d.date = +d.date;
    return d;
}
