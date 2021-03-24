import { getExchangeRate, getExchangeRateUsingPuppeteer } from './exchangeRate';
import chromium from 'chrome-aws-lambda';
import { sendSMS } from './smsClient';

export const handler = async (event, context, callback) => {
  let result = 'result';
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  try {
    // const exchangeRate = await getExchangeRate();
    const exchangeRate = await getExchangeRateUsingPuppeteer({
      browser: browser,
    });
    const smsMessage = `Currently 1 CAD$ = ${exchangeRate}`;
    // await sendSMS({ message: smsMessage, phoneNumber: process.env.DEVPHONENO });
  } catch (error) {
    // return callback(error);
    console.log(error, 'Error occured while delivering exchange rate');
  } finally {
    if (browser !== null) {
      console.log('attempting to close the pages and the browser');
      const pages = await browser.pages();
      await Promise.all(pages.map((page) => page.close()));
      await browser.close();
    }
  }

  // return callback(null, result);
};

handler();
