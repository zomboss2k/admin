import { combineReducers } from 'redux';
import auth from './auth/slice';
import modal from './modal/slice';
// import here
import bundles from './bundles/slice';
import projects from './projects/slice';
import users from './users/slice';
import reference from './referenceData/slice';
import config from './config/slice';
import regions from './regions/slice';
import configsProject from './configsProject/slice';
import instance from './instance/slice';
import strategy from './strategy/slice';

export default () =>
  combineReducers({
    auth,
    modal,
    config,
    reference,
    // add reducer here
    bundles,
    projects,
    users,
    regions,
    configsProject,
    instance,
    strategy,
  });
