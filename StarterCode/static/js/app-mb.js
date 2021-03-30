// Level 1 -- Create the bar chart


  
  // 5. Create your trace.
  var trace = {
    x: sample_values,
    y: otu_ids,
    type: "bar"
  };
  
  // 6. Create the data array for our plot
  var data = [trace];
  
  // 7. Define our plot layout
  var layout = {
    title: "The TOP TEN OTUs",
    xaxis: { title: "Title" },
    yaxis: { title: "OTUs"}
  };
  
  // 8. Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
  