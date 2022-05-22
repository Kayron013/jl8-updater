import * as tumblr from 'tumblr.js';
import env from './env';
import { Comic } from './interfaces';

const client = tumblr.createClient({
  credentials: {
    consumer_key: env.TUMBLR_CONSUMER_KEY,
    consumer_secret: env.TUMBLR_CONSUMER_SECRET,
  },
  returnPromises: true,
});

export const getLatestComic = async (): Promise<Comic> => {
  try {
    const blogPosts: any = await client.blogPosts('jl8comic.tumblr.com');
    const latestPost = blogPosts.posts[0];
    const comicImages = latestPost.photos.map((photo: any) => photo.original_size.url);

    return {
      id: latestPost.id,
      title: latestPost.summary.split(' by Yale Stewart')[0],
      images: comicImages,
    };
  } catch (err) {
    console.error(err);
    throw 'Error retrieving latest comic from Tumblr';
  }
};
