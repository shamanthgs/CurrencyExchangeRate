const addExchangeRate = ({ dbClient, exchangeRate }) => {};

const getExchangeRates = async ({ dbClient }) => {
  const params = {
    ExpressionAttributeValues: {
      ':p': 'cad_inr_07_21',
    },
    KeyConditionExpression: 'partitionKey = :p',
    TableName: 'currency-exchange-rate',
  };

  const results = await dbClient.query(params).promise();
  console.log(results.Items);
};

export { addExchangeRate, getExchangeRates };
