// Level 1
// Use the D3 library to read in samples.json.
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// ---------------------------------------------------------------
// Initialize display
// ---------------------------------------------------------------
// function init (){
//   var selector = d3.selectAll('#selDataset');

//   d3.json('samples.json').then((data)=>{
  
//       var sampleDataNames=data.names;
//       sampleDataNames.forEach((sample) => {
//           selector
//             .append("option")
//             .text(sample)
//             .property("value", sample);
//           });
    
//       var defaultID = sampleDataNames[0];
  
//       barChart(defaultID);
      
//     });
//    };
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Create a horizontal bar chart for selected Subject ID to display the top 1O OTUs 
// found in that individual
// ----------------------------------------------------------------------------
  function barChart(subjectID){

      d3.json('samples.json').then((data)=>{
          var dataSamples = data.samples;
          var sampleID = dataSamples.map(row=>row.id).indexOf(subjectId);
          var otuValueTopTen = dataSamples.map(row=>row.sample_values);
          var otuValueTopTen = otuValueTopTen[sampleID].slice(0,10).reverse();
          var otuIdTopTen = dataSamples.map(row=>row.otu_ids);
          var otuIdTopTen = otuIdTopTen[sampleID].slice(0,10);
          var otuLabelTopTen = dataSamples.map(row=>row.otu_labels).slice(0,10);
          
          var trace={
              x: otuValueTopTen,
              y: otuIdTopTen.map(r=>`UTO ${r}`),
              text: otuLabelTopTen,
              type:'bar',
              orientation:'h'
          }

          // Define plot layout
          var layout = {
            title: "The TOP TEN OTUs",
            xaxis: { title: "Title" },
            yaxis: { title: "OTUs"}
          };
    
         Plotly.newPlot('bar',[trace],layout);
      })
  };

