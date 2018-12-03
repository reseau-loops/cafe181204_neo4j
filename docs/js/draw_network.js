function drawNetwork(divId, nodes, edges, options, showConfigure=false,divIdConfigure="configure"){
  
      var container = document.getElementById(divId)

      var data = {
        nodes: nodes,
        edges: edges
      };

      var options = {
          configure: {
            enabled: showConfigure,
            filter: ['layout','physics'],
            container: document.getElementById(divIdConfigure),
            showButton: true
          },
          nodes: {
              shape: 'dot',
              size: 25,
              font: {
                  size: 14
              }
          },
          edges: {
              font: {
                  size: 14,
                  align: 'middle'
              },
              color: 'gray',
              arrows: {
                  to: {enabled: true, scaleFactor: 0.5}
              },
              smooth: {enabled: false}
          },
          physics: options['physics'],
          layout:  options['layout']
      };

      var network = new vis.Network(container, data, options);
}


function defaultDrawNetwork(divId, nodes, edges,) {
  options = {
          physics: {
              enabled: true,
              barnesHut: {
                  centralGravity: 0.01,
                  springLength: 55
                  },
              minVelocity: 0.75
          }
    };
  drawNetwork(divId, nodes, edges, options)
}

