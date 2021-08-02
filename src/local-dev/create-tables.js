import { dynamodb } from '../data-access/dynamodbDocClient';
import colors from 'colors';
import { env } from '../env';

const ensureTables = async () => {
  const lsitTablesResponse = await dynamodb.listTables().promise();
  if (lsitTablesResponse.TableNames.includes(env.exchangeRateTableName)) {
    console.log(
      colors.green(
        lsitTablesResponse.TableNames,
        'Currency Exchange Rate tables found.'
      )
    );
    return;
  }
  console.log(
    colors.green(
      lsitTablesResponse.TableNames,
      'Currency Exchange Rate tables not found. Creating...'
    )
  );
  const exchangeRateTableParams = {
    TableName: env.exchangeRateTableName,
    KeySchema: [
      { AttributeName: 'partitionKey', KeyType: 'HASH' },
      { AttributeName: 'sortKey', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'partitionKey', AttributeType: 'S' },
      { AttributeName: 'sortKey', AttributeType: 'S' },
    ],
    //below has no effect when running dynamodb locally
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };
  await dynamodb.createTable(exchangeRateTableParams).promise();
};

ensureTables();
