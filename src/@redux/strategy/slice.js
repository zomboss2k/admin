import { makeCRUDSlice } from '@redux/crudCreator';
import { MODEL_NAME, strategyActions } from './actions';

const slice = makeCRUDSlice(MODEL_NAME, strategyActions);

export default slice.reducer;
