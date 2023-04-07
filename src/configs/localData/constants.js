import { StarOutlined, CloseOutlined } from '@ant-design/icons';
import {
  CheckedUnderlineIcon,
  DeliveredIcon,
  DollarIcon,
  StoreIcon,
  ReceiptIcon,
} from 'components/common/SVGIcons';

export const COMMISSION_PERCENT = 30; // 30%

export const TERM_CONDITION_URL = `${process.env.REACT_APP_CLIENT_WEB_URL}/terms-conditions`;

export const CONDITIONS_OF_SALE_URL = `${process.env.REACT_APP_CLIENT_WEB_URL}/conditions-of-sales`;

export const PAYMENT_TYPE_COD = 'cod';

export const ORDER_STATUS_CONST = {
  pending: {
    value: 'pending',
    text: 'orderStatus.pending',
    IconCPN: ReceiptIcon,
    index: 0,
    color: '#FBBC05',
  },
  approved: {
    value: 'approved',
    text: 'orderStatus.approved',
    textCod: 'orderStatus.approvedCod',
    IconCPN: DollarIcon,
    index: 1,
    color: '#FBBC05',
  },
  in_progress: {
    value: 'in_progress',
    text: 'orderStatus.inProgress',
    IconCPN: DollarIcon,
    index: 1,
    color: '#FBBC05',
  },
  in_shipment: {
    value: 'in_shipment',
    // text: 'orderStatus.inShipment',
    text: 'orderStatus.delivering',
    textPickup: 'orderStatus.readyPickup',
    IconCPN: DeliveredIcon,
    index: 2,
    color: '#FBBC05',
  },
  delivering: {
    value: 'delivering',
    text: 'orderStatus.delivering',
    textPickup: 'orderStatus.readyPickup',
    IconCPN: DeliveredIcon,
    index: 2,
    color: '#FBBC05',
  },
  completed: {
    value: 'completed',
    text: 'orderStatus.deliveredSuccess',
    textPickup: 'orderStatus.completed',
    IconCPN: CheckedUnderlineIcon,
    index: 3,
    color: '#74AB00',
  },
  evaluate: {
    value: 'evaluate',
    text: 'orderStatus.evaluate',
    IconCPN: StarOutlined,
    index: 4,
    color: '#FBBC05',
  },
  delivered_fail: {
    value: 'delivered_fail',
    text: 'orderStatus.deliveredFail',
    IconCPN: CloseOutlined,
    index: 4,
    color: '#EC5500',
  },
  cancelled: {
    value: 'cancelled',
    text: 'orderStatus.cancelled',
    IconCPN: CloseOutlined,
    index: 4,
    color: '#EC5500',
  },
};

export const ORDER_TYPE_CONST = {
  delivery: {
    value: 'delivery',
    text: 'orderTypes.delivery',
    IconCPN: DeliveredIcon,
  },
  pickUp: {
    value: 'pick-up',
    text: 'orderTypes.pickUp',
    IconCPN: StoreIcon,
  },
}

export const LISTING_FILTER_TYPES = [
  {
    text: 'listingFilterConfig.collections',
    value: 'collections',
  },
  {
    text: 'listingFilterConfig.productTypes',
    value: 'productTypes',
  },
  {
    text: 'listingFilterConfig.categories',
    value: 'categories',
  },
  {
    text: 'listingFilterConfig.attributes',
    value: 'attributes',
  },
];

export const LABEL_ON_PRODUCT_TYPES = [
  {
    text: 'listingFilterConfig.collections',
    value: 'collections',
    parentName: 'parentCollectionId',
  },
  {
    text: 'listingFilterConfig.categories',
    value: 'categories',
    parentName: 'parentCategoryId',
  },
];

export const LOGISTIC_PARTNERS = [
  {
    text: 'Nhật tín',
    value: 'Nhật tín',
  },
  {
    text: 'ahaMove',
    value: 'ahaMove',
  },
  {
    text: 'Giao hàng tiết kiệm',
    value: 'Giao hàng tiết kiệm',
  },
];

