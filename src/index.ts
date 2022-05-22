import { sendComicText } from './text';
import { getLatestComic } from './tumblr';
import { uploadImages } from './imgur';
import { getLastReadComic, setLastReadComic } from './aws';

export const checkLatestAndNotify = async (): Promise<boolean> => {
  const lastReadComic = await getLastReadComic();
  const latestComic = await getLatestComic();

  if (lastReadComic.id === latestComic.id) {
    return false;
  }

  // Uploading images to another host because Tumblr sometimes returns the image embedded in a webpage.
  const imgUrls = await uploadImages(latestComic.images);

  // prettier-ignore
  await Promise.all([
    setLastReadComic(latestComic),
    sendComicText(latestComic.title, imgUrls),
  ]);

  return true;
};
