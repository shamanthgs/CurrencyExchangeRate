import { parseExchangeRate } from '../exchangeRate';

describe('exchangeRate tests', () => {
  describe('parseExchangeRate', () => {
    it('should parse the exchange rate appropriately', () => {
      const dummyExchangeRate = '1 CAD = 56.85  58.25 INR express';
      const result = parseExchangeRate(dummyExchangeRate);
      expect(result).toEqual('56.85');
    });
  });
});
