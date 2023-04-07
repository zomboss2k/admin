import { Col, Row } from 'antd';
import SummaryCard from 'components/common/SummaryCard';
import { sum } from 'lodash';
import { useTranslation } from 'react-i18next';

export default function EcommerceDepartment({ summaries }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="size-20 mt-50 mb-20 fw-600">
        {t('summaries.ecomDepartment')}
      </div>
      <Row gutter={[16, 16]}>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            subTitle={t('orderStatus.pending')}
            value={sum(Object.values(summaries?.pending || {})) ?? 'N/A'}
            href="/pendingOrders"
            color="#8100A1"
          />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            subTitle={`${t('orderStatus.pending')}(STD)`}
            value={sum(Object.values(summaries?.pending || {})) ?? 'N/A'}
            href="/pendingOrders"
            color="#D97AF1DE"
          />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            subTitle={`${t('orderStatus.pending')}(24h)`}
            value={sum(Object.values(summaries?.pending || {})) ?? 'N/A'}
            href="/pendingOrders"
            color="#D97AF1DE"
          />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            value={summaries?.approvedWithoutSo ?? 'N/A'}
            subTitle={t('orderStatus.validated')}
            href="/validatedOrders"
          />
        </Col>
      </Row>
    </div>
  );
}
