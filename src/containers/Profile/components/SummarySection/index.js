import { OrderedListOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { withTheme } from 'styled-components';
import SummaryStyles from './styles';

const Summary = ({ theme }) => {
  const { t } = useTranslation();
  const { summary } = useSelector((state) => state.auth.data);
  const SUMMARIES = [
    {
      icon: OrderedListOutlined,
      title: 'Total Artist',
      value: summary?.totalOrder || 0,
      color: theme.palette.color[0],
    },
  ];
  return (
    <SummaryStyles>
      <div className="summary-title">{t('profile.summary')}</div>
      <div className="summary-section">
        {SUMMARIES.map((data) => (
          <div key={data.title} className="summary-item">
            <div style={{ background: data.color }} className="summary-icon">
              <data.icon style={{ fontSize: 30, color: 'white' }} />
            </div>
            <div className="summary-content">
              <div className="total">{data.value}</div>
              <div className="title">{t(data.title)}</div>
            </div>
          </div>
        ))}
      </div>
    </SummaryStyles>
  );
};

Summary.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(Summary);
