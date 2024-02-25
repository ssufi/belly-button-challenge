// Define function to initialize the page
function init() {
    // Use D3 to read in the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Populate the dropdown with Test Subject IDs
      var dropdown = d3.select("#selDataset");
      data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value", name);
      });
  
      // Call the functions to create the charts and display metadata for the first ID
      optionChanged(data.names[0]);
    });
  }
  
  // Define function to handle dropdown change
  function optionChanged(selectedID) {
    // Use D3 to read in the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      // Filter data based on the selected ID
      var selectedData = data.samples.filter((sample) => sample.id === selectedID)[0];
      var metadata = data.metadata.filter((meta) => meta.id == selectedID)[0];
  
      // Update the bar chart
      updateBarChart(selectedData);
  
      // Update the bubble chart
      updateBubbleChart(selectedData);
  
      // Update the demographic information
      updateDemographicInfo(metadata);
    });
  }
  
  // Define function to update the bar chart
  function updateBarChart(selectedData) {
    // Select the bar chart container
    var barChartContainer = d3.select("#bar");
  
    // Clear the existing chart
    barChartContainer.html("");
  
    // Extract necessary data
    var sampleValues = selectedData.sample_values.slice(0, 10).reverse(); // Top 10 sample values
    var otuIDs = selectedData.otu_ids.slice(0, 10).reverse(); // Top 10 OTU IDs
    var otuLabels = selectedData.otu_labels.slice(0, 10).reverse(); // Top 10 OTU labels
  
    // Create trace for the bar chart
    var trace = {
      x: sampleValues,
      y: otuIDs.map(id => `OTU ${id}`),
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };
  
    // Create data array for the plot
    var data = [trace];
  
    // Define layout
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
  
    // Use Plotly to create the chart
    Plotly.newPlot("bar", data, layout);
  }
  
  // Define function to update the bubble chart
  function updateBubbleChart(selectedData) {
  
    // Select the bubble chart container
    var bubbleChartContainer = d3.select("#bubble");
  
    // Clear the existing chart
    bubbleChartContainer.html("");
  
    // Extract necessary data
    var otuIDs = selectedData.otu_ids;
    var sampleValues = selectedData.sample_values;
    var otuLabels = selectedData.otu_labels;
  
    // Create trace for the bubble chart
    var trace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth'
      }
    };
  
    // Create data array for the plot
    var data = [trace];
  
    // Define layout
    var layout = {
      title: "Bubble Chart - OTU ID vs Sample Values",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Values" }
    };
  
    // Use Plotly to create the chart
    Plotly.newPlot("bubble", data, layout);
  }
  
  // Define function to update demographic information
  function updateDemographicInfo(metadata) {
    // Select the panel for demographic information
    var metadataPanel = d3.select("#sample-metadata");
  
    // Clear existing content
    metadataPanel.html("");
  
    // Update with new information
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    })
  };
  
  // Call the init function to initialize the page
  init();