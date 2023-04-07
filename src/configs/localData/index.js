import { uniqBy } from 'lodash';
import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import theme from '../theme/index';
import commonJobs from './commonJobs';
import nationalities from './nationalities';
import locales from './locales.json';

export const FORMAT_DATE = 'MMM DD, YYYY';

export const CHART_LINES = [
  {
    value: 'sales',
    dataKey: 'sales',
    text: 'home.chart.sales',
    stroke: '#f83995',
    fillId: 'salesFillColor',
    fillColor: '#f83995',
  },
  {
    value: 'profit',
    dataKey: 'profit',
    text: 'home.chart.profit',
    stroke: '#4d79f6',
    fillId: 'profitFillColor',
    fillColor: '#4d79f6',
  },
];

export const COUNTRY = [
  {
    value: 'buenosAires',
    name: 'home.country.buenosAires',
    color: '#F93B7A',
  },
  {
    value: 'brasilia',
    name: 'home.country.brasilia',
    color: '#0AAFFF',
  },
  {
    value: 'santiago',
    name: 'home.country.santiago',
    color: '#FFC212',
  },
  {
    value: 'bogota',
    name: 'home.country.bogota',
    color: '#7551E9',
  },
];

export const GENDER = [
  {
    value: 'male',
    text: 'gender.male',
  },
  {
    value: 'female',
    text: 'gender.female',
  },
];

export const STATUS = [
  {
    value: true,
    text: 'Active',
    color: theme.color.green,
  },
  {
    value: false,
    text: 'Inactive',
    color: theme.color.red,
  },
];

export const PAYMENT_STATUS = [
  {
    value: false,
    text: 'Not paid',
    textColor: theme.color.red,
    icon: 'close-circle',
  },
  {
    value: true,
    text: 'Paid',
    textColor: theme.color.green,
    icon: 'check-circle',
  },
];

export const MEMBER_ROLES = [
  {
    id: 1,
    text: {
      en: 'Admin',
      vi: 'Admin',
    },
  },
  {
    id: 2,
    text: {
      en: 'Staff',
      vi: 'Nhân viên',
    },
  },
  {
    id: 3,
    text: {
      en: 'Member',
      vi: 'Khách hàng',
    },
  },
];

export const LANGUAGES = [
  {
    id: 'en',
    text: {
      en: 'English',
      vi: 'Tiếng Anh',
    },
  },
  {
    id: 'vi',
    text: {
      en: 'Vietnamese',
      vi: 'Tiếng Việt',
    },
  },
];

export const GENDERS = [
  {
    value: 'male',
    text: 'gender.male',
    color: '#1890ff',
    icon: 'man',
  },
  {
    value: 'female',
    text: 'gender.female',
    color: '#eb2f96',
    icon: 'woman',
  },
  {
    value: 'other',
    text: 'gender.other',
    color: '#959595',
    icon: 'key',
  },
];

export const NOTIFICATIONS = [
  {
    value: 'pharmacy',
    text: 'notifications.pharmacy',
    icon: 'ic-pharmacy',
  },
  {
    value: 'delivery',
    text: 'notifications.delivery',
    icon: 'ic-delivery',
  },
  {
    value: 'prepare',
    text: 'notifications.prepare',
    icon: 'ic-prepare',
  },
  {
    value: 'send',
    text: 'notifications.send',
    icon: 'ic-send',
  },
];

export const ROLE = [
  { text: 'role.superadmin', value: 'superadmin' },
  { text: 'role.admin', value: 'admin' },
  { text: 'role.pharmacist', value: 'user' },
];

export const JOBS = commonJobs;
export const NATIONALITIES = uniqBy(nationalities, 'nationality');

export const QUALIFICATIONS = [
  { text: 'qualifications.university', value: 'university' },
  { text: 'qualifications.colleges', value: 'colleges' },
];

export const OPEN_TIME = [
  {
    value: true,
    text: 'time.open',
    color: '#52c41a',
  },
  {
    value: false,
    text: 'time.closed',
    color: '#e64c38',
  },
];

export const SUMMARY_CARD_TYPES = [
  {
    value: 'up',
    text: 'summaryCard.up',
    icon: RiseOutlined,
    color: theme.color.green,
  },
  {
    value: 'down',
    text: 'summaryCard.down',
    icon: FallOutlined,
    color: theme.color.red,
  },
];

