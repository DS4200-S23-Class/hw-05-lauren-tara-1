// Set variables
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME3 = d3.select("#scatter")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Open file
d3.csv("data/scatter-data.csv").then((data) => { 

    const MAX_X3 = d3.max(data, (d) => { return parseInt(d.x); });
    const MAX_Y3 = d3.max(data, (d) => { return parseInt(d.y); });
    
    const X_SCALE3 = d3.scaleLinear() 
                      .domain([0, (MAX_X3 + 1)]) 
                      .range([0, VIS_WIDTH]); 

    const Y_SCALE3 = d3.scaleLinear() 
                      .domain([0, (MAX_Y3 + 1)]) 
                      .range([0, VIS_HEIGHT]); 

    // Add points
    FRAME3.selectAll("points")  
        .data(data) 
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE3(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE3(d.y) + MARGINS.top); }) 
          .attr("r", 4)
          .attr("class", "point");

    // Add an x-axis to the vis  
    FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 

    // Add a y-axis to the vis  DOESNT WORK WAHHHHHHH
    FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.top + 
              "," + (VIS_WIDTH + MARGINS.left) + ")") 
        .call(d3.axisLeft(Y_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 
});





