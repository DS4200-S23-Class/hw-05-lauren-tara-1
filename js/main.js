// Set frame constants
const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// append the svg object to the body of the page
const FRAME1 = d3.select("#scatter")
  .append("svg")
    .attr("width", FRAME_WIDTH + MARGINS.left + MARGINS.right)
    .attr("height", FRAME_HEIGHT + MARGINS.top + MARGINS.bottom)
  .append("g")
    .attr("transform",
          "translate(" + MARGINS.left + "," + MARGINS.top + ")");


//Read the data
d3.csv("data/scatter-data.csv", function(data) {

  // Add X axis
  const x_a = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, FRAME_WIDTH ]);
  FRAME1.append("g")
    .attr("transform", "translate(0," + FRAME_HEIGHT + ")")
    .call(d3.axisBottom(x_a));

  // Add Y axis
  const y_a = d3.scaleLinear()
    .domain([0, 10])
    .range([ FRAME_HEIGHT, 0]);
  FRAME1.append("g")
    .call(d3.axisLeft(y_a));

  // Add points
  FRAME1.append('g')
    .selectAll("points")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", (d) => { return (d + MARGINS.left); } ) // i think this is why the points aren't showing
      .attr("cy", (d) => { return (d + MARGINS.right); } ) // and this
      .attr("r", 1.5)
      .attr("class", "point")

});

