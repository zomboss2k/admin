import axios from 'axios';
import slug from 'slug';
import some from 'lodash/some';
import { post } from './utils';
import { getAWSImageUrl } from 'utils/tools';
// import { post } from './utils';
export function isImage(url) {
  return (
    /\.(jpg|jpeg|png|webp|svg)$/.test(url) ||
    some(['jpg', 'jpeg', 'png', 'webp', 'svg'], (e) => `${url}`?.endsWith(e)) ||
    url?.includes('data:image') ||
    !url
  );
}
const getBase64 = async (url) => {
  try {
    // return url;le
    const controller = new AbortController();

    // 5 second timeout:
    const timeoutId = setTimeout(() => {
      controller.abort();
      clearTimeout(timeoutId);
    }, 40000);

    const response = await fetch(getAWSImageUrl(url), {
      // cache: 'no-cache',
      mode: 'cors',
      credentials: 'omit',
      signal: controller.signal,
    });

    const image = await response.blob();
    // const raw = Buffer.from(image).toString('base64');
    const objectURL = URL.createObjectURL(image);
    clearTimeout(objectURL);
    return objectURL;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export function processFile(file) {
  if (!file) {
    return;
  }

  // Load the data into an image
  return new Promise(function (resolve) {
    let rawImage = new Image();

    rawImage.addEventListener('load', function () {
      resolve(rawImage);
    });

    if (typeof file === 'string') {
      getBase64(file).then((res) => {
        rawImage.src = res;
      });
    } else {
      rawImage.src = URL.createObjectURL(file);
    }
  })
    .then(function (rawImage) {
      // Convert image to webp ObjectURL via a canvas blob
      return new Promise(function (resolve) {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        ctx.drawImage(rawImage, 0, 0);

        canvas.toBlob(
          function (blob) {
            resolve(
              new File([blob], `${slug(file?.name || file)}.webp`, {
                type: 'image/webp',
              }),
            );
          },
          'image/webp',
        );
      });
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    });
}

export async function getUrl(name, fileType, resource = 'common') {
  return post(
    `/uploads/createSignUrl`,
    {
      resource,
      name: isImage(name) ? `${slug(`${name}`)}.webp` : name,
      fileType: isImage(name) ? 'image/webp' : fileType,
    },
    {},
    '',
  );
}

export async function uploadMedia(url, data) {
  if (isImage(data?.name || data)) {
    const file = await processFile(data);
    return fetch(url, {
      method: 'PUT',
      body: file,
    }).then(() => url.substring(0, url.indexOf('?')));
  } else {
    generateVideoThumbnail(data);

    return fetch(url, {
      method: 'PUT',
      body: data,
    }).then(() => url.substring(0, url.indexOf('?')));
  }
}

const CLIENT_ID = '50b73e2dc3f6fb5';
export async function uploadMediaImgur(data) {
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
    body: data,
  }).then((res) => res.json());
}

export async function uploadImages(data, onUploadProgress) {
  try {
    const res = await axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/file/uploadImages`,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
      data,
      onUploadProgress: (p) => {
        onUploadProgress &&
          onUploadProgress(Number((p.loaded / p.total) * 100).toFixed(2));
      },
    });
    return res.data.map((e) => ({
      ...e,
      image: process.env.REACT_APP_DRIVER_HOST + e.image,
      previewImage:
        process.env.REACT_APP_DRIVER_THUMBNAIL_HOST + e.previewImage,
    }));
  } catch (error) {
    return error;
  }
}

export const generateVideoThumbnail = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const video = document.createElement('video');

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      let ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();

      return canvas.toBlob(function (blob) {
        resolve(
          new File(
            [blob],
            `${new Date().getTime()}.webp`,
            {
              type: 'image/webp',
            },
          ),
        );
      }, 'image/webp');
    };
  });
};
