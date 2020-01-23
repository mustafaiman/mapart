const pup = require('puppeteer');
const path = require('path');
const commander = require('commander');
const gps = require('gps-util');
require('dotenv').config();

commander.version('1.0.0')
    .option('-o --out <outputFile>', 'Output file')
    .option('--city <city>', 'JSON file describing the city')
    .parse(process.argv);

const fullpath = 'file:' + path.resolve('template.html');
const city = require(path.resolve(commander.city));

let outputPath = path.resolve(commander.out);

const pupOptions = {
    headless: true,
    defaultViewport: {
        width: 3600,
        height: 5400,
        deviceScaleFactor: 1
    }
};

function getApiKey() {
    return process.env.MAP_BOX_API_KEY;
}

function getOrDefault(param, defaultValue) {
    if (param !== undefined) {
        return param;
    } else {
        return defaultValue;
    }
}

function getOptions() {
    return {
        lat: city.lat,
        lng: city.lng,
        zoom: city.zoom,
        roadColor: getOrDefault(city.roadColor, '#c6c6c6'),
        waterColor: getOrDefault(city.waterColor, '#ffffff'),
        cityName: city.cityName,
        stateName: city.stateName,
        landscapeColor: getOrDefault(city.landscapeColor, '#eeeeee'),
        lightTextColor: getOrDefault(city.lightTextColor, '#dddddd'),
        darkTextColor: getOrDefault(city.darkTextColor, '#777777'),
        dmsLng: gps.getDMSLongitude(city.lng),
        dmsLat: gps.getDMSLatitude(city.lat)
    };
}

function initMap(mapLoadContext) {
    mapboxgl.accessToken = mapLoadContext.accessToken;
    options = mapLoadContext.options;
    var map = new mapboxgl.Map({
        container: 'map-frame', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [options.lng, options.lat], // starting position [lng, lat]
        zoom: options.zoom // starting zoom
    });
    map.on('load', emitMapLoaded); // emitMapLoaded is defined in template.html
    document.getElementById('long-lat').innerText=options.dmsLat + ' ' + options.dmsLng;
    document.getElementById('long-lat').style.color=options.lightTextColor;
    document.getElementById('city-name').innerText=options.cityName;
    document.getElementById('city-name').style.color=options.darkTextColor;
    document.getElementById('state-name').innerText=options.stateName;
    document.getElementById('state-name').style.color=options.darkTextColor;
    document.getElementById('whole-frame').style.backgroundColor=options.waterColor;
}

function createMapLoadContext() {
    return {
        accessToken: getApiKey(),
        options: getOptions()
    };
}

async function onMapLoaded(page, browser) {
    await page.screenshot({fullPage: true, path: outputPath});
    await browser.close();
}

(async () => {
    const browser = await pup.launch(pupOptions);
    const page = await browser.newPage();
    await page.setUserAgent('maparter');
    await page.exposeFunction('initMap', initMap);
    await page.exposeFunction('onMapLoaded', onMapLoaded.bind(this, page, browser));
    await page.goto(fullpath, { waitUntil: 'domcontentloaded'});
    await page.evaluate(initMap, createMapLoadContext());
})();