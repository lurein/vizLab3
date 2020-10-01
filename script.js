var cities;

d3.csv('cities.csv', d3.autoType).then(data=>{
    console.log('cities', data);
    cities = data;
    var filteredCities = data;
    cities = cities.filter(city => city.eu === true);
    console.log('cities', cities);
    d3.select('.city-count').text(cities.length + " cities");
    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append("g")
    svg.append('g')
        .selectAll("dot")
        .data(cities)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return d.x; } )
            .attr("cy", function (d) { return d.y; } )
            .attr("r", 8)
            .attr("r", function (d) { 
                if (d.population < 1000000) {
                    return 4;
                } else {
                    return 8;
                }
            })
    svg.append('g')
        .selectAll("labels")
        .data(cities)
        .enter()
        .append("text")
            .attr("x", function (d) { return d.x; } )
            .attr("y", function (d) { return d.y; } )
            .text( function (d) {
                if (d.population >= 1000000) {
                    return d.city;
                } else {
                    return "";
                }
            })
            .attr("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dx", "30")
})

var buildings;
d3.csv('buildings.csv', d3.autoType).then(data=>{ 
    console.log(data)
    var buildings = data;
    buildings.sort(function(a, b) {
		return parseFloat(b.height_ft) - parseFloat(a.height_ft);
	});
    const barChartWidth = 500;
    const barChartHeight = 500;
    const barSVG = d3.select('.bar-chart')
            .append('svg')
            .attr('width', barChartWidth)
            .attr('height', barChartHeight)
            .append("g")
    barSVG.append('g')
        .selectAll('bar')
        .data(buildings)
        .enter()
        .append("rect")
            .attr("width", "70")
            .attr("height", function (d) { return d.height_px; } )
            .attr("x", function (d, i) { 
                return (i * 70); 
            } )
            .attr("y", function (d) { return 500 - d.height_px; } )
    barSVG.append('g')
            .selectAll("labels")
            .data(buildings)
            .enter()
            .append("text")
                .attr("x", function (d, i) { 
                    return (i * 70); 
                } )
                .attr("y", function (d) { return 500 - d.height_px; } )
                .text(function (d) { return d.building; } )
                .attr("font-size", "11px")
                .attr("dy", "-15")
})


