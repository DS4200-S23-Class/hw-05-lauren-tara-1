// Set frame constants
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};


const FRAME1 =  
d3.select("#scatter")
  .append("svg") 
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");


FRAME1.append("circle")
        .attr("cx", 4)
        .attr("cy", 4)
        .attr("r", 4)
        .attr("class", "firstCircle");

d3.csv("")