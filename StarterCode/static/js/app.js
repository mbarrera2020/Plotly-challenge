// Level 1
// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs 
//      found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// ---------------------------------------------------------------
// 1. Use the D3 library to read in data from 'samples.json' file.
// Note:  From index.html, select id="selDataset" 
// ---------------------------------------------------------------
function fn_initialize(){
  var dropdownMenu = d3.selectAll('#selDataset');

  d3.json('samples.json').then((data)=>{
  
      var testNames=data.names;
      testNames.forEach((test) => {dropdownMenu
            .append("option")
            .text(test)
            .property("value", test);
          });

      // ---------------------------------------------------------------
      // Initialize display with first record
      // ---------------------------------------------------------------
      var defaultID = testNames[0];

      // Test / display data
      console.log(defaultID)
  
      fn_barChart(defaultID);
      fn_displayData(defaultID);

    });
   };

// ---------------------------------------------------------------------
// 2. Create a horizontal bar chart for selected Subject ID to display 
//      the top 1O OTUs found in that individual.
// ---------------------------------------------------------------------
  function fn_barChart(subjectID){
      d3.json('samples.json').then((data)=>{
          var samples = data.samples;
          // Test / display data
          console.log(samples)
  
          var ID = samples.map(row=>row.id).indexOf(subjectID);
          // Test / display data
          console.log(ID)

          // Use otu_ids as the labels for the bar chart.
          var otuID = samples.map(row=>row.otu_ids);
          var otuIDTopTen = otuID[ID].slice(0,10);

          console.log(otuIDTopTen)

          // Use sample_values as the values for the bar chart.
          var sampleValue = samples.map(row=>row.sample_values);
          var sampleValueTopTen = sampleValue[ID].slice(0,10).reverse();
          
          // Use otu_labels as the hovertext for the chart.
          var otuLabelTopTen = samples.map(row=>row.otu_labels).slice(0,10);
          
          var trace={
              x: sampleValueTopTen,
              y: otuIDTopTen,
              text: otuLabelTopTen,
              type:'bar',
              orientation:'h'
          }
          // ------------------------------------------
          // Setup chart layout with title & margins
          // ------------------------------------------
          var layout = {
            title: "Top 10 OTUs",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs"},
            margin: {t: 80, l: 175}
          };

          // ------------------------------------------
          // Display bar chart            
          // ------------------------------------------
          Plotly.newPlot('bar',[trace],layout);
      })
  };

// ------------------------------------------------------------------------------------
// 3. Create a bubble chart that displays each sample.   
// ------------------------------------------------------------------------------------
// function fn_bubbleChart(subjectID)
//  <insert code here for bubble chart>



// ------------------------------------------------------------------------------------
// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// ------------------------------------------------------------------------------------
function fn_displayData(subjectID) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the selected ID number 
    var filteredData = metadata.filter(object => object.id == subjectID);
    var result = filteredData[0];
    
    // Use d3 to select the panel with id of `#sample-metadata`
    // example:  "metadata":[{"id": 940, "ethnicity": "Caucasian", 
    //   "gender": "F", "age": 24.0, "location": "Beaufort/NC", "bbtype": "I", "wfreq": 2.0}

    var panelInfo = d3.select("#sample-metadata");
    // Test / display data
    console.log(panelInfo)

    // Clear any existing metadata
    panelInfo.html("");

    // Add key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      // panelInfo.append("h6").text(`${key.toUpperCase()}: ${value}`);
      panelInfo.append().text(`${key}: ${value}`);
    });

  });
} 

// ------------------------------------------------------------------------------------
// 6.  Update all of the plots any time that a new sample is selected. 
// ------------------------------------------------------------------------------------
function fn_optionChanged(newSelection) {
  fn_displayData(newSelection);
  fn_barChart(newSelection);
};

fn_initialize ();