// Set variables
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// Beginning with scatterplot
const FRAME1 = d3.select("#scatter")
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
                      .range([VIS_HEIGHT, 0]); 


    // Add points
    FRAME1.selectAll("points")  
        .data(data) 
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE3(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE3(d.y) + MARGINS.top); }) 
          .attr("r", 4)
          .attr("class", "point");

    // Add an x-axis to the vis  
    FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 

    // Add a y-axis to the vis  DOESNT WORK WAHHHHHHH
    FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.top +
              "," + (VIS_HEIGHT + MARGINS.right) + ")") 
        .call(d3.axisLeft(Y_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 
});


// Now starting bar graph
const FRAME2 = d3.select("#bar")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


// Open file
d3.csv("data/bar-data.csv").then((data) => { 
    const MAX_X2 = d3.max(data, (d) => { return parseInt(d.amount); });
    
    // Define scale functions that maps our data values 
    // (domain) to pixel values (range)
    const X_SCALE2 = d3.scaleLinear() 
                      .domain([0, (MAX_X2 + 10)]) // add some padding  
                      .range([0, VIS_WIDTH]);
      
    // const X_SCALE2 = d3.scaleBand().range ([0, FRAME_WIDTH]).padding(0.4),
    // const Y_SCALE2 = d3.scaleLinear().range ([FRAME_HEIGHT, 0]);

    // Use X_SCALE to make bars
    FRAME2.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rect")  
          .attr("x", (d) => { return (X_SCALE3(d.value) + MARGINS.left); }) 
          .attr("y", MARGINS.top) 
          .attr("r", 4)
          .attr("class", "bar");

    // Add an axis to the vis  
    FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE2).ticks(4)) 
          .attr("font-size", '20px'); 


});





