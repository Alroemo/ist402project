//Lauren Doutt Assignment 2


//The margins, width, and height of the chart are set
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 1900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

//Here the chart is made
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//This scales the x-axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

//This scales the y-axis
var y = d3.scale.linear()
    .range([height, 0]);

//Here the axis are defined and scaled
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	
//here is the array the data from loyalty_data.tsv is stored in
var bardata = [ ];

//this variable sets the current state of the graph to ascending, and will help fluctuate the graph's movement
var currstate= 1;

//The data from loyalty_data.svg is read and the chart is made
d3.csv("please.csv", type, function(error, data) {
 bardata= data;
 checkbardata= data;

    //X and Y's dimensions are set
    x.domain(data.map(function(d) { return d.FirstName; }));
    y.domain([0, d3.max(data, function(d) { return d.price; })]);

    //The x-axis is made and put in the bottom
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    //The y-axis is made
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

    //The bars are made
    chart.selectAll(".bar")
	   .data(data)
	   .enter().append("rect")
	   .attr("class", "bar")
	   .attr("x", function(d) { return x(d.FirstName); }) //this is the x-position
	   .attr("y", function(d) { return y(d.price); })//this is the y-position
	   .attr("height", function(d) { return height - y(d.price); })//Sets the sixe of the rectangle
	   .attr("width", x.rangeBand()); //The width is set


});


//the mouse down function responds when the user clicks the mouse
d3.select("svg")
.on("mousedown", function(){
	//the variables of where the user clicks
	var x=d3.mouse(this)[0]
	var y =d3.mouse(this)[1]

	//tests to see if the user clicks the x axis or below

	if(x>=40 || y<=0){
	//console.log("x"+ d3.mouse(this)[0] +"y"+d3.mouse(this)[1]);

	//checks to see if the current state is ascending
	if (currstate == 1){
	//change the bar data to descending in regards to the FirstName data
	bardata.sort(function(a,b) {return d3.descending(a.FirstName, b.FirstName)});
	//redraw the graph descending in regards to X
	redrawXDescending();
	//set the current state to 0
	currstate=0;
	}

	//checks to see if the current state is 0 (descending)
	else if(currstate == 0){

		//set the bardata to ascending in regards to the FirstName data
		bardata.sort(function(a,b) {return d3.ascending(a.FirstName, b.FirstName)});
		//redraw the graph ascending in regards to X
		redrawXAscending();
		//set the current state to 1 (so the program will descend next time)
		currstate=1;
	}




	}

	//test to see if the user clicked the y axis or over
	else if (x<=40 || y>=0){

		//tests to see if the currstate is 1
		if(currstate == 1){
		//sets the bar data into descending order in regards to price
		bardata.sort(function(a,b) {return d3.descending(a.price, b.price)});
		//redraws the graph descending in regards to y
		redrawYDescending();
		//sets the current state to 0 so the program ascends the data next time
		currstate=0;
		}
		//tests to see if the current state is 0
		else if(currstate==0){
		//sorts the bar data into ascending order in regards to price
		bardata.sort(function(a,b) {return d3.ascending(a.price, b.price)});
		//redraws the graph ascending in regards to Y
		redrawYAscending();
		//sets the current state to 1
		currstate=1;
		}



	}
}

);







//this function redraws the graph in descending order in regards to X
function redrawXDescending(){

	//sets the domain for x and y
	 x.domain(bardata.map(function(d) { return d.FirstName; }));
    y.domain([0, d3.max(bardata, function(d) { return d.price; })]);


 //the x-axis is made and put on the bottom
 //***this is where I had trouble. I couldnt find the function that erases the current X-axis labels,
 // Thats why my graph has x-labels made on top of each other
 // I looked on the internet for the functions and couldnt find the right one.
 //I kept accidently erasing the whole X-axis, so instead I just left the x-labels overlapping each other :( *****
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);


    //the y-axis is made
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

	   //the bars are made
chart.selectAll("rect")
		  .data(bardata)
		  .transition()
		  .duration(1000)
		  .attr("y", function (d) { return y(d.price); })//this is the y-position
		  .attr("x", function (d) {return x(d.FirstName); })//this is the x-posiion
		  .attr("height", function(d) { return height - y(d.price); })//sets the size of the rectangle
	   .attr("width", x.rangeBand());//the width is set
}

//this function redraws the graph in ascending order in regards to X
function redrawXAscending(){

	x.domain(bardata.map(function(d) { return d.FirstName; }));
    y.domain([0, d3.max(bardata, function(d) { return d.price; })]);

	 //the x-axis is made and put at the bottom
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    //the y-axis is made
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

	 //the bars are made
	chart.selectAll("rect")
		  .data(bardata)
		  .transition()
		  .duration(1000)
		  .attr("y", function (d) { return y(d.price); })//this is the y-position
		  .attr("x", function (d) {return x(d.FirstName); })//this is the x-position
		  .attr("height", function(d) { return height - y(d.price); })//Sets the size of the rectangle
	   .attr("width", x.rangeBand());// the width is set


}

//this function redraws the graph in descending order in regards to Y
function redrawYDescending(){
	 x.domain(bardata.map(function(d) { return d.FirstName; }));
    y.domain([0, d3.max(bardata, function(d) { return d.price; })]);

	 //makes the x-axis and puts it at the bottom
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    //makes the y-axis
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);

	   //makes the bars
chart.selectAll("rect")
		  .data(bardata)
		  .transition()
		  .duration(1000)
		  .attr("y", function (d) { return y(d.price); }) // this is the y-position
		  .attr("x", function (d) {return x(d.FirstName); })// this is the x-position
		  .attr("height", function(d) { return height - y(d.price); })//sets the size of the rectangle
	   .attr("width", x.rangeBand());//sets the width
}

//this function redraws the graph in ascending order in regards to Y
function redrawYAscending(){
		 x.domain(bardata.map(function(d) { return d.FirstName; }));
    y.domain([0, d3.max(bardata, function(d) { return d.price; })]);

	 //makes the x-axis and puts it at the bottom
    chart.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0," + height + ")")
	   .call(xAxis);

    //makes the y-axis
    chart.append("g")
	   .attr("class", "axis")
	   .call(yAxis);
//makes the bars
chart.selectAll("rect")
		  .data(bardata)
		  .transition()
		  .duration(1000)
		  .attr("y", function (d) { return y(d.price); })//this is the y-position
		  .attr("x", function (d) {return x(d.FirstName); })//this is the x-position
		  .attr("height", function(d) { return height - y(d.price); })//sets the size of the rectangle
	   .attr("width", x.rangeBand());//sets the width



}



function type(d) {
    d.price = +d.price; // Coerce to Number
    return d;
}
