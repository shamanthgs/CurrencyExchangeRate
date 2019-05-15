import puppeteer from "puppeteer";
import cheerio from "cheerio";
const url = "https://www.remitly.com/ca/en/india/pricing";

const getExchangeRateFromRemitly = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pageWithExchangeRate = await page.content();
  const $ = cheerio.load(pageWithExchangeRate);
  const exchangeRate = $("table tbody tr")
    .eq(1)
    .find("td")
    .eq(1)
    .find("div")
    .eq(0)
    .text();
  await browser.close();
  return exchangeRate;
};

getExchangeRateFromRemitly().then(rate => console.log(rate));
