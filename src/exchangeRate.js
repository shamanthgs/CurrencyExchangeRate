import cheerio from 'cheerio';
import axios from 'axios';

// const URL = 'https://www.remitly.com/ca/en/india/pricing';
const URL = 'https://www.remitly.com/ca/en/india';

export const getPageWithExchangeRate = (url) => axios.get(URL);

export const getExchangeRate = async () => {
  const {data: pageWithExchangeRate} = await getPageWithExchangeRate(URL);
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
