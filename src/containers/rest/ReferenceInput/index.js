import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  retrieveReference as retrieveReferenceAction,
  retrieveReferenceList,
} from '@redux/referenceData/actions';
import { getRecordData } from 'utils/tools';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {
  getReferenceResource,
  getEnabledLoadMoreReference,
} from '../../../@redux/referenceData/selectors';
import crudSelectors from '../../../@redux/crudSelectors';

const ReferenceInput = (props) => {
  const {
    record,
    children,
    source,
    fieldKey,
    resource,
    initialFilter,
    hasAdd,
    defaultOptions,
    formatSearch = (text, key) => ({
      [key]: text,
    }),
  } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const resourceData = useSelector((state) =>
    getReferenceResource(state, props),
  );

  const ids = useSelector((state) => state[resource].ids);

  const referenceFilter = useSelector(
    (state) => state.reference?.[resource]?.filter,
  );

  const loadingData = useSelector((state) =>
    crudSelectors[props.resource].getLoading(state, props),
  );
  const enabledLoadMore = useSelector((state) =>
    getEnabledLoadMoreReference(state, props),
  );
  const retrieveReference = (data) => {
    return dispatch(
      retrieveReferenceAction({
        resource: props.resource,
        ids: Array.isArray(data)
          ? data.map((e) => e?.id || e)
          : [data?.id || data],
        mappedBy: props.mappedBy,
        options: defaultOptions,
      }),
    );
  };

  const retrieveList = (filter, isRefresh) =>
    dispatch(
      retrieveReferenceList({
        resource,
        data: {
          ...props.initialFilter,
          ...filter,
        },
        options: {
          isRefresh,
          ...defaultOptions,
        },
      }),
    );
  // dispatch(
  //   CRUDActions[props.resource].getAll({
  //     data: {
  //       ...props.initialFilter,
  //       ...filter,
  //     },
  //     options: { isRefresh },
  //   }),
  // );

  const onSearch = useCallback((value) => {
    const { searchKey } = props;
    if (searchKey) {
      retrieveList(formatSearch(value, searchKey), true);
    }
    // eslint-disable-next-line
  }, []);

  const debouceSearch = _.debounce(onSearch, 300);

  const retrieveListWaypoint = () => {
    if (enabledLoadMore) {
      retrieveList(referenceFilter?.filter);
    }
  };

  const goCreateResource = () => {
    history.push(`#${resource}/create`);
  };

  useEffect(() => {
    if (getRecordData(record, source)) {
      retrieveReference(getRecordData(record, source));
    }
    !loadingData &&
      !ids?.length &&
      retrieveList(initialFilter || { limit: 10, page: 1 }, true);
    // eslint-disable-next-line
  }, [record]);

  const newChildren = React.cloneElement(children, {
    onSearch: (value) => {
      debouceSearch(value);
    },
    onEnter: () => retrieveListWaypoint(),
    record,
    fieldKey,
    loading: loadingData,
    form,
    source,
    resourceData,
    resource,
    isFilterOption: false,
    subfix: hasAdd ? (
      <Button
        size="small"
        style={{ marginLeft: 10 }}
        type="primary"
        onClick={goCreateResource}
        icon={<PlusOutlined />}
      />
    ) : null,
  });
  return newChildren;
};

ReferenceInput.propTypes = {
  resource: PropTypes.string.isRequired,
  resourceData: PropTypes.array,
  record: PropTypes.object,
  retrieveList: PropTypes.func,
  children: PropTypes.node,
  source: PropTypes.string,
  retrieveReference: PropTypes.func,
  form: PropTypes.object,
  searchKey: PropTypes.string,
  enabledLoadMore: PropTypes.bool,
  loadingData: PropTypes.bool,
  initialFilter: PropTypes.object,
  hasAdd: PropTypes.bool,
};

const RestReferenceInput = (props) => (
  <RestInputContext.Consumer>
    {({ record, form }) => (
      <ReferenceInput {...props} form={form} record={record} />
    )}
  </RestInputContext.Consumer>
);

export default RestReferenceInput;
