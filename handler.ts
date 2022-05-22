import { checkLatestAndNotify } from './src';

export const run = async () => {
  try {
    const notified = await checkLatestAndNotify();
    const body = notified ? 'Notification sent!' : 'No new comic to send.';
    return {
      statusCode: 200,
      body,
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: String(e),
    };
  }
};
