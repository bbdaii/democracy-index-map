export function createMap(svg, mapData, projection, countryInfo) {
    const countries = topojson.feature(mapData, mapData.objects.countries);

    const mapPath = svg.selectAll('path')
        .data(countries.features);

    const pathGenerator = d3.geoPath()
        .projection(projection)


    let enlargedTaiwanArea;
    mapPath.enter().append('path')
        .attr('class', 'country')
        .attr('d', d => pathGenerator(d))
        .attr("fill", "#ccc")
        .append('title').text(d => {
            const country = countryInfo.find(country => country.n3 === d.id);
            return country ? country.name : null;
        }
        )
        .each(function (d) {
            const country = countryInfo.find(country => country.n3 === d.id);
            if (country && country.name === 'R.O.C (Taiwan)') {
                enlargedTaiwanArea = createEnlargedClickArea(svg, projection, d);
            }
        });



    // mapPath.each(function (d) {
    //     const country = countryInfo.find(country => country.n3 === d.id);
    //     if (country && country.name === 'R.O.C (Taiwan)') {
    //         enlargedTaiwanArea = createEnlargedClickArea(svg, projection, d);
    //         console.log("test")
    //     }
    // });
}

function createEnlargedClickArea(svg, projection, d) {
    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(d);

    svg.append("circle")
        .attr("cx", bounds[0][0] +6)
        .attr("cy", bounds[0][1] + 8)
        .attr('r', 15)
        .style("fill", "transparent")
        // .style("stroke", "black")
        .style("pointer-events", "all")
        .style("z-index", "500")
}

