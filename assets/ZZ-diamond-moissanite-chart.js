var ChartManager = ({
  initialize: function() {
    this.chartData = {
                       labels: ["Moissanite", "Diamond"],
                       datasets: [{
                         backgroundColor: ["#2E394F", "#EAEAEB"],
                         data: [1000, 5000]
                       }]
                     };
    this.ctx = document.getElementById("cost-chart").getContext("2d");
    this.drawn = false;
    
    var that = this;
    $(window).scroll(function() {
      var hT = $('#cost-chart').offset().top,
          hH = $('#cost-chart').outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
      if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
        that.render();
      }
    });
  },
  
  render: function() {
    if (this.drawn === false) {
      Chart.defaults.global.animation.duration = 1500;
      this.chart = new Chart(this.ctx, {
        responsive:true,
        type: 'bar',
        data: this.chartData,
        options: {
          tooltips: {
               enabled: false
          },
          legend: {
            "display": false
          },
          scales: {
            xAxes: [{
              gridLines: {
                           display:false
                         },
              barPercentage: 0.4,
              categoryPercentage: 1.6,
              ticks: {
                fontStyle: 'normal',
                fontSize: 15
              }
            }],
            yAxes: [{
              gridLines: {
                           drawBorder: false,
                           display:false
                         },
              barPercentage: 0.6,
              ticks: {
                       max: 6000,
                       display: false,
                       beginAtZero: true
                     }
            }]
          },
          "animation": {
            "onProgress": function() {
              var chartInstance = this.chart,
                c = chartInstance.ctx;
              c.font = Chart.helpers.fontString(18, 'normal', Chart.defaults.global.defaultFontFamily);
              c.textAlign = 'center';
              c.textBaseline = 'bottom';

              this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  var data = dataset.data[index];
                  c.fillStyle = "#808284";
                  c.fillText("$" + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), bar._model.x, bar._model.y - 5);
                });
              });
            }
          },
        }
      });
    }
    
    this.drawn = true;
  }
});

ChartManager.initialize();

