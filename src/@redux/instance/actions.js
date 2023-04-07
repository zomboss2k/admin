import { makeActions } from '@redux/crudCreator';

export const MODEL_NAME = 'instance';
export const instanceActions = makeActions(MODEL_NAME, 'id', 'instance');

export const getAllInstance = instanceActions.getAll;
export const editInstance = instanceActions.edit;
export const createInstance = instanceActions.create;
export const getByIdInstance = instanceActions.getDataById;
