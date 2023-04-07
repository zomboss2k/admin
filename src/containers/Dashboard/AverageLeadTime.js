import { Card, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const dataSource = [
  {
    title: 'Order confirmation',
    actual: '0:15',
    kpi: '0:15',
    level: 1,
  },
  {
    title: 'Bot',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'Human',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'SO creation',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },

  {
    title: 'Order processing',
    actual: '0:15',
    kpi: '0:15',
    level: 1,
  },
  {
    title: 'Batch creation',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'Picking',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'Packing',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },

  {
    title: 'Shipment',
    actual: '0:15',
    kpi: '0:15',
    level: 1,
  },
  {
    title: 'Standard',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'Tiki',
    actual: '0:15',
    kpi: '0:15',
    level: 3,
  },
  {
    title: 'Nội tỉnh',
    actual: '0:15',
    kpi: '0:15',
    level: 4,
  },
  {
    title: 'Liên tỉnh',
    actual: '0:15',
    kpi: '0:15',
    level: 4,
  },
  {
    title: '24h',
    actual: '0:15',
    kpi: '0:15',
    level: 2,
  },
  {
    title: 'Ahamove',
    actual: '0:15',
    kpi: '0:15',
    level: 3,
  },
];

const AverageLeadTimeStyle = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
  .ant-table-thead {
    background-color: white;
    font-weight: 600;
    font-size: 16px;
    .ant-table-cell {
      background-color: white;
      &::before {
        display: none;
      }
    }
  }
  tr {
    th:last-child {
      text-align: right;
    }
  }
  .txt-actual {
    font-weight: 600;
    font-size: 14px;
    color: #88c041;
  }
  .txt-kpi {
    font-weight: 600;
    font-size: 14px;
    color: #1a52bb;
    text-align: right;
  }
  .txt-level-1 {
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  }
  .txt-level-2 {
    font-size: 14px;
    color: #000000;
    padding-left: 15px;
  }
  .txt-level-3 {
    font-size: 14px;
    color: #000000;
    padding-left: 30px;
  }
  .txt-level-4 {
    font-size: 14px;
    color: #000000;
    padding-left: 45px;
  }
  .ant-table-tbody > tr > td {
    border: 0px;
    padding: 3px 16px;
  }
`;

export default function AverageLeadTime() {
  const { t } = useTranslation();
  return (
    <AverageLeadTimeStyle>
      <Table pagination={false} dataSource={dataSource}>
        <Table.Column
          render={(e, record) => (
            <div className={`txt-title txt-level-${record.level}`}>{e}</div>
          )}
          key="title"
          dataIndex="title"
          title={t('summaries.leadTime')}
        />
        <Table.Column
          render={(e) => <div className="txt-actual">{e}</div>}
          key="actual"
          dataIndex="actual"
          title="Actual"
        />
        <Table.Column
          render={(e) => <div className="txt-kpi">{e}</div>}
          key="kpi"
          dataIndex="kpi"
          title="KPI"
        />
      </Table>
    </AverageLeadTimeStyle>
  );
}
