import { post, get, put, del } from './utils';

export async function loginApi(params) {
  return post('/auth/login', params, {}, '');
}

export async function logoutApi() {
  return post('/auth/logout');
}

export async function getPermissionsApi() {
  return get('/auth/permission');
}

export async function getPermissionByIdApi(id) {
  return get(`/auth/permission/${id}`);
}

export async function getCurrentUserApi() {
  return get('/auth/user/me', {}, {}, '');
}

export async function updateCurrentUserApi(data) {
  return put('/users/me', data);
}
export async function updateCurrentArtistUserApi(data) {
  return put('/artists/me', data);
}

export async function createInstallationApi(params) {
  return post('/installations', params);
}

export async function updateInstallationApi(id, params) {
  return put(`/installations/${id}`, params);
}

export async function deleteInstallationApi(id) {
  return del(`/installations/${id}`);
}

export async function forgotPasswordApi(data) {
  return post('/auth/forgotPassword', data);
}

export async function resetPasswordApi(data) {
  return post('/auth/resetPassword', data);
}

export async function registerApi(data) {
  return post('/auth/register', data);
}

export async function registerWithTokenApi(data) {
  return post('/auth/registerByToken', data);
}

export async function disableUserApi(id, isDisabled) {
  return put(`/users/${id}/disable`, { isDisabled });
}

export async function subscribeUserApi(data) {
  return post('/auth/subscribe', data);
}

export async function changePasswordApi(data) {
  return post('/auth/changePassword', data);
}

export async function scaleUpApi(data, params) {
  return put('/strategy/scale-up', data, params);
}

export async function scaleDownApi(data, params) {
  return put('/strategy/scale-down', data, params);
}

export async function fetchAvailabilityZone(code, data, params) {
  return get(`/resources/regions/${code}/availability-zone`, data, params);
}
