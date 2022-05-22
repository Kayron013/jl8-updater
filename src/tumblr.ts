import * as tumblr from 'tumblr.js';
import env from './env';

const client = tumblr.createClient({
  credentials: {
    consumer_key: env.TUMBLR_COMSUMER_KEY,
    consumer_secret: env.TUMBLR_CONSUMER_SECRET,
  },
  returnPromises: true,
});

export const getLatestComic = async () => {
  const blogPosts: any = await client.blogPosts('jl8comic.tumblr.com');
  const latestPost = blogPosts.posts[0];
  const comicImages = latestPost.photos.map((photo: any) => photo.original_size.url);

  return {
    title: latestPost.summary.split(' by Yale Stewart')[0],
    images: comicImages,
  };
};
