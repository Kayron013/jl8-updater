import puppeteer from 'puppeteer';

export const getLatestComicImages = async (): Promise<string[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://jl8comic.tumblr.com/archive');
  await page.waitForSelector('.NGc5k', { timeout: 1000 });

  const latestComicUrl = await page.evaluate(getLatestComicUrl);
  await page.goto(latestComicUrl);
  await page.waitForSelector('iframe.photoset', { timeout: 1000 });

  const photoSetIFrameUrl = await page.evaluate(getPhotoSetIFrameUrl);
  await page.goto(photoSetIFrameUrl);

  const comicImages = await page.evaluate(getComicImages);
  //
  page.goto(comicImages[0]);
  console.log({ image: await page.content() });
  //

  browser.close();

  return comicImages;
};

/* Page Functions */

const getLatestComicUrl = (): string => {
  const anchor = document.querySelector('.NGc5k a') as HTMLAnchorElement;
  return anchor.href;
};

const getPhotoSetIFrameUrl = (): string => {
  const iframe = document.querySelector('iframe.photoset') as HTMLIFrameElement;
  return iframe.src;
};

const getComicImages = (): string[] => {
  const photosetImages = document.querySelectorAll('.photoset_photo') as NodeListOf<HTMLAnchorElement>;
  return Array.from(photosetImages).map(img => img.href);
};
