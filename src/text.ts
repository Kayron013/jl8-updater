import twilio from 'twilio';
import env from './env';

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export const sendComicText = async (title: string, comicImages: string[]): Promise<void> => {
  await client.messages.create({
    from: env.FROM_NUMBER,
    to: env.TO_NUMBER,
    body: title,
  });

  // Order of media is not guaranteed when sent in a single message.
  for (const image of comicImages) {
    await client.messages.create({
      from: env.FROM_NUMBER,
      to: env.TO_NUMBER,
      mediaUrl: image,
    });

    // Message order is not guaranteed when sent in a short period of time.
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }
};
