var map1;

// ITINERARY STYLES
var itinerario1Style = {
    "color": "#264653",
    "weight": 5,
    "opacity": 0.9
};
var itinerario2Style = {
    "color": "#2a9d8f",
    "weight": 5,
    "opacity": 0.9
};
var itinerario3Style = {
    "color": "#8ab17d",
    "weight": 5,
    "opacity": 0.9
};
var itinerario4Style = {
    "color": "#f4a261",
    "weight": 5,
    "opacity": 0.9
};
var itinerario5Style = {
    "color": "#e76f51",
    "weight": 5,
    "opacity": 0.9
};
var ciclistaStyle = {
    "color": "black",
    "weight": 3, dashArray: '10, 10', dashOffset: '2',
    "opacity": 0.6
};


// ON LOAD
$(function () {
    map1 = L.map('map1');
    map1.setView([42.219936, 3.095649], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | CrÃ©ditos: Parc dels Aiguamolls de lâ€™EmpordÃ '
    }).addTo(map1);

    //add the park limits
    var park = $.ajax({
        url: "geo/parque.geojson",
        dataType: "json",
        success: console.log("Park data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Default Stripes.
    var stripes = new L.StripePattern();
    stripes.addTo(map1);

    $.when(park).done(function () {
        console.log('park downloaded')
        L.geoJSON(park.responseJSON, {
            // onEachFeature: onEachFeature,

            style: function (feature) {
                switch (feature.properties.party) {
                    case 'Republican': return { color: "#ff0000" };
                    case 'Democrat': return { color: "#0000ff" };
                    default: return {
                        color: "#0f0",
                        dashArray: '3',
                        weight: 2,
                        fillOpacity: 0.07,
                        fillPattern: stripes

                    };

                }
            }
        }).addTo(map1);

    });

    // ITINERARIO 1
    var itinerario1 = $.ajax({
        url: "geo/itinerario1.geojson",
        dataType: "json",
        success: console.log("itinerario1 data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(itinerario1).done(function () {
        console.log('itinerario 1 downloaded')
        let i1 = L.geoJSON(itinerario1.responseJSON, { style: itinerario1Style }).addTo(map1);
        var itinerario1Icon = L.divIcon({ className: 'itinerario itinerario1', html: '<button i="1">Itinerario&nbsp;1</button>' });
        L.marker([42.21846, 3.09536], { icon: itinerario1Icon }).addTo(map1);
        // i1.setText('itinerario 1', {center: true, repeat:false, below:true,offset:10, attributes:{fill:'red'}});
    });

    // ITINERARIO 2
    var itinerario2 = $.ajax({
        url: "geo/itinerario2.geojson",
        dataType: "json",
        success: console.log("itinerario2 data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(itinerario2).done(function () {
        console.log('itinerario2 downloaded')
        L.geoJSON(itinerario2.responseJSON, { style: itinerario2Style }).addTo(map1);

        var itinerario2Icon = L.divIcon({ className: 'itinerario itinerario2', html: '<button i="2">Itinerario&nbsp;2</button>' });
        L.marker([42.20850, 3.10062], { icon: itinerario2Icon }).addTo(map1);

    });
    // ITINERARIO 3
    var itinerario3 = $.ajax({
        url: "geo/itinerario3.geojson",
        dataType: "json",
        success: console.log("itinerario3 data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(itinerario3).done(function () {
        console.log('itinerario3 downloaded')
        L.geoJSON(itinerario3.responseJSON, { style: itinerario3Style }).addTo(map1);
        var itinerario3Icon = L.divIcon({ className: 'itinerario itinerario3', html: '<button i="3">Itinerario&nbsp;3</button>' });
        L.marker([42.22040, 3.11522], { icon: itinerario3Icon }).addTo(map1);

    });
    // ITINERARIO 4
    var itinerario4 = $.ajax({
        url: "geo/itinerario4.geojson",
        dataType: "json",
        success: console.log("itinerario4 data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(itinerario4).done(function () {
        console.log('itinerario4 downloaded')
        L.geoJSON(itinerario4.responseJSON, { style: itinerario4Style }).addTo(map1);
        var itinerario4Icon = L.divIcon({ className: 'itinerario itinerario4', html: '<button i="4">Itinerario&nbsp;4</button>' });
        L.marker([42.23695, 3.09828], { icon: itinerario4Icon }).addTo(map1);

    });
    // ITINERARIO 5
    var itinerario5 = $.ajax({
        url: "geo/itinerario5.geojson",
        dataType: "json",
        success: console.log("itinerario5 data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(itinerario5).done(function () {
        console.log('itinerario5 downloaded')
        L.geoJSON(itinerario5.responseJSON, { style: itinerario5Style }).addTo(map1);
        var itinerario5Icon = L.divIcon({ className: 'itinerario itinerario5', html: '<button i="5">Itinerario&nbsp;5</button>' });
        L.marker([42.19595, 3.09945], { icon: itinerario5Icon }).addTo(map1);

    });
    // CICLISTA
    var ciclista = $.ajax({
        url: "geo/ciclista.geojson",
        dataType: "json",
        success: console.log("ciclista data successfully loaded."),
        error: function (xhr) {
            alert(xhr.statusText)
        }
    })
    // Specify that this code should run once the county data request is complete
    $.when(ciclista).done(function () {
        console.log('ciclista downloaded')
        let pc = L.geoJSON(ciclista.responseJSON, { style: ciclistaStyle }).addTo(map1);
        pc.setText('ðŸš²     ', { center: true, repeat: true, below: true, offset: 12, attributes: { fill: 'red', 'font-size': '18' } });


    });




});

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.Name) {
        let html = `<b>${feature.properties.Name}</b>`
        if (feature.properties.icon != null) {
            html = html + `<img src="img/${feature.properties.icon}">`
        }
        layer.bindPopup(html, {
            maxWidth: "auto"
        });
    }
}

$(document).on('click', '.itinerario button', function (e) {
    console.log(e)
    console.log($(e.target).attr('i'))
    window.location.href = 'itinerarios.html?i='+$(e.target).attr('i')
});
