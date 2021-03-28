import cheerio from 'cheerio';
import { remitlyUser } from './user';

const URL = 'https://www.remitly.com/ca/en/india';
const LOGINURL = 'https://www.remitly.com/ca/en/users/login';
const LOGOUTURL = 'https://www.remitly.com/ca/en/users/logout';

export const getPageWithExchangeRate = (url) => '';

export const isValidateExchangeRate = (domText) =>
  domText.includes('CAD') && domText.includes('INR');

export const parseExchangeRate = (domText) => {
  if (!isValidateExchangeRate(domText)) {
    return null;
  }
  return domText.split(' ')[2];
};

export const getExchangeRateUsingHttp = async () => {
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
  const page = await browser.newPage();
  await page.goto(LOGINURL);

  await page.type('input#loginEmailField', remitlyUser.userName);
  await page.type('input#loginPasswordField', remitlyUser.password);
  await page.click('form#login button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const pageWithExchangeRate = await page.content();
  const $ = cheerio.load(pageWithExchangeRate);

  // const expressExchangeRateDetails = $(
  //   'div[data-testid="product-EXPRESS"] .content > div'
  // ).text();
  const economyExchangeRateDetails = $(
    'div[data-testid="product-BASIC"] .content > div'
  ).text();

  await page.goto(LOGOUTURL);
  const exchangeRate = parseExchangeRate(economyExchangeRateDetails);

  return exchangeRate;
};
