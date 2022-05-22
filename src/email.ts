import mail from '@sendgrid/mail';
import env from './env';

mail.setApiKey(env.SENDGRID_API_KEY);

export const sendComicEmail = async (comicImages: string[]): Promise<void> => {
  await mail
    .send({
      to: env.EMAIL_ADDRESS,
      from: env.EMAIL_ADDRESS,
      subject: 'New Comic',
      html: imagesToHtml(comicImages),
    })
    .then(([res, body]) => {
      console.log({ res, body });
    });
};

const imagesToHtml = (images: string[]): string => {
  return images.map(img => `<div><img src="${img}"></div>`).join('\n');
};
