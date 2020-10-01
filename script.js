var cities;

d3.csv('cities.csv', d3.autoType).then(data=>{
    console.log('cities', data);
    cities = data;
    var filteredCities = data;
    cities = cities.filter(city => city.eu === true);
    console.log('cities', cities);
    d3.select('.city-count').text(cities.length);
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