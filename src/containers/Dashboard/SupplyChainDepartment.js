import { Col, Row } from 'antd';
import SummaryCard from 'components/common/SummaryCard';
import { useTranslation } from 'react-i18next';

export default function SupplyChainDepartment({ summaries }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="size-20 mt-50 fw-600">
        {t('summaries.supplyChainDepartment')}
      </div>
      <Row gutter={[16, 16]}>
        <Col md={12} sm={12} xs={24}>
          <div className="size-16 mt-20 mb-20 fw-600">Ho Chi Minh City</div>
          <Row gutter={[16, 16]}>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={
                  summaries?.approvedWithSo +
                    summaries?.approvedInBatch +
                    summaries?.waitingForPackage +
                    summaries?.waitingForShipment ?? 'N/A'
                }
                subTitle={t('orderStatus.totalProcess')}
                href="/confirmedOrders"
                color="#1A52BB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.approvedWithSo ?? 'N/A'}
                subTitle={t('orderStatus.toBeProcessed')}
                href="/confirmedOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.approvedInBatch ?? 'N/A'}
                subTitle={t('orderStatus.approved')}
                href="/processingOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.waitingForPackage ?? 'N/A'}
                subTitle={t('orderStatus.waitingPackage')}
                href="/wspOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.waitingForShipment ?? 'N/A'}
                subTitle={t('orderStatus.waitingShipment')}
                href="/waitingShipmentOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.delivering ?? 'N/A'}
                subTitle={t('orderStatus.pendingProcessingOrders')}
                href="/pendingProcessingOrders"
                color="#FFB800"
              />
            </Col>
          </Row>
        </Col>
        <Col md={12} sm={12} xs={24}>
          <div className="size-16 mt-20 mb-20 fw-600">Hanoi</div>
          <Row gutter={[16, 16]}>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={
                  summaries?.approvedWithSo +
                    summaries?.approvedInBatch +
                    summaries?.waitingForPackage +
                    summaries?.waitingForShipment ?? 'N/A'
                }
                subTitle={t('orderStatus.totalProcess')}
                href="/confirmedOrders"
                color="#1A52BB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.approvedWithSo ?? 'N/A'}
                subTitle={t('orderStatus.toBeProcessed')}
                href="/confirmedOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.approvedInBatch ?? 'N/A'}
                subTitle={t('orderStatus.approved')}
                href="/processingOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.waitingForPackage ?? 'N/A'}
                subTitle={t('orderStatus.waitingPackage')}
                href="/wspOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.waitingForShipment ?? 'N/A'}
                subTitle={t('orderStatus.waitingShipment')}
                href="/waitingShipmentOrders"
                color="#3C7EFB"
              />
            </Col>
            <Col md={12} sm={12} xs={12}>
              <SummaryCard
                value={summaries?.delivering ?? 'N/A'}
                subTitle={t('orderStatus.pendingProcessingOrders')}
                href="/pendingProcessingOrders"
                color="#FFB800"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
