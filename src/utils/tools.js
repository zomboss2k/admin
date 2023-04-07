/* eslint-disable */
import _, { omitBy, reduce, isEmpty, keyBy, get } from 'lodash';
import {
  getUrl,
  isImage,
  uploadMedia,
  uploadMediaImgur,
} from 'api/uploadMedia';
import { notification } from 'antd';
import i18n from 'i18next';

export const roundToPrecision = (x, precision) => {
  const y = x + (precision === undefined ? 0.5 : precision / 2);
  return y - (y % (precision === undefined ? 1 : precision)) || 0;
};

export const commaString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const checkRole = (elementRoles, userRole) => {
  return !elementRoles || (userRole && elementRoles.indexOf(userRole) > -1);
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const sortByProps = (list, props) => {
  if (!list) return [];
  const newList = list.sort((a, b) => {
    if (!a || !b) return -1;
    if (this.change_alias(a[props]) < this.change_alias(b[props])) {
      return -1;
    }
    if (this.change_alias(a[props]) > this.change_alias(b[props])) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  return newList;
};

export const upperCaseFirstChart = (str) =>
  str[0].toUpperCase() + str.substring(1);

export const changeAlias = (alias) => {
  let str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ {2}|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ {2}|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-',
  );
  str = str.replace(/-+-/g, '-');
  str = str.replace(/^\-+|\-+$/g, '');
  return str;
};

export const validateName = (name) => {
  const re = /^[^0-9 *&^$#@!(){}\[\]\\//]+[^0-9*&^$#@!(){}\[\]\\//]+$/;
  return re.test(name);
};

export const getResourceTitle = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const formatFormData = (originalData, data) => {
  const newData = {};
  Object.keys(data).forEach((key) => {
    newData[key] = formatData(data[key], typeof originalData[key]);
  });
  return newData;
};

export const formatData = (data, type) => {
  switch (type) {
    case 'number':
      return Number(data);
    default:
      return data;
  }
};

export const getMatchFromPath = (string) => {
  const re = '(\\/)((?:[a-z][a-z0-9_]*))(\\/)((?:[a-z][a-z0-9_]*))';
  const p = new RegExp(re, ['i']);
  const m = p.exec(string);
  return m && m.length > 0 ? m[0] : string;
};

export const getSearch = (filter) => {
  const params = {
    limit: filter.limit,
    offset: filter.offset,
    q: filter.q,
    orderBy: filter.orderBy,
    ...getValidData(filter.filter),
  };

  return convertObjToSearchStr(params);
};

export const convertObjToSearchStr = (params) =>
  Object.keys(params)
    .map((key) =>
      params[key]
        ? `${encodeURIComponent(key)}=${encodeURIComponent(
            JSON.stringify(params[key]),
          )}`
        : '',
    )
    .filter((data) => data !== '')
    .join('&');

const getValidDataOfObj = (obj, isFilter) => {
  const validData = reduce(
    obj,
    (result, value, key) => {
      if (Array.isArray(value) && isFilter) {
        return value.length > 0 ? { ...result, [key]: value } : result;
      } else if (Array.isArray(value)) {
        return { ...result, [key]: value };
      }
      if (typeof value === 'object' && !isEmpty(value)) {
        const formatChildValue = getValidDataOfObj(value);
        return !isEmpty(formatChildValue)
          ? { ...result, [key]: formatChildValue }
          : result;
      }

      if (value || value === false || value === 0 || value === null) {
        // eslint-disable-next-line
        result[key] = value;
        return { ...result, [key]: value };
      }

      if (value === '' && !isFilter) {
        // eslint-disable-next-line
        result[key] = ' ';
      }
      return result;
    },
    {},
  );
  return validData;
};

export const getValidData = (filter, isFilter) =>
  getValidDataOfObj(filter, isFilter);

export const getFilterFromUrl = (searchStr) => {
  const parsed = {};
  if (!searchStr || searchStr.trim() === '') return {};
  decodeURIComponent(searchStr)
    .trim()
    .substring(searchStr?.[0] === '?' ? 1 : 0)
    .split('&')
    .forEach((text) => {
      const keyValue = text.split('=');
      if (!Number.isNaN(Number(keyValue[1]))) {
        parsed[keyValue[0]] = Number(keyValue[1]);
      } else {
        parsed[keyValue[0]] = keyValue[1];
      }

      try {
        parsed[keyValue[0]] = JSON.parse(parsed[keyValue[0]]);
      } catch (error) {
        parsed[keyValue[0]] = parsed[keyValue[0]];
      }
    });
  const filter = {
    // q: parsed.q,
    orderBy: parsed.orderBy,
    limit: parsed.limit,
    offset: parsed.offset,
  };
  delete parsed.limit;
  delete parsed.offset;
  delete parsed.orderBy;
  // delete parsed.q;
  filter.filter = parsed;
  return filter;
};

export const getRecordData = (record, source) => {
  // const arrKeys = source ? replaceAll(replaceAll(source, '\\[', '.'), '\\]', '').split('.') : [];
  // let data = record;
  // arrKeys.forEach(key => {
  //   data = data ? data[key] : data;
  // });
  return get(record, source);
};

export const convertDataToObj = (formatOnSubmit, record) => {
  const newRecord = {};
  Object.keys(record).forEach((key) => {
    newRecord[key] = formatOnSubmit[key]
      ? { ...record[key], ...formatOnSubmit[key](record[key]) }
      : record[key];
  });
  // const arrKeys = source.split('.');
  // let data = record;
  // arrKeys.forEach((key, index) => {
  //   if (index === arrKeys.index - 1) {
  //     data[key] = value;
  //   } else {
  //     data = data[key];
  //   }
  // });
  return newRecord;
};

export const replaceAll = function (str, search, replacement) {
  return str.replace(new RegExp(search, 'g'), replacement);
};

export const formattedRESTData = (data) => ({
  data: keyBy(data, 'id'),
  ids: data.map((item) => item?.id),
});

export const getIdByUrl = (props, location) => {
  const idFromPath =
    location.pathname.match(
      `${props?.customRedirectPath || props.resource}/(.*)/edit`,
    ) ||
    location.pathname.match(
      `${props?.customRedirectPath || props.resource}/(.*)/show`,
    );
  const idFromHash =
    location.hash.match(`#${props.resource}/(.*)/edit`) ||
    location.hash.match(`#${props.resource}/(.*)`);
  return (idFromPath && idFromPath[1]) || (idFromHash && idFromHash[1]);
};

export const getPrefixPath = (props, action) =>
  `${
    props.redirects[action] === 'modal'
      ? `${props.location.pathname}${props.location.search}#`
      : props.rootPath
  }/${props.resource}`;

export const onSearch = (data, keySearch) =>
  data && data.toLowerCase().search(keySearch.toLowerCase()) !== -1;

export const formattedData = (list) => ({
  data: keyBy(list, 'id'),
  ids: list.map((data) => data.id),
});

export const makeBreadCrumbFromPath = (location) => {
  const BREADCRUMB_LIST = [];
  const paths = location.pathname.split('/');
  paths.forEach((data) => {
    if (data === '') return;
    BREADCRUMB_LIST.push({
      title: data,
      path: `${
        BREADCRUMB_LIST.length
          ? BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1].path
          : ''
      }/${data}`,
    });
  });
  if (BREADCRUMB_LIST.length > 2) {
    BREADCRUMB_LIST[BREADCRUMB_LIST.length - 2].path =
      BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1]?.path;
    delete BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1];
  }
  return BREADCRUMB_LIST;
};

export const reorderOffset = (
  boards,
  prevOrder,
  { sourceId, destinationId, sourceIndex, destinationIndex },
) => {
  const newBoards = { ...boards };
  if (sourceId === destinationId) {
    newBoards[sourceId] = reorder(
      boards[sourceId],
      sourceIndex,
      destinationIndex,
    );
  } else {
    const moveResults = move(
      boards,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    );
    newBoards[sourceId] = moveResults[sourceId];
    newBoards[destinationId] = moveResults[destinationId];
  }
  return { boards: newBoards, prevOrder: {} };
};

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  boards,
  sourceId,
  destinationId,
  sourceIndex,
  destinationIndex,
) => {
  const sourceClone = Array.from(boards[sourceId]);
  const destClone = Array.from(boards[destinationId]);
  const [removed] = sourceClone.splice(sourceIndex, 1);

  destClone.splice(destinationIndex, 0, removed);

  const result = {};
  result[sourceId] = sourceClone;
  result[destinationId] = destClone;

  return result;
};

export const getAllIconName = async () => {
  const iconsFile = await fetch('/styles.css');
  const fileData = await iconsFile.text();
  const icons = fileData
    .match(/.icon-ic-(.*):before/gm)
    .map((e) => e.match('.(.*):before')[1]);
  return icons;
};

export const imageUploadHandler = async (blobInfo, success, failure) => {
  var xhr, formData;

  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  // xhr.open('POST', 'postAcceptor.php');
  var file = new File([blobInfo.blob()], blobInfo.filename(), {
    type: 'image/png',
  });

  const res = await getUrl(file.name, file.type);
  const response = await uploadMedia(res.uploadUrl, file);

  // const response = await uploadMediaImgur(blobInfo.blob());
  if (!res.url) {
    notification.error({
      message: I18n.t('error.title'),
      description: I18n.t('error.uploadSize'),
    });
    failure();
  } else {
    success(res.url);
  }
};

export const getAWSImageUrl = (image) => {
  // eslint-disable-next-line
  if (!image)
    return 'data:image/png;base64,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';

  return image && (image.indexOf('http') > -1 || image.indexOf('https') > -1)
    ? image
    : `${process.env?.REACT_APP_AWS_PHOTO_HOST}/${image}`;
  // : getPreviewImageUrl({
  //     image,
  //   });
};

export const getImageUrl = (image) => {
  // eslint-disable-next-line
  if (!image)
    return 'data:image/png;base64,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';
  if (!isImage(image))
    return image && (image.indexOf('http') > -1 || image.indexOf('https') > -1)
      ? image
      : `${process.env?.REACT_APP_VIDEO_HOST}/${image}`;

  return image && (image.indexOf('http') > -1 || image.indexOf('https') > -1)
    ? image
    : `${process.env?.REACT_APP_PHOTO_HOST}/${image}`;
  // : getPreviewImageUrl({
  //     image,
  //   });
};

export const getPreviewImageUrl = ({
  image = '',
  configs = {
    BUCKET_NAME: 'meet-devtify',
    CDN_URL: 'https://d1dppjm4v1py41.cloudfront.net',
  },
  ratio,
  width = 400,
}) => {
  const resizeByConvert = {
    bucket: configs?.BUCKET_NAME,
    key: image,
    edits: {
      resize: {
        width,
        fit: 'cover',
      },
    },
  };

  const resizeByRatio = {
    bucket: configs?.BUCKET_NAME,
    key: image,
    edits: {
      resize: {
        ratio,
      },
    },
  };
  const objJsonStr = JSON.stringify(ratio ? resizeByRatio : resizeByConvert);
  const objJsonB64 = btoa(objJsonStr);
  return (image &&
    (image?.indexOf('http') > -1 || image?.indexOf('https') > -1)) ||
    image?.indexOf('data:image') > -1
    ? image
    : `${configs?.CDN_URL}/${objJsonB64}`;
};

export function plainToFlattenObject(object) {
  const result = {};

  function flatten(obj, prefix = '') {
    _.forEach(obj, (value, key) => {
      if (Array.isArray(value) && typeof value?.[0] === 'string') {
        result[`${prefix}${key}`] = value;
      } else if (_.isObject(value)) {
        flatten(value, `${prefix}${key}.`);
      } else {
        result[`${prefix}${key}`] = value;
      }
    });
  }

  flatten(object);

  return result;
}

export const acceptPrint = () => {
  var printContents = document.getElementById('print-content');
  document.getElementById('root-content').style.display = 'none';
  printContents.classList.add('overlay-print-content');
  window.print();
  document.getElementById('root-content').style.display = 'flex';
  printContents.classList.remove('overlay-print-content');
  // document.body.innerHTML = originalContents;
  // w.close();
  // setPrinterItems(false);
};

export function copyUrl(data) {
  const Url = document.createElement('input');
  Url.id = 'copy-input';
  document.getElementById('root').appendChild(Url);
  Url.setAttribute('value', data);
  Url.select();
  Url.setSelectionRange(0, 99999);
  document.execCommand('copy');

  notification.success({
    message: 'Copied ' + data,
  });
  Url.remove();
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const getAudioLink = (audioLink = '') => {
  if (audioLink?.includes('http')) {
    return `${
      process.env.REACT_APP_AUDIO_HOST_WITH_CACHE
    }/threads${audioLink.substring(
      audioLink.lastIndexOf('/'),
      audioLink.length,
    )}`;
  }
  return `${process.env.REACT_APP_AUDIO_HOST_WITH_CACHE}/threads${audioLink}`;
};

export const isEqualTwoListKeysByTime = (listKey1, listKey2, rootObject) => {
  if (!rootObject) return false;

  return listKey2.every((key2) => {
    // check isOpen
    if (!rootObject[key2]?.isOpen) return false;

    return listKey1.every((key1) => {
      // check isOpen
      if (!rootObject[key1]?.isOpen) return false;
      /**
       * rootObject[key_x] = {openTime: mm_number, closeTime: mm_number}
       * Chỉ so sánh thời gian, bỏ qua ngày tháng năm
       */

      return ['openTime', 'closeTime'].every(
        (t) =>
          moment(rootObject[key1]?.[t]).format('HH:mm') ===
          moment(rootObject[key2]?.[t]).format('HH:mm'),
      );
    });
  });
};

export const getDataDetail = (
  data,
  key = 'detail',
  titleKey = 'name',
  defaultValue,
) => {
  if (Array.isArray(get(data, key))) {
    if (
      get(data, key)?.find((item) => item?.langCode === i18n?.language)?.[
        titleKey
      ]
    ) {
      return get(data, key)?.find((item) => item?.langCode === i18n?.language);
    }
    return (
      get(data, key)?.find((item) => item?.[titleKey]) ||
      (get(data, key)?.[0]?.[titleKey]
        ? get(data, key)?.[0]
        : { [titleKey]: data?.slug?.replace(/-/gi, ' ') })
    );
  }

  return (
    get(data, key) || { [titleKey]: data?.slug || data?.id || defaultValue }
  );
};

export const generateCode = () =>
  (Math.random() + 1).toString(36).substring(6).toUpperCase();
