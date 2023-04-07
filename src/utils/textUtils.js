/* eslint-disable */
import moment from 'moment';
import i18next from 'i18next';
import round from 'lodash/round';
// export const formatUnixToDate = unit => moment.unix(unit).format();

export const upperFirstChar = (text) => {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
};
export const lowerFirstChar = (text) => {
  return text.charAt(0).toLowerCase() + text.substr(1);
};
export const replaceAll = (text, search, replacement) => {
  return text.replace(new RegExp(search, 'g'), replacement);
};

export const combineDateTime = (isoDate, isoTime) => {
  const date = isoDate?.split('T')?.[0];
  const time = isoTime?.split('T')?.[1];

  date && time ? `${date}T${time}` : '';
};

export const formatDateTime = (text, formatter) => {
  return text
    ? moment(text).format(formatter || 'DD/MM/YY, hh:mma')
    : moment().format(formatter || 'DD/MM/YY, hh:mma');
};

export const formatDate = (text, type = 'DD/MMM/YYYY') => {
  return text ? moment(text).format(type) : moment().format(type);
};

export const formatTime = (text) => {
  return text ? moment(text).format('hh:mma') : null;
};

export const encodeJsonToURI = (params) => {
  return Object.keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
};

export const stringToSlug = (e) => {
  let str = e;
  str = unidecode(str).toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
export const makeActionName = (text) => {
  return lowerFirstChar(
    replaceAll(
      upperFirstChar(replaceAll(text, '_', ' ').toLowerCase()),
      ' ',
      '',
    ),
  );
};

// export const formatMoney = (number = 0, currency, n, x) => {
//   const UNIT = ['', 'K', 'M'];
//   let unitRank = 0;
//   let tmpPrice = Math.abs(number);
//   while (1) {
//     tmpPrice = Number(tmpPrice) / 1000;
//     unitRank += tmpPrice > 1 ? 1 : 0;
//     if (tmpPrice < 1) break;
//   }
//   const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
//   return `${number >= 0 ? '' : '-'}${Number(tmpPrice * 1000)
//     .toFixed(2)
//     .replace(new RegExp(re, 'g'), '$&,')}${UNIT[unitRank]} ${currency}`;
// };

export const formatMoney = (number, n = 0, x = 3) => {
  if (!number) return '0 đ';
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;
  return (
    Number(number)
      .toFixed(Math.max(0, ~~n))
      .replace(new RegExp(re, 'g'), '$&,') + ' đ'
  );
};

export const separateThousand = (num, digits = 3) => {
  if (!num) return '0';
  if (Number.isNaN(num)) return '0';
  const roundNum = round(Number(num), 2);
  const re = `\\B(?=(\\d{${digits}})+(?!\\d))`;
  return String(roundNum).replace(new RegExp(re, 'g'), ',');
};

export const inputNumberFormatter = () => {
  return {
    formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    parser: (value) => value.replace(/\\s?|(,*)/g, ''),
    ruleType: 'number',
  };
};

export const formatMoneyWithCurrency = (
  number,
  currency = '$',
  n = 0,
  x = 3,
) => {
  const re = `\\d(?=(\\d{${x}})+${n > 0 ? '\\.' : '$'})`;
  if (currency === 'USD' || currency === '$') {
    return `$${Number(number)
      .toFixed(Math.max(0, ~~n))
      .replace(new RegExp(re, 'g'), `$&'`)}`;
    // .replace(new RegExp(re, 'g'), '$&. ');
  }
  return `${Number(number)
    .toFixed(Math.max(0, ~~n))
    .replace(new RegExp(re, 'g'), `$&.`)} ${currency}`;
  // .replace(new RegExp(re, 'g'), '$&.');
};

export const ARTWORK_PRICE_TYPES = {
  sale_public: { value: 'sale_public' },
  sale_private: { value: 'sale_private', text: 'priceTypes.askForPrice' },
  not_sale: { value: 'not_sale', text: 'priceTypes.notForSale' },
  // sale_private: { value: 'sale_private', text: 'Ask For Price' },
  // not_sale: { value: 'not_sale', text: 'Not For Sale' },
  auction_public: { value: 'auction_public' },
  auction_private: { value: 'auction_private' },

  auction_private: { value: 'auction_private' },
};

export const getPricing = (data) => {
  switch (data?.priceType) {
    case ARTWORK_PRICE_TYPES.not_sale.value:
      return i18next.t(ARTWORK_PRICE_TYPES.not_sale.text);
    case ARTWORK_PRICE_TYPES.sale_public.value:
      return data?.maxPrice
        ? `${formatMoneyWithCurrency(
            data?.minPrice || 0,
            data?.currency,
          )} - ${formatMoneyWithCurrency(data?.maxPrice || 0, data?.currency)}`
        : formatMoneyWithCurrency(data?.minPrice || 0, data?.currency);
    case ARTWORK_PRICE_TYPES.auction_private.value:
    case ARTWORK_PRICE_TYPES.auction_public.value:
    case ARTWORK_PRICE_TYPES.sale_private.value:
      return i18next.t(ARTWORK_PRICE_TYPES.sale_private.text);
    case 'reference':
      return 'For Reference';
    default:
      return i18next.t(ARTWORK_PRICE_TYPES.not_sale.text);
  }
};

export const formatPriceWithDiscount = (record) => {
  return Number(record?.priceBeforeDiscount) === Number(record?.price) ? (
    <b>{formatMoney(record?.price)}</b>
  ) : (
    <div>
      <i className="description">
        <del>{formatMoney(record?.priceBeforeDiscount)}</del>
      </i>
      <b style={{ color: '#000' }}>{` ${formatMoney(record.price)}`}</b>
    </div>
  );
};

export const formatSignedNumber = (value) => (value < 0 ? 0 : value);

export const formatNumberByThousand = (number = 0, currency = '', n, x) => {
  const UNIT = ['', 'K', 'M'];
  let unitRank = 0;
  let tmpPrice = Math.abs(number);
  while (1) {
    tmpPrice = Number(tmpPrice) / 1000;
    unitRank += tmpPrice > 1 ? 1 : 0;
    if (tmpPrice < 1) break;
  }
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\.' : '$'})`;
  return `${number >= 0 ? '' : '-'}${Number(tmpPrice * 1000)
    .toFixed(0)
    .replace(new RegExp(re, 'g'), '$&,')}${UNIT[unitRank]} ${currency}`;
};
