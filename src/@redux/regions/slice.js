const { makeCRUDSlice } = require('@redux/crudCreator');
const {
  MODEL_NAME,
  regionsActions,
  showAvailabilityZone,
} = require('./actions');

const slice = makeCRUDSlice(MODEL_NAME, regionsActions, {
  [showAvailabilityZone.fulfilled]: (state, { payload }) => {
    state.availabilityZone = payload;
  },
});

export default slice.reducer;
