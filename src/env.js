export const env = {
  phoneNumber: process.env.DEV_PHONE_NO,
  remitlyUserName: process.env.REMITLY_USERNAME,
  remitlyUserPassword: process.env.REMITLY_USERPASSWORD,
  nodeEnv: process.env.NODE_ENV || 'dev',
  awsRegion: process.env.AWS_REGION || 'us-west-2',
  dynamodbEndpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000/',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY || 'local',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS || 'local',
  exchangeRateTableName:
    process.env.EXCHANGE_RATE_TABLE_NAME || 'exchangeRates',
};
