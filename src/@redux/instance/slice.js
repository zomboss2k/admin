const { makeCRUDSlice } = require('@redux/crudCreator');
const { MODEL_NAME, instanceActions } = require('./actions');

const slice = makeCRUDSlice(MODEL_NAME, instanceActions);

export default slice.reducer;
