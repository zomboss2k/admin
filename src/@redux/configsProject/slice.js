const { makeCRUDSlice } = require('@redux/crudCreator');
const { MODEL_NAME, configsProjectActions } = require('./actions');

const slice = makeCRUDSlice(MODEL_NAME, configsProjectActions);

export default slice.reducer;
