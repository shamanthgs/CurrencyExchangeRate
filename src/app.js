import { getExchangeRate } from './exchangeRate';
import { sendSMS } from './smsClient';

const handle = async () => {
  try {
    const exchangeRate = await getExchangeRate();
    const smsMessage = `Currently 1 CAD$ = ${exchangeRate}`
    await sendSMS({ message: smsMessage, phoneNumber: process.env.DEVPHONENO });
  } catch (error) {
    console.log('Error occured while delivering exchange rate', error);
  }
}

handle();
