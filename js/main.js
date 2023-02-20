// Set variables
const FRAME_HEIGHT = 300;
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

function build_interactive_scatter() {
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
            .attr("r", 6)
            .attr("class", "point");

      // Add x-axis to the vis  
      FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE3).ticks(4)) 
          .attr("font-size", '20px'); 

      // Add y-axis to the vis
      FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left +
              "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE3).ticks(4)) 
            .attr("font-size", '20px'); 

      const TOOLTIP = d3.select("#scatter")
                          .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

      // Change color by hovering
      function handleMouseover(event, d) {
        // on mouseover, change color
        TOOLTIP.style("opacity", 1);
      }

      // Revert to original color 
      function handleMouseleave(event, d) {
        // on mouseleave, make transparent again
        TOOLTIP.style("opacity", 0);
      }


      // Paste clicked points into the right column
      function getPoints(d){
        point = d.getAttribute("data-value");
        point_str = point + "/n"
        paragraph= document.getElementById('p');
        paragraph.append(point_str);
      }

      function handleMouseclick(event, d) {
        TOOLTIP.html(getPoints(this));
      }

      // Event Listeners
      FRAME3.selectAll(".point")
            .on("mouseover", handleMouseover) //add event listeners
            .on("mouseleave", handleMouseleave)
            .on("mouseclick", handleMouseclick); 

    });
}

build_interactive_scatter();

// Now starting bar graph
const FRAME2 = d3.select("#bar")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

function build_interactive_bar() {
  // Open file
  d3.csv("data/bar-data.csv").then((data) => { 
   
    const X_SCALE2 = d3.scaleBand()
                .range([0, VIS_WIDTH])
                 .domain(data.map(function(d) {return d.category;}));

    const Y_MAX = d3.max(data, (d) => { return parseInt(d.amount); });

      // Add an X axis to the vis  
    FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE2).ticks(4)) 
          .attr("font-size", '20px'); 
[ ]

    // add a Y axis to the vis

    const Y_SCALE2 = d3.scaleLinear()
                .range([VIS_HEIGHT, 0])
                .domain([0,Y_MAX]);


     FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left +
              "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(4)) 
            .attr("font-size", '20px');

     // Use X_SCALE to make bars
    FRAME2.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return X_SCALE2(d.category) + MARGINS.left; })
        .attr("width", X_SCALE2.bandwidth())
        .attr("y", function(d) { return Y_SCALE2(d.amount) + MARGINS.bottom; })
        .attr("height", function(d) { return VIS_HEIGHT - Y_SCALE2(d.amount);})
        .attr("class", "bar");
  
////// highlight bars when u hover
        
      const TOOLTIP2 = d3.select("#bar")
                          .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

      // Change color by hovering
      function handleMouseover2(event, d) {
        // on mouseover, change color
        TOOLTIP2.style("opacity", 1);
      }

      FRAME2.selectAll(".bar")
            .on("mouseover", handleMouseover2); //add event listeners

});}

build_interactive_bar()