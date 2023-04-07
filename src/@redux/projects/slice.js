import { makeCRUDSlice } from '@redux/crudCreator';
import { MODEL_NAME, projectsActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, projectsActions);

export default slice.reducer;
