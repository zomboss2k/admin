// import crud action
import { bundlesActions as bundles } from './bundles/actions';
import { projectsActions as projects } from './projects/actions';
import { usersActions as users } from './users/actions';
import { regionsActions as regions } from './regions/actions';
import { configsProjectActions as configsProject } from './configsProject/actions';
import { instanceActions as instance } from './instance/actions';
import { strategyActions as strategy } from './strategy/actions';

export default {
  // actions here
  bundles,
  projects,
  users,
  regions,
  configsProject,
  instance,
  strategy,
};
