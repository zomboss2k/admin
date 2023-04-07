import { SUMMARY_CARD_TYPES } from 'configs/localData';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Text from '../Text';
import { SummaryCardWrapper } from './styles';

const SummaryCard = ({
  color,
  value,
  title,
  icon: SummaryIcon,
  percentage,
  type,
  subTitle,
  borderColor = '#fff',
  href,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const SummaryCardIcon = SUMMARY_CARD_TYPES.find(
    (cardType) => cardType.value === type,
  )?.icon;
  return (
    <SummaryCardWrapper
      {...(href && {
        style: {
          cursor: 'pointer',
        },
        onClick: () => {
          history.push(href);
        },
      })}
      color={color}
      borderColor={borderColor}
    >
      <div className="vInfo">
        <div className="row">
          <Text type="h5" className="title">
            {t(title)}
            {subTitle && <div className="size-14 fw-400">{subTitle}</div>}
          </Text>
        </div>
        <div className="row value-div">
          <Text className="value">{value}</Text>
          {!!SummaryIcon && (
            <SummaryIcon
              theme="outlined"
              className="icon"
              style={{ color: '#000' }}
            />
          )}
        </div>
        {percentage && (
          <div className="row">
            <span className="text-bottom">
              <span
                className="percent-value"
                style={{
                  color: SUMMARY_CARD_TYPES.find(
                    (cardType) => cardType.value === type,
                  )?.color,
                }}
              >
                <SummaryCardIcon
                  style={{
                    color: SUMMARY_CARD_TYPES.find(
                      (cardType) => cardType.value === type,
                    )?.color,
                  }}
                />
                {`${percentage}% `}
              </span>
              <span className="text">
                {t(
                  SUMMARY_CARD_TYPES.find((cardType) => cardType.value === type)
                    ?.text,
                )}
              </span>
            </span>
          </div>
        )}
      </div>
    </SummaryCardWrapper>
  );
};
SummaryCard.propTypes = {
  color: PropTypes.string,
  value: PropTypes.any,
  title: PropTypes.any,
  icon: PropTypes.any,
  type: PropTypes.string,
  percentage: PropTypes.number,
};

export default SummaryCard;
