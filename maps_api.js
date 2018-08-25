function initMap() {
    getOptions().then(function (options) {
        var map = new google.maps.Map(document.getElementById('map-frame'), {
            center: options.center,
            zoom: options.zoom,
            disableDefaultUI: true,
            styles: [
                {
                    featureType: 'administrative',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'all',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'all',
                    stylers: [
                        {
                            color: options.landscapeColor
                        }
                    ]
                },
                {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [
                        {
                            visibility: 'off'
                        }
                    ]
                },
                {
                    featureType: 'road',
                    elementType: 'all',
                    stylers: [
                        {
                            color: options.roadColor
                        }
                    ]
                },
                {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [
                        {
                            color: options.waterColor
                        }
                    ]
                }
            ]
        });
        document.getElementById('long-lat').innerText=options.center.lat + '\u00B0 ' + options.center.lng + '\u00B0'
        document.getElementById('long-lat').style.color=options.lightTextColor;
        document.getElementById('city-name').innerText=options.cityName;
        document.getElementById('city-name').style.color=options.darkTextColor;
        document.getElementById('state-name').innerText=options.stateName;
        document.getElementById('state-name').style.color=options.darkTextColor;
        document.getElementById('whole-frame').style.backgroundColor=options.waterColor;
    })
}