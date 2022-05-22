import 'dotenv/config';

export default {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  FROM_NUMBER: process.env.FROM_NUMBER || '',
  TO_NUMBER: process.env.TO_NUMBER || '',
  TUMBLR_CONSUMER_KEY: process.env.TUMBLR_CONSUMER_KEY || '',
  TUMBLR_CONSUMER_SECRET: process.env.TUMBLR_CONSUMER_SECRET || '',
  IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID || '',
  IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET || '',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
  S3_BUCKET_KEY: process.env.S3_BUCKET_KEY || '',
};
