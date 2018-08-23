const pup = require('puppeteer');
const path = require('path');
const commander = require('commander');
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
        deviceScaleFactor: 0.5
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
        stateName: city.stateName
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