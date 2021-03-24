import cheerio from 'cheerio';
// import axios from 'axios';
import puppeteer from 'puppeteer';

// const URL = 'https://www.remitly.com/ca/en/india/pricing';
const URL = 'https://www.remitly.com/ca/en/india';
const LOGINURL = 'https://www.remitly.com/ca/en/users/login';

// export const getPageWithExchangeRate = (url) => axios.get(URL);
export const getPageWithExchangeRate = (url) => '';

export const getExchangeRate = async () => {
  const { data: pageWithExchangeRate } = await getPageWithExchangeRate(URL);
  console.log(pageWithExchangeRate);
  const $ = cheerio.load(pageWithExchangeRate);
  const exchangeRate = $('table tbody tr')
    .eq(1)
    .find('td')
    .eq(1)
    .find('div')
    .eq(0)
    .text();
  return exchangeRate;
};

export const getExchangeRateUsingPuppeteer = async ({ browser }) => {
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  const pageWithExchangeRate = await page.content();

  const $ = cheerio.load(pageWithExchangeRate);
  const exchangeRate = $('table tbody tr')
    .eq(1)
    .find('td')
    .eq(1)
    .find('div')
    .eq(0)
    .text();
  // await browser.close();
  console.log('getExchangeRateUsingPuppeteer -> exchangeRate', exchangeRate);
  return exchangeRate;
};