export const LOGISTIC_TYPES = [
  {
    text: 'logistics.types.road',
    value: 'road',
  },
  {
    text: 'logistics.types.planes',
    value: 'planes',
  },
  {
    text: 'logistics.types.train',
    value: 'train',
  },
];

export const YES_NO_SELECT = [
  {
    value: 0,
    text: 'button.yes',
    valueBool: true,
  },
  {
    value: 1,
    text: 'button.no',
    valueBool: false,
  },
];

export const YES_NO_SWITCH = [
  {
    value: true,
    text: 'button.yes',
  },
  {
    value: false,
    text: 'button.no',
  },
];

export const DEFAULT_SORTERS = [
  // {
  //   value: 'stock,DESC',
  //   text: 'products.sorter.stock',
  // },
  {
    value: 'currentPrice,DESC',
    text: 'products.sorter.currentPriceDesc',
  },
  {
    value: 'currentPrice,ASC',
    text: 'products.sorter.currentPriceAsc',
  },
  {
    value: 'discountPercentPrice,DESC',
    text: 'products.sorter.discountPercentPriceDesc',
  },
];

export const DISCOUNT_TYPES_CONST = {
  percent: {
    value: 'percent',
    text: 'promotions.discountTypes.percent',
  },
  money: {
    value: 'money',
    text: 'promotions.discountTypes.money',
  },
  gift: {
    value: 'gift',
    text: 'promotions.discountTypes.gift',
  },
  // price: {
  //   value: 'price',
  //   text: 'promotions.discountTypes.price',
  // },
  step: {
    value: 'step',
    text: 'promotions.discountTypes.step',
  },
};

export const DISCOUNT_TYPES = Object.values(DISCOUNT_TYPES_CONST);

export const PROMOTION_TYPES_CONST = {
  // default: {
  //   value: 'default',
  //   text: 'promotions.promotionTypes.default',
  //   description: 'promotions.promotionTypes.defaultDesc',
  //   available: true,
  // },
  shipfee: {
    value: 'shipfee',
    text: 'promotions.promotionTypes.shipfee',
    description: 'promotions.promotionTypes.shipfeeDesc',
    available: true,
  },
  product: {
    value: 'product',
    text: 'promotions.promotionTypes.product',
    description: 'promotions.promotionTypes.productDesc',
    available: true,
  },
  order: {
    value: 'order',
    text: 'promotions.promotionTypes.order',
    description: 'promotions.promotionTypes.orderDesc',
    available: true,
  },
  // buyNDiscountPercent: {
  //   value: 'buyNDiscountPercent',
  //   text: 'promotions.promotionTypes.buyNDiscountPercent',
  //   description: 'promotions.promotionTypes.buyNDiscountPercentDesc',
  //   available: true,
  // },
  // buyNDiscountMoney: {
  //   value: 'buyNDiscountMoney',
  //   text: 'promotions.promotionTypes.buyNDiscountMoney',
  //   description: 'promotions.promotionTypes.buyNDiscountMoneyDesc',
  //   available: true,
  // },
  // bundlePercent: {
  //   value: 'bundlePercent',
  //   text: 'promotions.promotionTypes.bundlePercent',
  //   description: 'promotions.promotionTypes.bundlePercentDesc',
  //   available: true,
  // },
  // bundleMoney: {
  //   value: 'bundleMoney',
  //   text: 'promotions.promotionTypes.bundleMoney',
  //   description: 'promotions.promotionTypes.bundleMoneyDesc',
  //   available: true,
  // },
  // bundleSpecial: {
  //   value: 'bundleSpecial',
  //   text: 'promotions.promotionTypes.bundleSpecial',
  //   description: 'promotions.promotionTypes.bundleSpecialDesc',
  //   available: true,
  // },
  // bundleGifted: {
  //   value: 'bundleGifted',
  //   text: 'promotions.promotionTypes.bundleGifted',
  //   description: 'promotions.promotionTypes.bundleGiftedDesc',
  //   available: true,
  // },
};

