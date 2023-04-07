import PropTypes from 'prop-types';
import { getRecordData } from 'utils/tools';
import FormMultiUpload from '../../form/FormMultiUpload';
import { RestInputContext } from '../RestInputContext/index';

const RestMultiPhotos = (props) => (
  <RestInputContext.Consumer>
    {({ record, form }) => (
      <FormMultiUpload
        record={record}
        form={form}
        {...props}
        defaultValue={getRecordData(record, props.source)}
      />
    )}
  </RestInputContext.Consumer>
);

RestMultiPhotos.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
};

export default RestMultiPhotos;
