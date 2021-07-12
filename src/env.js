export const env = {
  phoneNumber: process.env.DEV_PHONE_NO,
  remitlyUserName: process.env.REMITLY_USERNAME,
  remitlyUserPassword: process.env.REMITLY_USERPASSWORD,
  nodeEnv: process.env.NODE_ENV || 'dev',
  awsRegion: process.env.AWS_REGION || 'us-west-2',
  dynamodbEndpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000/',
};
