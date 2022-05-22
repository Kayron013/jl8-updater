import axios from 'axios';
import FormData from 'form-data';
import env from './env';

export const uploadImages = async (images: string[]): Promise<string[]> => {
  return Promise.all(images.map(uploadImage));
};

const uploadImage = async (image: string): Promise<string> => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('type', 'URL');

  const resp = await axios
    .post('https://api.imgur.com/3/image', formData, {
      headers: {
        Authorization: `Client-ID ${env.IMGUR_CLIENT_ID}`,
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      },
    })
    .catch(err => {
      console.error(err.response.data);
      throw `Error uploading image to Imgur: ${image}`;
    });

  const imgUrl = resp.data.data.link;
  return imgUrl;
};
