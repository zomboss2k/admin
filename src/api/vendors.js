import { patch } from './utils';

export async function resetKey(id) {
  return patch(`/vendors/rest-key/${id}`, {});
}
