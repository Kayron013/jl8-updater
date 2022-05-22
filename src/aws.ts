import AWS from 'aws-sdk';
import env from './env';
import { Comic } from './interfaces';

const s3 = new AWS.S3();
const bucketParams = {
  Bucket: env.S3_BUCKET_NAME,
  Key: env.S3_BUCKET_KEY,
};

export const getLastReadComic = async (): Promise<Comic> => {
  const data = await s3
    .getObject(bucketParams)
    .promise()
    .catch(err => {
      console.error(err);
      throw 'Error retrieving last read comic from S3';
    });

  if (!data.Body) {
    return {
      id: '',
      title: '',
      images: [],
    };
  }

  const body = JSON.parse(data.Body.toString());
  return body;
};

export const setLastReadComic = async (comic: Comic): Promise<void> => {
  await s3
    .putObject({
      ...bucketParams,
      Body: JSON.stringify(comic),
    })
    .promise()
    .catch(err => {
      console.error(err);
      throw 'Error setting last read comic in S3';
    });
};
