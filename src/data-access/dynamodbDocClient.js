import aws from 'aws-sdk';
import { env } from '../env';
import { isProduction } from '../util';

// aws.config.update({ region: env.awsRegion });

const defaultOptions = { apiVersion: 'latest' };

const options = isProduction
  ? defaultOptions
  : { ...defaultOptions, endpoint: env.dynamodbEndpoint };

const dynamodbDocClient = new aws.DynamoDB.DocumentClient(options);

export { dynamodbDocClient };
