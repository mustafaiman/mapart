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
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [
                        {
                            visibility: 'off'
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
        document.getElementById('city-name').innerText=options.cityName;
        document.getElementById('state-name').innerText=options.stateName
    })
}