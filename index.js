const puppeteer = require('puppeteer');
const awaitTo = require('async-await-error-handling');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const { timeout, writeFileSync } = require('./utils');

const spinner1 = ora({
    color: 'yellow'
});

const spinner2 = ora({
    color: 'yellow'
});

const provinces = require('./provinces')['86'];
const pcodes = [];
const target = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/#{route}.html';

let cities = [];

if (fs.existsSync(path.resolve(__dirname, 'cities.js'))) {
    cities = require('./cities.js');
}

let areas = [];
let url = '';
let type = 0; // 0：抓取市级数据 1：抓取升级数据

// 当前正在抓取的目标
let curCity = '';
let curPCode = '';

Object.keys(provinces).forEach(code => {
    if (code !== '710000' && code !== '910000') {
        // 过滤掉港澳台
        pcodes.push(code.slice(0, 2));
    }
});

async function getCitiesByPCode (page, pcode) {
    url = target.replace('#{route}', pcode);
    const parentCode = `${pcode}0000`;

    await page.goto(url);

    spinner1.text = chalk.blue(`正在抓取${provinces[parentCode]}的市级数据：${url}`);

    cities = await page.evaluate((parentCode, cities) => {
        const list = [...document.querySelectorAll('.citytable .citytr')];

        if (!list.length) {
            console.log(`\n\n省份 ${provinces[parentCode]} 下没有市级数据\n\n`);
        }

        list.forEach(el => {
            const t = el.innerText.split('\t');
            cities.push({
                code: t[0], 
                text: t[1],
                parentCode: parentCode
            });
        });
        return cities;
    }, parentCode, cities);
}

async function getAreasByCCode (page, city) {
    url = target.replace('#{route}', `${city.code.slice(0, 2)}/${city.code.slice(0, 4)}`);
    await page.goto(url);

    spinner2.text = chalk.blue(`正在抓取 ${provinces[city.parentCode]}/${city.text} 的县区数据：${url}`);

    areas = await page.evaluate((city, areas) => {
        const list = [...document.querySelectorAll('.countytable .countytr')];

        if (!list.length) {
            console.log(`\n\n市级 ${city.text} 下没有县区数据\n\n`);
        }

        list.forEach(el => {
            const t = el.innerText.split('\t');
            areas.push({
                code: t[0], 
                text: t[1],
                parentCode: `${city.code}`
            })
        });
        return areas;
    }, city, areas);
}

process.on('unhandledRejection', (err) => {
    console.log('\n', chalk.red(`抓取数据失败，失败链接: ${url}\n`), err.message);
    process.exit(1);
});

(async () => {
    spinner1.start(chalk.blue('开始抓取市区数据....'));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if (!cities.length) {
        for(let i = 0, l = pcodes.length; i < l; i++) {
            const pcode = pcodes[i];
            await timeout(1500);
            const [err] = await awaitTo(getCitiesByPCode(page, pcode));
            if (err) {
                // 这个重试主要是处理因避免耗时(Navigation Timeout Exceeded)导致的错误
                console.log('\n', chalk.red(`抓取数据失败，失败链接: ${url}，错误信息: ${err.message}，正在重试....\n`));
                await getCitiesByPCode(page, pcode);
            }
        }
        writeFileSync('cities.js', cities);
        spinner1.succeed(chalk.green('市区数据抓取完毕，开始抓取县区数据....'));
    } else {
        spinner1.succeed(chalk.green('市区数据已经抓取过，开始抓取县区数据....'));
    }

    type = 1;
    console.log('\n');
    spinner2.start(chalk.blue('正在抓取县区数据....'));

    for(let i = 0, l = cities.length; i < l; i++) {
        const city = cities[i];
        await timeout(3000);
        const [err] = await awaitTo(getAreasByCCode(page, city));
        if (err) {
            // 这个重试主要是处理因避免耗时(Navigation Timeout Exceeded)导致的错误
            console.log('\n', chalk.red(`抓取数据失败，失败链接: ${url}，错误信息: ${err.message}，正在重试....\n`));
            await getAreasByCCode(page, city);
        }
    }

    writeFileSync('areas.js', areas);
    spinner2.succeed(chalk.green('县区数据抓取完毕'));

    await browser.close();
})();