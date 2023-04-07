import common from './common.json';
import users from './users.json';
import projects from './projects.json';
import settings from './settings.json';
import bundles from './bundles.json';
import instance from './instance.json';

export default {
  ...common,
  ...users,
  ...projects,
  ...bundles,
  ...instance,
  settings,
};
