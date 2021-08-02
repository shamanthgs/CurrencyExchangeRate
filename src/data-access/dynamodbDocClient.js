import aws from 'aws-sdk';
import { env } from '../env';
import { isProduction } from '../util';

aws.config.update({ region: env.awsRegion });

const awsCredentials = new aws.Credentials({
  accessKeyId: env.awsAccessKeyId,
  secretAccessKey: env.awsSecretAccessKey,
});
const defaultOptions = { apiVersion: 'latest', credentials: awsCredentials };

const options = isProduction()
  ? defaultOptions
  : { ...defaultOptions, endpoint: env.dynamodbEndpoint };

const dynamodb = new aws.DynamoDB(options);
const dynamodbDocClient = new aws.DynamoDB.DocumentClient(options);

export { dynamodbDocClient, dynamodb };
