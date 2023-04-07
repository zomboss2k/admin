import Icon from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { ICCredit } from './icons/credit';
import { ICDropdown } from './icons/dropdown';
import { ICRollback } from './icons/rollback';
import { ICShipping } from './icons/shipping';
import { ICPickup } from './icons/pickup';
import { ICAddImage } from './icons/addImage';
import {
  ICCheckedUnderline,
  ICDelivered,
  ICDollar,
  ICReceipt,
  ICStore,
} from './icons/svg-order';
import {
  ICAdd,
  ICArrowRightDash,
  ICAward,
  ICBookMark,
  ICBox,
  ICCheckTwoColor,
  ICColorMultiple,
  ICColorSingle,
  ICColorTwoTone,
  ICCompany,
  ICCopyright,
  ICCreditCard,
  ICDelivery,
  ICDirection,
  ICDownOutline,
  ICFacebook,
  ICFacebookCircle,
  ICFacebookSecond,
  ICGoogleSpecial,
  ICHorizontal,
  ICInfoCircle,
  ICInstagram,
  ICIsFairuse,
  ICJob,
  ICLeftOutline,
  ICLinkedIn,
  ICLocation,
  ICMail,
  ICMobilePhone,
  ICMoMo,
  ICPayCOD,
  ICPayment,
  ICPhone,
  ICRefund,
  ICRightOutline,
  ICSearch,
  ICShareFilled,
  ICSquare,
  ICTiktok,
  ICTwitter,
  ICUpOutline,
  ICUserFilled,
  ICVertical,
  ICUpload,
} from './svg';

const IconList = {
  shipping: ICShipping,
  credit: ICCredit,
  rollback: ICRollback,
  dropdown: ICDropdown,
  pickup: ICPickup,
  addImage: ICAddImage,
};

const IconWrapper = ({ SVGComponent, svgProps, ...props }) => (
  <Icon
    {...props}
    component={() => <SVGComponent {...svgProps} fill="none" />}
  />
);

IconWrapper.propTypes = {
  SVGComponent: PropTypes.any,
  svgProps: PropTypes.object,
};

export const SVGIcon = ({ name, ...props }) => {
  const Component = useMemo(() => IconList[name], [name]);
  return <IconWrapper {...props} SVGComponent={Component} />;
};

SVGIcon.propTypes = {
  name: PropTypes.string,
};

export const UploadIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICUpload} />
);

export const FacebookIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICFacebook} />
);

export const TwitterIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICTwitter} />
);

export const InstagramIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICInstagram} />
);

export const LinkedInIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICLinkedIn} />
);

export const TiktokIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICTiktok} />
);

export const RightOutlineIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICRightOutline} />
);
export const LeftOutlineIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICLeftOutline} />
);

export const DownOutlineIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICDownOutline} />
);

export const UpOutlineIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICUpOutline} />
);

export const BookMarkIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICBookMark} />
);

export const ShareFilledIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICShareFilled} />
);

export const BoxIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICBox} />
);

export const AwardIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICAward} />
);

export const FacebookSecondIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICFacebookSecond} />
);

export const FacebookCircleIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICFacebookCircle} />
);

export const GoogleSpecialIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICGoogleSpecial} />
);

export const MobilePhoneIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICMobilePhone} />
);

export const ArrowRightDashIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICArrowRightDash} />
);

export const CompanyIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICCompany} />
);

export const JobIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICJob} />
);

export const UserFilledIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICUserFilled} />
);

export const DirectionIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICDirection} />
);

export const CopyrightIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICCopyright} />
);

export const IsFairuseIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICIsFairuse} />
);

export const LocationIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICLocation} />
);

export const PhoneIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICPhone} />
);

export const MailIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICMail} />
);

export const CheckTwoColorIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICCheckTwoColor} />
);

export const SearchIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICSearch} />
);

export const HorizontalIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICHorizontal} />
);

export const VerticalIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICVertical} />
);

export const SquareIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICSquare} />
);

export const ColorSingleIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICColorSingle} />
);

export const ColorTwoToneIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICColorTwoTone} />
);

export const ColorMultipleIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICColorMultiple} />
);

export const InfoCircleIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICInfoCircle} />
);

export const AddIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICAdd} />
);

export const CreditCardIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICCreditCard} />
);

export const MoMoIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICMoMo} />
);

export const PayCODIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICPayCOD} />
);

export const RefundIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICRefund} />
);

export const DeliveryIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICDelivery} />
);

export const PaymentIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICPayment} />
);

export const ReceiptIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICReceipt} />
);

export const DollarIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICDollar} />
);

export const DeliveredIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICDelivered} />
);

export const CheckedUnderlineIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICCheckedUnderline} />
);

export const StoreIcon = (props) => (
  <IconWrapper {...props} SVGComponent={ICStore} />
);
