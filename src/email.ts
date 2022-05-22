import mail from '@sendgrid/mail';
import env from './env';

mail.setApiKey(env.SENDGRID_API_KEY);

export const sendComicEmail = async (title: string, comicImages: string[]): Promise<void> => {
  await mail
    .send({
      to: env.EMAIL_ADDRESS,
      from: env.EMAIL_ADDRESS,
      subject: title,
      html: generateHTML(title, comicImages),
    })
    .catch(err => {
      console.error(err.response.data);
      throw 'Error sending email';
    });
};

const generateHTML = (title: string, images: string[]): string => {
  let html = `<h2>${title}</h2>\n`;
  html += images.map(img => `<div><img src="${img}"></div>`).join('\n');
  return html;
};