export const DETAIL_SUMMARY_CARD_TYPES = [
  {
    value: 'up',
    text: 'detailSummaryCard.up',
    icon: 'arrow-up',
    color: theme.color.green,
  },
  {
    value: 'down',
    text: 'detailSummaryCard.down',
    icon: 'arrow-down',
    color: theme.color.red,
  },
];

export const SUMMARIES_CUSTOMER = [
  {
    dataKey: 'newCustomer',
    color: '#0088FE',
    text: 'customers.newCustomer',
  },
  {
    dataKey: 'repeatedCustomer',
    color: '#00C49F',
    text: 'customers.repeatedCustomer',
  },
];

export const CONTRACT_TYPES = [
  { text: 'contractTypes.official', value: 'official' },
  { text: 'contractTypes.partTime', value: 'partTime' },
];

export const RATINGS = [
  {
    value: '1',
    text: '1 Star',
  },
  {
    value: '2',
    text: '2 Star',
  },
  {
    value: '3',
    text: '3 Star',
  },
  {
    value: '4',
    text: '4 Star',
  },
  {
    value: '5',
    text: '5 Star',
  },
];

export const LOCALES_DATA = {
  vi: {
    value: 'vi',
    text: 'Tiếng Việt',
  },
  en: {
    value: 'en',
    text: 'English (US)',
  },
};

export const LOCALES = Object.keys(locales['primary-dialects']).map((e) => ({
  value: e,
  text: locales['language-names'][locales['primary-dialects'][e]][0],
}));

export const USER_ROLES = [
  {
    label: 'ADMIN',
    value: 'ADMIN',
  },
  {
    label: 'USER',
    value: 'USER',
  },
];

export const BANNER_POSITIONS = [
  {
    text: 'cms.positions.left',
    value: 'left',
  },
  {
    text: 'cms.positions.center',
    value: 'center',
  },
  {
    text: 'cms.positions.right',
    value: 'right',
  },
  {
    text: 'cms.positions.bottomLeft',
    value: 'bottomLeft',
  },
  {
    text: 'cms.positions.bottomCenter',
    value: 'bottomCenter',
  },
  {
    text: 'cms.positions.bottomRight',
    value: 'bottomRight',
  },
];

export const CMS_BANNER_TYPES = [
  {
    text: 'cms.filters.homeBanner',
    value: 'homeBanner',
  },
  {
    text: 'cms.filters.listingBanner',
    value: 'listingBanner',
  },
  {
    text: 'cms.filters.productsBanner',
    value: 'productsBanner',
  },
  {
    text: 'cms.filters.productDetailBanner',
    value: 'productDetailBanner',
    isShowAllPage: true,
  },
  {
    text: 'cms.filters.popupTopBanner',
    value: 'popupTopBanner',
    isShowAllPage: true,
  },
  {
    text: 'cms.filters.popupBottomBanner',
    value: 'popupBottomBanner',
    isShowAllPage: true,
  },
  {
    text: 'cms.filters.popupCenterBanner',
    value: 'popupCenterBanner',
    isShowAllPage: true,
  },
];

export const BUTTON_TYPES = [
  {
    text: 'buttonType.border',
    value: 'border',
  },
  {
    text: 'buttonType.solid',
    value: 'solid',
  },
];

export const CMS_STATUS = [
  {
    text: 'Pending',
    value: 'pending',
  },
  {
    text: 'Active',
    value: 'active',
  },
  {
    text: 'Draft',
    value: 'draft',
  },
];

export const BLOG_STATUS = [
  {
    text: 'Pending',
    value: 'pending',
  },
  {
    text: 'Active',
    value: 'active',
  },
  {
    text: 'Draft',
    value: 'draft',
  },
];

export const MISCELLANEOUS_TYPES = [
  {
    text: 'miscellaneous.termsConditions',
    value: '/miscellaneous/terms-conditions',
  },
  {
    text: 'miscellaneous.privacyPolicy',
    value: '/miscellaneous/privacy-policy',
  },
  {
    text: 'miscellaneous.refundPolicy',
    value: '/miscellaneous/refund-policy',
  },
  // {
  //   text: 'miscellaneous.contactUs',
  //   value: '/miscellaneous/contact-us',
  // },
];

