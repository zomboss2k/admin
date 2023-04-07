import { makeCRUDSlice } from '@redux/crudCreator';
import { MODEL_NAME, bundlesActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, bundlesActions);

export default slice.reducer;
