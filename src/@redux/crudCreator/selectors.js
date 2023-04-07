import { createDraftSafeSelector } from '@reduxjs/toolkit';
import _, { zipObjectDeep } from 'lodash';
import { getFilterFromUrl } from '../../utils/tools';

export class CRUDSelectors {
  constructor(resource) {
    this.resource = resource;
  }

  getRestData = (state) => state[this.resource];

  getDefaultValue = (state, props) =>
    props.location && (!props.location.hash || props.location.hash === '#')
      ? decodeURI(props.location.search.substring(1)).trim()
      : props.location.hash.match(`#${this.resource}/create?(.*)`)?.[1];

  getDefaultFromProps = (state, props) => props.defaultValue;

  getDataArr = createDraftSafeSelector([this.getRestData], (resources) => {
    const { data, ids } = resources;
    return ids?.map((id) => data[id]);
  });

  getTotal = createDraftSafeSelector([this.getRestData], (resources) => {
    const { total } = resources;
    return total;
  });

  getDefaultCreateData = createDraftSafeSelector(
    [this.getDefaultValue, this.getDefaultFromProps],
    (defaultValue, defaultValueFromProps) =>
      defaultValue !== ''
        ? zipObjectDeep(
            Object.keys(getFilterFromUrl(defaultValue).filter),
            _.values(getFilterFromUrl(defaultValue).filter),
          )
        : defaultValueFromProps || {},
  );

  getCurrentData = createDraftSafeSelector(
    [this.getRestData],
    (resources = {}) => {
      const { currentData } = resources;
      return currentData || {};
    },
  );

  getLoadingCurrentRecord = createDraftSafeSelector(
    [this.getRestData],
    (resources = {}) => {
      const { currentId, itemLoadings } = resources;
      return itemLoadings[currentId];
    },
  );

  enabledLoadMore = createDraftSafeSelector([this.getRestData], (resources) => {
    const { offset, limit, loading, numberOfPages } = resources;
    return !loading && offset / limit + 1 < numberOfPages;
  });

  getLoading = createDraftSafeSelector(
    [this.getRestData],
    (resources = { loading: false }) => {
      const { loading } = resources;
      return loading;
    },
  );

  getCreateLoading = createDraftSafeSelector(
    [this.getRestData],
    (resources = { createLoading: false }) => {
      const { createLoading } = resources;
      return createLoading;
    },
  );

  getError = createDraftSafeSelector([this.getRestData], (resources) => {
    const { error } = resources;
    return error;
  });

  getFilters = createDraftSafeSelector([this.getRestData], (resources) => {
    const { limit, offset, filter, total, orderBy, q } = resources;
    return { limit, offset, filter, count: total, orderBy, q };
  });
}

export const crudSelectors = new CRUDSelectors();