export const PROMOTION_DURATIONS = [
  {
    value: 'comingSoon',
    text: 'promotions.durationType.comingSoon',
    available: true,
  },
  {
    value: 'happening',
    text: 'promotions.durationType.happening',
    available: true,
  },
  {
    value: 'expired',
    text: 'promotions.durationType.expired',
    available: true,
  },
];

export const PROMOTION_TYPES = Object.values(PROMOTION_TYPES_CONST);

export const PROMOTION_PRODUCT_TYPES_CONST = {
  productCollections: {
    value: 'productCollection',
    text: 'promotions.productCollections',
  },
  productCategories: {
    value: 'productCategory',
    text: 'promotions.productCategories',
  },
  product: {
    value: 'product',
    text: 'promotions.eachProduct',
  },
};

export const LABEL_POSITIONS_CONST = {
  topLeft: {
    value: 'topLeft',
    text: 'labels.topLeft',
  },
  topRight: {
    value: 'topRight',
    text: 'labels.topRight',
  },
  bottomLeft: {
    value: 'bottomLeft',
    text: 'labels.bottomLeft',
  },
  bottomRight: {
    value: 'bottomRight',
    text: 'labels.bottomRight',
  },
  bottomCenter: {
    value: 'bottomCenter',
    text: 'labels.bottomCenter',
  },
};

export const LABEL_POSITIONS = Object.values(LABEL_POSITIONS_CONST);

export const SETTING_TAGS = [
  {
    value: 'momo',
    text: 'keySettings.momo',
  },
  {
    value: 'payoo',
    text: 'keySettings.payoo',
  },
  {
    value: 'ghn',
    text: 'keySettings.ghn',
  },
  {
    value: 'atome',
    text: 'keySettings.atome',
  },
];

export const SETTING_TYPES = [
  {
    value: 'delivery',
    text: 'keySettings.delivery',
  },
  {
    value: 'payment',
    text: 'keySettings.payment',
  },
];

export const ENQUIRIES_TOPIC_OBJ = {
  ORDER: {
    value: 'ORDER',
    label: 'enquiries.order.title',
  },
  PAYMENT: {
    value: 'PAYMENT',
    label: 'enquiries.payment.title',
  },
  REVIEW_SERVICE: {
    value: 'REVIEW_SERVICE',
    label: 'enquiries.reviewService.title',
  },
  REVIEW_REPORT: {
    value: 'REVIEW_REPORT',
    label: 'enquiries.reviewReport.title',
  },
  OTHER: {
    value: 'OTHER',
    label: 'enquiries.other',
  },
};

export const ENQUIRIES_TOPIC = [
  {
    value: 'ORDER',
    label: 'enquiries.order.title',
  },
  {
    value: 'PAYMENT',
    label: 'enquiries.payment.title',
  },
  {
    value: 'REVIEW_SERVICE',
    label: 'enquiries.reviewService.title',
  },
  {
    value: 'REVIEW_REPORT',
    label: 'enquiries.reviewReport.title',
  },
  {
    value: 'OTHER',
    label: 'enquiries.other',
  },
];

export const ENQUIRIES_SUB_TOPIC = {
  ORDER: [
    {
      value: 'ORDER_STATUS',
      label: 'enquiries.order.status',
    },
    {
      value: 'CHANGE_ORDER_INFO',
      label: 'enquiries.order.changeOrderInfo',
    },
    {
      value: 'SHIPPING_FEE',
      label: 'enquiries.order.shippingFee',
    },
  ],
  PAYMENT: [
    {
      value: 'PAYMENT_METHOD',
      label: 'enquiries.payment.paymentMethod',
    },
    {
      value: 'PAYMENT_FAILURE',
      label: 'enquiries.payment.paymentFailure',
    },
  ],
  REVIEW_SERVICE: [
    {
      value: 'REVIEW_GOOD_SERVICE_FOR_STORE',
      label: 'enquiries.reviewService.goodServiceForStore',
    },
    {
      value: 'REVIEW_GOOD_SERVICE_FOR_ONLINE',
      label: 'enquiries.reviewService.goodServiceForOnline',
    },
    {
      value: 'REPORT_SERVICE_FOR_STORE',
      label: 'enquiries.reviewService.reportForStore',
    },
    {
      value: 'REPORT_SERVICE_FOR_ONLINE',
      label: 'enquiries.reviewService.reportForOnline',
    },
  ],
  REVIEW_REPORT: [
    {
      value: 'REPORT_INAPPROPRIATE_REVIEW',
      label: 'enquiries.reviewReport.inappropriateReview',
    },
    {
      value: 'REPORT_UNRELIABLE_REVIEW',
      label: 'enquiries.reviewReport.unreliableReview',
    },
  ],
};

