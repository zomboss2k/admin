import { getQueryString, get, post, put, del } from './utils';

export async function clearCacheApi(data) {
  return del(`/cache/clear?${getQueryString(data)}`);
}

export async function getAddressApi() {
  return get(`/address`);
}

export async function getConfigApi() {
  return get(`/config`);
}

export async function getSummariesApi() {
  return get('/dashboards');
}

export async function getRevenueApi(data) {
  return put('/revenue', data);
}

export async function getGlobalSaleApi() {
  return get('/global-sales');
}

export async function getSummariesCustomersApi() {
  return get('/summaries-customers');
}
export async function getPopularProductApi() {
  return get('/popular-product');
}

export async function getPreview(data) {
  return post(`/preview`, data);
}

export async function crawlerPage(data) {
  return post(`/crawlerPage`, data);
}