export const PROMOTION_APPLY_CONDITION_CUSTOMER = [
  {
    value: 'allCustomer',
    text: 'promotions.applyConditionTypes.allCustomer',
  },
  {
    value: 'newCustomer',
    text: 'promotions.applyConditionTypes.newCustomer',
  },
  {
    value: 'currentCustomer',
    text: 'promotions.applyConditionTypes.currentCustomer',
  },
];

export const PROMOTION_APPLY_CONDITION_PRODUCT = [
  {
    value: 'eachProduct',
    text: 'promotions.applyConditionTypes.eachProduct',
  },
  {
    value: 'order',
    text: 'promotions.applyConditionTypes.order',
  },
];

export const HEADER_MENU_TYPE_CONST = {
  topMenus: {
    text: 'headerMenus.top',
    value: '/headerMenus/top',
  },
  middleMenus: {
    text: 'headerMenus.middle',
    value: '/headerMenus/middle',
  },
  bottomMenus: {
    text: 'headerMenus.bottom',
    value: '/headerMenus/bottom',
  },
};

export const HEADER_MENU_TYPES = Object.values(HEADER_MENU_TYPE_CONST);

export const FOOTER_MENU_TYPE_CONST = {
  // topMenus: {
  //   text: 'footerMenus.top',
  //   value: '/footerMenus/top',
  // },
  middleMenus: {
    text: 'footerMenus.middle',
    value: '/footerMenus/middle',
  },
  bottomMenus: {
    text: 'footerMenus.bottom',
    value: '/footerMenus/bottom',
  },
};

export const FOOTER_MENU_TYPES = Object.values(FOOTER_MENU_TYPE_CONST);

export const MON_TO_FRI_OF_WEEK = {
  text: 'weekDays.mondayToFriday',
  valueText: 'mondayToFriday',
  textIsOpen: 'weekDays.openMondayToFriday',
};

export const DAYS_EXCEPT_END_WEEK = [
  {
    text: 'weekDays.monday',
    value: 1,
    valueText: 'monday',
    textIsOpen: 'weekDays.openMonday',
  },
  {
    text: 'weekDays.tuesday',
    value: 2,
    valueText: 'tuesday',
    textIsOpen: 'weekDays.openTuesday',
  },
  {
    text: 'weekDays.wednesday',
    value: 3,
    valueText: 'wednesday',
    textIsOpen: 'weekDays.openWednesday',
  },
  {
    text: 'weekDays.thursday',
    value: 4,
    valueText: 'thursday',
    textIsOpen: 'weekDays.openThursday',
  },
  {
    text: 'weekDays.friday',
    value: 5,
    valueText: 'friday',
    textIsOpen: 'weekDays.openFriday',
  },
];

export const DAYS_OF_END_WEEK = [
  {
    text: 'weekDays.saturday',
    value: 6,
    valueText: 'saturday',
    textIsOpen: 'weekDays.openSaturday',
  },
  {
    text: 'weekDays.sunday',
    value: 0,
    valueText: 'sunday',
    textIsOpen: 'weekDays.openSunday',
  },
];

export const VALUE_ROOT_OPEN_TIME = {
  arrRoot1: ['monday'],
  arrRoot2: ['tuesday', 'wednesday', 'thursday', 'friday'],
};

export const SHIPPING_METHOD = [
  {
    key: 'in3Days',
    text: 'shippingFee.in3Days',
    value: -1,
    available: false,
  },
  {
    key: 'in1Day',
    text: 'shippingFee.in1Day',
    value: -1,
    available: false,
  },
  {
    key: 'in2h',
    text: 'shippingFee.in2h',
    value: -1,
    available: false,
  },
];

export const PAYMENT_METHOD = [
  {
    value: 'COD',
    text: 'paymentMethod.cod',
  },
  {
    value: 'ATM',
    text: 'paymentMethod.atm',
  },
  {
    value: 'Momo',
    text: 'paymentMethod.momo',
  },
  {
    value: 'Atome',
    text: 'paymentMethod.atome',
  },
  {
    value: 'Fundiin',
    text: 'paymentMethod.fundiin',
  },
];

export const SALE_CHANEL = [
  {
    value: 'facebook',
    text: 'saleChanel.facebook',
  },
  {
    value: 'website',
    text: 'saleChanel.website',
  },
  {
    value: 'instagram',
    text: 'saleChanel.instagram',
  },
  {
    value: 'store',
    text: 'saleChanel.store',
  },
  {
    value: 'other',
    text: 'saleChanel.other',
  },
];
