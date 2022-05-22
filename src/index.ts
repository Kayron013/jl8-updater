import { sendComicEmail } from './email';
import { sendComicText } from './text';
import { getLatestComic } from './tumblr';
import { uploadImages } from './imgur';

const main = async () => {
  const comic = await getLatestComic();
  // Uploading images to another host because Tumblr sometimes returns the image embedded in a webpage.
  const imgUrls = await uploadImages(comic.images);
  await sendComicEmail(imgUrls);
  console.log('Email sent!');
  await sendComicText(comic.title, imgUrls);
  console.log('Text sent!');
};

main();
