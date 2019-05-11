import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

const url = 'https://www.remitly.com/ca/en/india/pricing';

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => page.goto(url).then(() => page.content()))
  .then(html => {
    const $ = cheerio.load(html);
    console.log(
      $('table tbody tr')
        .eq(1)
        .find('td')
        .eq(1)
        .find('div')
        .eq(0)
        .text()
    );
  });
// console.log(html);
