import { makeActions } from '@redux/crudCreator';

export const MODEL_NAME = 'configsProject';
export const configsProjectActions = makeActions(MODEL_NAME, 'id', 'configs');

export const getAllConfigsProject = configsProjectActions.getAll;
export const editConfigsProject = configsProjectActions.edit;
export const createConfigsProject = configsProjectActions.create;
export const getByIdConfigsProject = configsProjectActions.getDataById;
