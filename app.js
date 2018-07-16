
var w = 800,
h = 400,
bar_size = w/275;

var tooltip = d3.select("body").append("div")
.attr("id", "tooltip")
.style("opacity", 0);

var Graphic =  d3.select('.container')
.append('svg')
.attr('width', w + 120)
.attr('height', h + 60);

var requestURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

$(document).ready(function(){
    $.getJSON(requestURL, function(data){
      
Graphic.append('text')
.attr('transform', 'rotate(-90)')
.attr('x', -250)
.attr('y', 16)
.style('font-size',25)      
.text('Gross Product');

var xScale = d3.scaleLinear()
.domain([1947,2015])
.range([0, w]);

var xAxis = d3.axisBottom()
.scale(xScale)
.tickFormat(d3.format("d"));

var xAxisGroup = Graphic.append('g')
.attr('id', 'x-axis')
.attr('transform', 'translate(60, 400)')
.call(xAxis);
  
var global_min = d3.min(data.data.map((e)=> e[1]));
var global_max = d3.max(data.data.map((e)=> e[1]));
var raz=(global_min/global_max);
    
var linearScale = d3.scaleLinear()
.domain([global_min, global_max])
.range([raz* h, h]);

var scaledGDP = data.data.map((e) => linearScale(e[1]))

var yAxisScale = d3.scaleLinear()
.domain([global_min, global_max])
.range([h, raz * h]);

var yAxis = d3.axisLeft(yAxisScale)

var yAxisGroup = Graphic.append('g')

.attr('id', 'y-axis')
.attr('transform', 'translate(60, 0)')
.call(yAxis);
      
d3.select('svg').selectAll('rect')
.data(scaledGDP)
.enter()
.append('rect')
.attr('data-date', (d, i)=> data.data[i][0])
.attr('data-gdp', (d, i)=> data.data[i][1])
.attr('class', 'bar')
.attr('x', (d, i)=> i * bar_size)
.attr('y', (d, i)=> h - d)
.attr('width', bar_size)
.attr('height', (d, i)=>  d)
.style('fill', 'red')
.attr('transform', 'translate(60, 0)')
      
.on('mouseover', function(d, i) {
  
  d3.select(this).style("fill", "white");

  tooltip.transition()
          .duration(100)
          .style('opacity', .9);

  tooltip.html(data.data[i][0] + '<br>' + data.data[i][1] + ' Billion of dollars')
          .attr('data-date', data.data[i][0])
          .style('left', (i * bar_size) + 30 + 'px')
          .style('top', h+100+"px")
          .style('transform', 'translateX(60px)');

})
.on('mouseout', function(d,i) {

  d3.select(this).style("fill", "red")
   tooltip.transition()
          .duration(100)
          .style('opacity', 0);
});

});

});

