import { Line } from '@ant-design/plots';
import { Card, Col, Row } from 'antd';
import Text from 'components/common/Text';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { formatMoney, formatNumberByThousand } from 'utils/textUtils';

const data = [
  {
    Date: '2010-01-01',
    scales: 1998,
  },
  {
    Date: '2010-02-01',
    scales: 1850,
  },
  {
    Date: '2010-03-01',
    scales: 1720,
  },
  {
    Date: '2010-04-01',
    scales: 1818,
  },
  {
    Date: '2010-05-01',
    scales: 1920,
  },
  {
    Date: '2010-06-01',
    scales: 1802,
  },
  {
    Date: '2010-07-01',
    scales: 1945,
  },
  {
    Date: '2010-08-01',
    scales: 1856,
  },
  {
    Date: '2010-09-01',
    scales: 2107,
  },
  {
    Date: '2010-10-01',
    scales: 2140,
  },
  {
    Date: '2010-11-01',
    scales: 2311,
  },
  {
    Date: '2010-12-01',
    scales: 1972,
  },
  {
    Date: '2011-01-01',
    scales: 1760,
  },
  {
    Date: '2011-02-01',
    scales: 1824,
  },
  {
    Date: '2011-03-01',
    scales: 1801,
  },
  {
    Date: '2011-04',
    scales: 2001,
  },
  {
    Date: '2011-05-01',
    scales: 1640,
  },
  {
    Date: '2011-06-01',
    scales: 1502,
  },
  {
    Date: '2011-07-01',
    scales: 1621,
  },
  {
    Date: '2011-08-01',
    scales: 1480,
  },
  {
    Date: '2011-09-01',
    scales: 1549,
  },
  {
    Date: '2011-10-01',
    scales: 1390,
  },
  {
    Date: '2011-11-01',
    scales: 1325,
  },
  {
    Date: '2011-12-01',
    scales: 1250,
  },
  {
    Date: '2022-01-01',
    scales: 1394,
  },
  {
    Date: '2022-02-01',
    scales: 1406,
  },
  {
    Date: '2022-03-01',
    scales: 1578,
  },
  {
    Date: '2022-04-01',
    scales: 1465,
  },
  {
    Date: '2022-06-24',
    scales: 1689,
  },
];

const MostPurchasedStyle = styled(Card)`
  .avatar {
    width: 39px;
    height: 39px;
    border-radius: 5px;
  }
  .ant-list-item-meta-title {
    font-weight: 500;
    margin-bottom: 0px;
  }
  .ant-list-item-meta-description {
    font-size: 12px;
  }
  .ant-list-item {
    align-items: flex-start;
  }
  .ant-list-item-action {
    li {
      color: ${({ theme }) => theme.palette.primary};
      font-weight: 600;
      font-size: 14px;
    }
  }
  .chart-bg {
    height: 240px;
  }
`;

const config = {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  yAxis: {
    tickCount: 4,
    label: {
      formatter: (e) => {
        return formatNumberByThousand(e);
      },
    },
  },
  color: '#38BDF8',
  slider: {
    start: 0,
    end: 1,
  },
  xAxis: {
    label: {
      formatter: (e) => {
        console.log(moment().format('YYYY-MM-DD'));
        return e === moment().format('YYYY-MM-DD') ? 'Today' : e;
      },
    },
  },
};
export default function Revenue({ summaries }) {
  const { t } = useTranslation();
  const _summaries = [
    {
      title: 'BOS',
      value: formatMoney(summaries?.revenue),
      color: '#A7CF51',
    },
    {
      title: 'RBX',
      value: formatMoney(0),
      color: '#F26D65',
    },
    {
      title: 'BBX',
      value: formatMoney(0),
      color: '#1A52BB',
    },
    {
      title: 'Devtify',
      value: formatMoney(0),
      color: '#88038B',
    },
  ];

  return (
    <MostPurchasedStyle title={t('summaries.revenue')}>
      <Row gutter={[16, 16]}>
        <Col xs={12} md={14}>
          <Text type="h2">
            <b>{formatMoney(summaries?.revenue)}</b>
          </Text>
          <Text className="note semiBold">
            {t('summaries.unearnedRevenue')}
          </Text>
          <Text type="h4">{formatMoney(summaries?.revenue)}</Text>
        </Col>
        <Col xs={12} md={10}>
          {_summaries.map((e) => (
            <div key={e.title} className="d-flex space-between">
              <Text className="semiBold txt-grey">{e.title}</Text>
              <Text className="semiBold" style={{ color: e.color }}>
                {e.value}
              </Text>
            </div>
          ))}
        </Col>
      </Row>
      <br />
      <div className="chart-bg">
        <Line {...config} />
      </div>
    </MostPurchasedStyle>
  );
}
