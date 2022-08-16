const pup = require('puppeteer');
const path = require('path');
const fs = require('fs');
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
let outputDir = path.dirname(commander.out);
fs.mkdirSync(outputDir, { recursive: true});

const pupOptions = {
    headless: true,
    defaultViewport: {
        width: 3600,
        height: 5400,
        deviceScaleFactor: 1
    }
};

function getApiKey() {
    return process.env.MAPS_KEY;
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
        center: {
            lat: city.lat,
            lng: city.lng
        },
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

(async () => {
    const browser = await pup.launch(pupOptions);
    const page = await browser.newPage();
    await page.setUserAgent('maparter');
    await page.exposeFunction('getApiKey', getApiKey);
    await page.exposeFunction('getOptions', getOptions);
    await page.goto(fullpath, { waitUntil: 'networkidle2'});
    await page.screenshot({fullPage: true, path: outputPath});
    await browser.close();
})();