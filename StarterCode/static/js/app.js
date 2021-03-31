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
      testNames.forEach((test) => {
          dropdownMenu
            .append("option")
            .text(test)
            .property("value", test);
          });

      // ---------------------------------------------------------------
      // Initialize display with first record
      // ---------------------------------------------------------------
      var defaultID = testNames[0];

      console.log(testNames[0])
      console.log(defaultID)
  
      fn_barChart(defaultID);
      fn_displayData(defaultID);

    });
   };

// ---------------------------------------------------------------------
// 2. Create a horizontal bar chart for selected Subject ID to display 
//      the top 1O OTUs found in that individual.
// ---------------------------------------------------------------------
  function fn_barChart(subjectId){
      d3.json('samples.json').then((data)=>{
          var samples = data.samples;
          var ID = samples.map(row=>row.id).indexOf(subjectId);
          var otuValueTen = samples.map(row=>row.sample_values);
          var otuValueTen = otuValueTen[ID].slice(0,10).reverse();
          var otuIdTen = samples.map(row=>row.otu_ids);
          var otuIdTen = otuIdTen[ID].slice(0,10);
          var otuLabelTen = samples.map(row=>row.otu_labels).slice(0,10);
          
          var trace={
              x: otuValueTen,
              y: otuIdTen.map(r=>`OTU ${r}  `),
              text: otuLabelTen,
              type:'bar',
              orientation:'h'
          }
          // ------------------------------------------
          // Setup chart layout with title & margins
          // ------------------------------------------
          var layout = {title: "Top 10 OTUs", margin: {t: 80, l: 175}};

          // ------------------------------------------
          // Display bar chart            
          // ------------------------------------------
          Plotly.newPlot('bar',[trace],layout);
      })
  };

// ------------------------------------------------------------------------------------
// 3. Create a bubble chart that displays each sample.   
// ------------------------------------------------------------------------------------
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
    var panelinfo = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
        panelinfo.html("");


    });

  });
} 

fn_initialize ();