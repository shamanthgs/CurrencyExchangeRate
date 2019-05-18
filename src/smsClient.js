import aws from "aws-sdk";

export const sendSMS = async ({ message, phoneNumber }) => {
  aws.config.update({ region: 'us-west-2' });
  const params = {
    Message: message,
    PhoneNumber: phoneNumber
  };
  const messageId = await new aws.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise();

  console.log('SMS delivered! Message ID: ', messageId);
}