import { makeActions } from '@redux/crudCreator/actions';
export const MODEL_NAME = 'strategy';
export const strategyActions = makeActions(MODEL_NAME);

export const getAllStrategy = strategyActions.getAll;
export const editStrategy = strategyActions.edit;
export const createStrategy = strategyActions.create;
export const getByIdStrategy = strategyActions.getDataById;
