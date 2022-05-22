import { getLastReadComic, setLastReadComic } from '../src/aws';

const test = async () => {
  if (true) {
    await setLastReadComic({
      id: '',
      title: '',
      images: [],
    });
  }
  const lastReadComic = await getLastReadComic();
  console.log({ lastReadComic });
};

test();
