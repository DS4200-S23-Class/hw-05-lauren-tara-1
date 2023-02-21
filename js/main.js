// Set variables
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 600; 
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

      const MAX_X1 = d3.max(data, (d) => { return parseInt(d.x); });
      const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.y); });
      const X_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_X1 + 1)]) 
                        .range([0, VIS_WIDTH]); 

      const Y_SCALE1 = d3.scaleLinear() 
                        .domain([0, (MAX_Y1 + 1)]) 
                        .range([VIS_HEIGHT, 0]); 

      // Add points
      FRAME1.selectAll("points")  
          .data(data) 
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE1(d.x) + MARGINS.left); }) 
            .attr("cy", (d) => { return (Y_SCALE1(d.y) + MARGINS.top); }) 
            .attr("r", 6)
            .attr("class", "point");

      // Add x-axis to the vis  
      FRAME1.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE1).ticks(4)) 
            .attr("font-size", '20px'); 

      // Add y-axis to the vis
      FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left +
              "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE1).ticks(4)) 
            .attr("font-size", '20px'); 

      // Create a border when data point is clicked on
      function mouseClick() {
        this.classList.toggle("addBorder");
        this.classList.toggle("point");

        let x_var = (this.getAttribute("cx") / 50) - 1;
        let y_var = (370 - this.getAttribute("cy")) / 50;

        let lastPoint1 = "Last point clicked: "
        let lastPoint2 = "(" + x_var + "," + y_var + ")"

        document.getElementById("point1").innerHTML = lastPoint1;
        document.getElementById("point2").innerHTML = lastPoint2;     
      }

      let points = document.getElementsByTagName("circle");

      for (let i = 0; i < points.length; i++) {
        let point = points[i];
        point.addEventListener("click", mouseClick);
      }

      // Plot point from user-given coordinates
      function addPoint() {
        let xVal = document.getElementById("x-coord");
        let yVal = document.getElementById("y-coord");

        let x = xVal.value;
        let y = yVal.value;

        let xFinal = (x * 50);
        let yFinal = 370 - (y * 50);

        FRAME1.append("circle")
              .attr("cx", (xFinal + MARGINS.left))
              .attr("cy", (yFinal))
              .attr("r", 6)
              .attr("class", "point");

        for (let i = 0; i < points.length; i++) {
          let point = points[i];
        point.addEventListener("click", mouseClick);
          }
        }

        let clickButton = document.getElementById("subButton");
        clickButton.addEventListener("click", addPoint);

      });



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

    // add a Y axis to the vis
    const Y_SCALE2 = d3.scaleLinear()
                .range([VIS_HEIGHT, 0])
                .domain([0,Y_MAX + 20]);

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
  
      // Highlight bars when you hover
      const TOOLTIP2 = d3.select("#bar")
                          .append("div")
                            .attr("class", "tooltip")
                            .style("opacity", 0);

      // Change color by hovering
      function handleMouseover2(event, d) {
        // on mouseover, change color
        TOOLTIP2.style("opacity", 1);
      }

      // Show value of each bar with tooltip
      function handleMousemove(event, d) {
      TOOLTIP2.html("Category: " + d.category + "<br>Amount: " + d.amount)
              .style("left", (event.pageX + 10) + "px")                                          
              .style("top", (event.pageY - 50) + "px"); 
      }

      function handleMouseleave(event, d) {
        TOOLTIP2.style("opacity", 0);
      }


      FRAME2.selectAll(".bar")
            .on("mouseover", handleMouseover2) 
            .on("mousemove", handleMousemove)
            .on("mouseleave", handleMouseleave); //add event listeners

});}

build_interactive_bar()