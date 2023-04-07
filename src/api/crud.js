import { get, post, del, put } from './utils';

export async function getAllApi(resource, data) {
  return get(`/${resource}`, data);
}

export async function getDataByIdApi(resource, id, suffix = '', data) {
  return get(`/${resource}/${id}${suffix}`, data);
}

export async function delApi(resource, id) {
  if (id) {
    return del(`/${resource}/${id}`, {});
  }
  return del(`/${resource}`, {});
}

export async function postApi(resource, suffix = '', data = {}) {
  return post(`/${resource}${suffix}`, data);
}

export async function putApi(resource, id, suffix = '', data = {}) {
  return put(`/${resource}/${id}${suffix}`, data);
}

export async function exportExcelApi(resource, data = {}) {
  return get(`/${resource}/exportExcel`, data);
}

export const exportExcel = ({ name, query, callback }) => {
  const request = new XMLHttpRequest();
  request.open('GET', `${process.env.REACT_APP_SERVER_URL}${query}`);
  request.setRequestHeader(
    'Authorization',
    `Bearer ${localStorage.getItem('sessionToken')}`,
  );
  request.responseType = 'arraybuffer';
  request.onerror = () => {
    callback?.();
  };
  request.onload = () => {
    if (request.status >= 400) {
      callback?.();
    }
    if (request.status === 200) {
      const filename = `${name}.xlsx`;
      // The actual download
      const blob = new Blob([request.response], {
        type: request.getResponseHeader('content-type'),
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      callback?.();
    }
  };
  request.send();
};
