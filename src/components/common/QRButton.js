import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

export default function QRButton({ url }) {
  const { t } = useTranslation();

  const handleQRCode = () => {
    Modal.info({
      content: (
        <div className="flex-center">
          <img src={`http://api.qrserver.com/v1/create-qr-code/?data=${process.env.REACT_APP_CLIENT_URL}${url}&size=240x240`} />
        </div>
      ),
      icon: <div />,
    })
  }

  return (
    <Button type="link" onClick={handleQRCode}>
      {t('button.viewQRCode')}
    </Button>
  )
}