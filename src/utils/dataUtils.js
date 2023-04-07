import i18next from 'i18next';
import compact from 'lodash/compact';
import moment from 'moment';

export const formatUserName = (user) => {
  // if(user?.username) return `@${user?.username}`;
  if (user?.firstName || user?.lastName)
    return `${user?.firstName || ''} ${user?.lastName || ''}`;
  return user?.email || user?.phone;
};

export const formatFullAddressCustomer = (item) => {
  return compact([
    item?.addressLine2,
    item?.addressLine1,
    item?.ward,
    item?.district,
    item?.province,
  ]).join(', ');
};

export const formatDataI18n = (displayName, name) => {
  return displayName?.[i18next.language] || name;
};

export const getExtraFilterPromotions = (codeFilter = { $notnull: true }) =>
  JSON.stringify({
    $and: [
      {
        $or: [
          {
            $and: [
              {
                startDate: {
                  $lte: moment().startOf('date').toISOString(),
                },
              },
              {
                endDate: {
                  $gte: moment().endOf('date').toISOString(),
                },
              },
            ],
          },
          {
            $and: [
              {
                endDate: {
                  $isnull: true,
                },
              },
            ],
          },
        ],
      },
      {
        isActive: {
          $eq: true,
        },
      },
      {
        code: codeFilter,
      },
    ],
  });
