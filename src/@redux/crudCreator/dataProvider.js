import { LOCALES_DATA } from 'configs/localData';
import { isNil, isEmpty, keyBy, omit, get } from 'lodash';
import { getValidData } from 'utils/tools';

export const PRIMARY_KEY = 'id';

export const REQUEST_TYPE = {
  GET_ALL: 'GET_ALL',
  GET_BY_ID: 'GET_BY_ID',
  EDIT: 'EDIT',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
};

const getChildFilters = (key, data) => {
  let tmpFilters = [];

  if (Array.isArray(data)) {
    tmpFilters.push({
      [`${key}__in`]: data,
    });
    return tmpFilters;
  }

  if (typeof data !== 'object') {
    tmpFilters.push({
      [`${key}__like`]: data,
    });
  } else {
    if (data?.ne) {
      tmpFilters.push({
        [`${key}__ne`]: data?.ne,
      });
    }
    if (data?.like) {
      tmpFilters.push({
        [`${key}__like`]: `%${data?.like}%`,
      });
    }
    if (data?.compare) {
      tmpFilters.push({
        [`${key}__${data?.operator}`]: `%${data?.compare}%`,
      });
    }
    if (!isNil(data?.isnull)) {
      tmpFilters.push({
        [`${key}__isnull`]: data?.isnull,
      });
    }
    if (!isNil(data?.notnull)) {
      tmpFilters.push({
        [`${key}__notnull`]: data?.notnull,
      });
    }
    if (!isNil(data?.in)) {
      tmpFilters.push({
        [`${key}__in`]: data?.in,
      });
    }
    if (data?.contL) {
      tmpFilters.push({
        [`${key}__contL`]: data?.contL,
      });
    }

    if (
      !isEmpty(
        omit(data, [
          'like',
          'isnull',
          'notnull',
          'in',
          'compare',
          'operator',
          'ne',
          'contL',
        ]),
      )
    ) {
      Object.keys(
        omit(data, [
          'like',
          'isnull',
          'notnull',
          'in',
          'compare',
          'operator',
          'ne',
          'contL',
        ]),
      ).forEach((subKey) => {
        getChildFilters(`${key}.${subKey}`, data[subKey]).forEach((e) => {
          tmpFilters.push(e);
        });
      });
    }
  }

  return tmpFilters;
};

const formatFilter = (rawFilter) => {
  let filter = [];
  Object.keys(getValidData(rawFilter)).forEach((key) => {
    const childFilters = getChildFilters(key, rawFilter[key]);
    filter = [...filter, ...childFilters];
  });
  return filter.length ? filter : undefined;
};

const formatSorter = (params = {}) => {
  if (!params.orderBy) return 'createdAt,DESC';
  if (params.orderBy?.[0] === '-')
    return params.orderBy.substring(1, params.orderBy.length) + ',DESC';
  return params.orderBy + ',ASC';
};

export const convertRequestParams = (
  type,
  params = {},
  // resource
  // options = { primaryKey: PRIMARY_KEY },
) => {
  const { isPassNull, ...requestParams } = params;
  const formatedParams = {
    ...omit(requestParams, [
      'q',
      'orderBy',
      'limit',
      'pageSize',
      'offset',
      'count',
      'filter',
    ]),
    page:
      Number((requestParams?.offset || 0) / (requestParams?.limit || 10)) + 1,
    limit: requestParams?.limit || 10,
    filter: JSON.stringify(formatFilter(omit(requestParams.filter, 'q') || {})),
    ...((requestParams.q || requestParams.filter?.q) &&
      {
        // s: JSON.stringify(requestParams.q || requestParams.filter?.q || {}),
      }),
    sort: formatSorter(requestParams),
  };
  switch (type) {
    case 'GET_ALL':
      return formatedParams;
    case 'GET_BY_ID':
      return {
        ...requestParams,
      };
    case 'EDIT':
      delete formatedParams.id;
      delete formatedParams.filter;
      delete formatedParams.q;
      delete formatedParams.count;

      return isPassNull
        ? omit(requestParams, ['limit', 'id', 'skip'])
        : getValidData(omit(requestParams, ['limit', 'id', 'skip']));
    case 'CREATE':
      return isPassNull
        ? omit(requestParams, ['limit', 'skip'])
        : getValidData(omit(requestParams, ['limit', 'skip']));
    case 'DELETE':
    default:
      return {};
  }
};

export const convertResponseData = (
  type,
  response,
  options = { primaryKey: PRIMARY_KEY },
) => {
  const tmp = keyBy(get(response || {}, 'detail'), 'langCode');
  const tempDetail = Object.keys(LOCALES_DATA).map((key) => tmp[key]);
  switch (type) {
    case 'GET_ALL':
      return {
        data: keyBy(
          response?.results.map((data) => ({
            ...data,
            id: data[options.primaryKey || PRIMARY_KEY],
            backupId: data[PRIMARY_KEY],
          })),
          options.primaryKey || PRIMARY_KEY,
        ),
        ids: response?.results.map(
          (data) => data[options.primaryKey || PRIMARY_KEY],
        ),
        total: response?.total,
      };
    case 'GET_BY_ID':
    case 'CREATE':
      return response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
            ...(response?.detail && {
              detail:
                typeof response?.detail === 'string'
                  ? response?.detail
                  : tempDetail,
            }),
          }
        : null;
    case 'EDIT':
      return response && response
        ? {
            ...response,
            id: response[options.primaryKey || PRIMARY_KEY],
            backupId: response[PRIMARY_KEY],
          }
        : null;
    case 'DELETE':
    default:
      return response;
  }
};
