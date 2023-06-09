import { Line } from '@ant-design/plots';
import { Card, Divider } from 'antd';
import Text from 'components/common/Text';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { formatNumberByThousand } from 'utils/textUtils';

const data = [
  {
    date: 'yesterday',
    time: '13.00',
    cpu: 63.93689627294421,
  },
  {
    date: 'yesterday',
    time: '13.05',
    cpu: 65.06585239044342,
  },
  {
    date: 'yesterday',
    time: '13.10',
    cpu: 66.42719381417056,
  },
  {
    date: 'yesterday',
    time: '13.15',
    cpu: 63.060669399125935,
  },
  {
    date: 'yesterday',
    time: '13.20',
    cpu: 64.04639809297761,
  },
  {
    date: 'yesterday',
    time: '13.25',
    cpu: 64.45117682728456,
  },
  {
    date: 'yesterday',
    time: '13.30',
    cpu: 63.35488066344804,
  },
  {
    date: 'yesterday',
    time: '13.35',
    cpu: 65.2969449309885,
  },
  {
    date: 'yesterday',
    time: '13.40',
    cpu: 66.35014444552017,
  },
  {
    date: 'yesterday',
    time: '13.45',
    cpu: 66.198378961063,
  },
  {
    date: 'yesterday',
    time: '13.50',
    cpu: 66.85520134738813,
  },
  {
    date: 'yesterday',
    time: '13.55',
    cpu: 65.05419984325125,
  },
  {
    date: 'yesterday',
    time: '14.00',
    cpu: 66.62243229531435,
  },
  {
    date: 'yesterday',
    time: '14.05',
    cpu: 66.77808066603122,
  },
  {
    date: 'yesterday',
    time: '14.10',
    cpu: 66.9144977524293,
  },
  {
    date: 'yesterday',
    time: '14.15',
    cpu: 65.05499508303669,
  },
  {
    date: 'yesterday',
    time: '14.20',
    cpu: 66.36871158902638,
  },
  {
    date: 'yesterday',
    time: '14.25',
    cpu: 63.973903073723044,
  },
  {
    date: 'yesterday',
    time: '14.30',
    cpu: 64.92585536363889,
  },
  {
    date: 'yesterday',
    time: '14.35',
    cpu: 65.17145801764055,
  },
  {
    date: 'yesterday',
    time: '14.40',
    cpu: 64.42516834555609,
  },
  {
    date: 'yesterday',
    time: '14.45',
    cpu: 63.701363912573775,
  },
  {
    date: 'yesterday',
    time: '14.50',
    cpu: 66.11568649665543,
  },
  {
    date: 'yesterday',
    time: '14.55',
    cpu: 64.0474592964878,
  },
  {
    date: 'yesterday',
    time: '15.00',
    cpu: 64.25676632707459,
  },
  {
    date: 'yesterday',
    time: '15.00',
    cpu: 65,
  },
  {
    time: '13.00',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.05',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.10',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.15',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.20',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.25',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.30',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.35',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.40',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.45',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.50',
    cpu: 100,
    date: 'today',
  },
  {
    time: '13.55',
    cpu: 100,
    date: 'today',
  },
  {
    time: '14.00',
    cpu: 65,
    date: 'today',
  },
  {
    time: '14.05',
    cpu: 72.16886580736812,
    date: 'today',
  },
  {
    time: '14.10',
    cpu: 68.57230489482068,
    date: 'today',
  },
  {
    time: '14.15',
    cpu: 71.43150028596347,
    date: 'today',
  },
  {
    time: '14.20',
    cpu: 78.14636866352923,
    date: 'today',
  },
  {
    time: '14.25',
    cpu: 68.36883432160218,
    date: 'today',
  },
  {
    time: '14.30',
    cpu: 75.39521675212667,
    date: 'today',
  },
  {
    time: '14.35',
    cpu: 75.27433214647408,
    date: 'today',
  },
  {
    time: '14.40',
    cpu: 82.10189835378893,
    date: 'today',
  },
  {
    time: '14.45',
    cpu: 84.7261454369566,
    date: 'today',
  },
  {
    time: '14.50',
    cpu: 78.96269733695286,
    date: 'today',
  },
  {
    time: '14.55',
    cpu: 86.43607929073264,
    date: 'today',
  },
  {
    time: '15.00',
    cpu: 85,
    date: 'today',
  },
];

const SalesStyle = styled(Card)`
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
    background-color: #fbfcf8;
    height: 100px;
  }
`;

export default function Sales() {
  const { t } = useTranslation();
  const summaries = [
    {
      title: 'BOS',
      value: formatNumberByThousand(120),
      color: '#A7CF51',
    },
    {
      title: 'RBX',
      value: formatNumberByThousand(30),
      color: '#F26D65',
    },
    {
      title: 'BBX',
      value: formatNumberByThousand(50),
      color: '#1A52BB',
    },
    {
      title: 'Devtify',
      value: formatNumberByThousand(23),
      color: '#88038B',
    },
  ];

  const config = {
    data,
    padding: 'auto',
    xField: 'time',
    yField: 'cpu',
    seriesField: 'date',
    legend: false,
    xAxis: false,
    yAxis: false,
    colorField: 'time',
    color: ({ date }) => {
      const _colors = summaries.map((e) => e.color);
      switch (date) {
        case 'yesterday':
          return _colors[0];
        case 'today':
          return _colors[1];
        default:
          return _colors[2];
      }
    },
  };
  return (
    <SalesStyle title={t('summaries.totalSentEmail')}>
      {summaries.map((e) => (
        <div key={e.title} className="d-flex space-between mt-5">
          <Text className="semiBold txt-grey">{e.title}</Text>
          <Text className="h3" fontWeight="bold" style={{ color: e.color }}>
            {e.value}
          </Text>
        </div>
      ))}
      <Divider className="" />
      <div key="Total" className="d-flex space-between">
        <Text className="semiBold txt-grey">Total</Text>
        <Text className="h3" fontWeight="bold" style={{ color: '#000' }}>
          {formatNumberByThousand(233)}
        </Text>
      </div>
      <br />
      <div className="chart-bg">
        <Line {...config} />
      </div>
    </SalesStyle>
  );
}
