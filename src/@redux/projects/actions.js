import { makeActions } from '@redux/crudCreator/actions';

export const MODEL_NAME = 'projects';
export const projectsActions = makeActions(MODEL_NAME);

export const getAllProjects = projectsActions.getAll;
export const editProjects = projectsActions.edit;
export const createProjects = projectsActions.create;
export const getByIdProjects = projectsActions.getDataById;