export const HIGHLIGHT_TYPES = [
  {
    text: 'listingFilterConfig.collections',
    value: 'collections',
  },
  {
    text: 'listingFilterConfig.categories',
    value: 'categories',
  },
];


export const ORDER_TRACKING_STATUS_CONST = {
  pending: {
    value: 'pending',
    text: 'orderTrackingStatus.pending',
    isDefault: true,
    isRefund: true,
    index: 0,
    isPickup: true,
    color: '#FBBC05',
  },
  approved: {
    value: 'approved',
    text: 'orderTrackingStatus.approved',
    textCod: 'orderTrackingStatus.codApproved',
    isDefault: true,
    isRefund: true,
    index: 1,
    isPickup: true,
    color: '#FBBC05',
  },
  in_progress: {
    value: 'in_progress',
    text: 'orderTrackingStatus.inProgress',
    isDefault: true,
    isRefund: true,
    index: 2,
    color: '#4cb1e8',
  },
  in_shipment: {
    value: 'in_shipment',
    text: 'orderTrackingStatus.inShipment',
    isDefault: true,
    isRefund: true,
    index: 3,
    color: '#4cb1e8',
  },
  delivering: {
    value: 'delivering',
    text: 'orderTrackingStatus.delivering',
    textPickup: 'orderTrackingStatus.readyPickup',
    index: 3,
    color: '#4cb1e8',
  },
  refund_requested: {
    value: 'refund_requested',
    text: 'orderTrackingStatus.refundRequested',
    isRefund: true,
    index: 3,
    color: '#EC5500',
  },
  completed: {
    value: 'completed',
    text: 'orderTrackingStatus.deliveredSuccess',
    textPickup: 'orderTrackingStatus.completed',
    isDefault: true,
    index: 4,
    isPickup: true,
    color: '#74AB00',
  },
  returned: {
    value: 'returned',
    text: 'orderTrackingStatus.completed',
    isRefund: true,
    index: 4,
    color: '#74AB00',
  },
  delivered_fail: {
    value: 'delivered_fail',
    text: 'orderTrackingStatus.deliveredFail',
    index: 4,
    color: '#EC5500',
  },
  cancelled: {
    value: 'cancelled',
    text: 'orderTrackingStatus.cancelled',
    index: 3,
    color: '#EC5500',
  },
};

export const ORDER_CANCEL_REASONS = [
  {
    value: 'WRONG_PROMOTION',
    text: 'orders.reasons.wrongPromotion',
  },
  {
    value: 'CANCEL_TO_REORDER',
    text: 'orders.reasons.cancelToReorder',
  },
  {
    value: 'NO_PAYMENT',
    text: 'orders.reasons.noPayment',
  },
  {
    value: 'CUSTOMER_INTENTION',
    text: 'orders.reasons.customerIntention',
  },
  {
    value: 'STOCK_UNAVAILABLE',
    text: 'orders.reasons.stockUnavailable',
  },
  {
    value: 'OUT_OF_DATE',
    text: 'orders.reasons.dateProduct',
  },
  {
    value: 'LATE_DELIVERY',
    text: 'orders.reasons.lateDelivery',
  },
  {
    value: 'DUPLICATED',
    text: 'orders.reasons.duplicated',
  },
  {
    value: 'FAKE_ORDER',
    text: 'orders.reasons.fakeOrder',
  },
  {
    value: 'TEST_ORDER',
    text: 'orders.reasons.testOrder',
  },
  {
    value: 'CANT_CONTACT',
    text: 'orders.reasons.cantContact',
  },
  {
    value: 'OTHER',
    text: 'orders.reasons.other',
  },
];