const pup = require('puppeteer');
const path = require('path');
const commander = require('commander');
require('dotenv').config();

commander.version('1.0.0')
    .option('-o --out <outputFile>', 'Output file')
    .option('--lat <lat>', 'Lattitude', parseFloat, 0)
    .option('--lng <lng>', 'Longtitude', parseFloat, 0)
    .option('--zoom <zoom>', 'Zoom', parseFloat, 1)
    .option('--road-color <roadColor>', 'Road color', x => x, '#c6c6c6')
    .option('--water-color <waterColor>', 'Water color', x => x, '#ffffff')
    .option('--city-name <cityName>', 'City name')
    .option('--state-name <stateName>', 'State name')
    .parse(process.argv);

const fullpath = 'file:' + path.resolve('template.html');

let outputPath = path.resolve(commander.out);

const pupOptions = {
    headless: true,
    defaultViewport: {
        width: 3600,
        height: 5400,
        deviceScaleFactor: 0.5
    }
};

function getApiKey() {
    return process.env.MAPS_KEY;
}

function getOptions() {
    return {
        center: {
            lat: commander.lat,
            lng: commander.lng
        },
        zoom: commander.zoom,
        roadColor: commander.roadColor,
        waterColor: commander.waterColor,
        cityName: commander.cityName,
        stateName: commander.stateName
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