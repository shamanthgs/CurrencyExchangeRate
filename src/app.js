import { getExchangeRateUsingPuppeteer } from './exchangeRate';
import chromium from 'chrome-aws-lambda';
import { sendSMS } from './smsClient';
import { env } from './env';
import { isProduction } from './util';

export const handler = async (event, context, callback) => {
  let result = 'result';
  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const exchangeRate = await getExchangeRateUsingPuppeteer({
      browser: browser,
    });
    const smsMessage = `Currently 1 CAD$ = ${exchangeRate}`;
    if (isProduction()) {
      await sendSMS({ message: smsMessage, phoneNumber: env.phoneNumber });
    }
    console.log(smsMessage);
  } catch (error) {
    console.log(error, 'Error occured while delivering exchange rate');
  } finally {
    if (browser !== null) {
      const pages = await browser.pages();
      await Promise.all(pages.map((page) => page.close()));
      await browser.close();
    }
  }
};
