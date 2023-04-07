import { Progress } from 'antd';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { RATINGS } from 'configs/localData';
import RateCustom from '../Rate';
import OverallRatingStyles from './styles';
import { useTranslation } from 'react-i18next';

const OverallRating = ({ theme, rate, reviews, ratings }) => {
  const { t } = useTranslation();
  return (
    <OverallRatingStyles>
      <div className="header-overall">
        <span className="rate-number">{rate}</span>
        <span className="overallRating-text">{t('overallRating.text')}</span>
        <RateCustom rate={rate} />
        <span className="reviews">
          {`${t('reviews.totalReview')} (${reviews})`}
        </span>
      </div>
      <div className="progress-rating">
        {RATINGS.map((item, i) => (
          <div key={String(i)} className="start-item">
            <div className="title-rating">
              <span>{item.text}</span>
              <span>{ratings?.summaries[item.value]}</span>
            </div>
            <div className="progress">
              <Progress
                strokeColor={theme.palette.primary}
                percent={Math.round(
                  (ratings?.summaries[item.value] / reviews) * 100,
                )}
                status="active"
                showInfo={false}
              />
            </div>
          </div>
        ))}
        {/* {ratings?.summaries.reverse().map((item, i) => (
          
        ))} */}
      </div>
    </OverallRatingStyles>
  );
};

OverallRating.propTypes = {
  rate: PropTypes.number,
  reviews: PropTypes.number,
  ratings: PropTypes.object,
  theme: PropTypes.object,
};
export default withTheme(OverallRating);
