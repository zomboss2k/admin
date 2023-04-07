import { makeActions } from '@redux/crudCreator/actions';

export const MODEL_NAME = 'bundles';
export const bundlesActions = makeActions(MODEL_NAME);

export const getAllBundles = bundlesActions.getAll;
export const editBundles = bundlesActions.edit;
export const createBundles = bundlesActions.create;
export const getByIdBundles = bundlesActions.getDataById;
