import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PaymentMethodsStyle = styled(Card)`
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

export default function PaymentMethods() {
  const { t } = useTranslation();
  const summaries = [
    {
      title: 'Momo',
      value: 100,
      color: '#6366F1',
    },
    {
      title: 'Payoo',
      value: 41,
      color: '#22D3EE',
    },
    {
      title: 'COD',
      value: 20,
      color: '#3730A3',
    },
  ];

  const config = {
    appendPadding: 10,
    data: summaries,
    angleField: 'value',
    colorField: 'title',
    color: ({ title }) => {
      return summaries.find((e) => e.title === title)?.color;
    },
    radius: 1,
    innerRadius: 0.8,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        content: '',
      },
    },
    legend: {
      position: 'bottom',
      title: (e) => {
        console.log('e', e);
      },
    },
  };

  return (
    <PaymentMethodsStyle title={t('summaries.paymentMethods')}>
      <div className="chart-bg">
        <Pie {...config} />
      </div>
    </PaymentMethodsStyle>
  );
}
