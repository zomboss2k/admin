import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ViewOnClientSiteButton({ url }) {
  const { t } = useTranslation();

  return (
    <Button
      type="link"
      onClick={() => window.open(`${process.env.REACT_APP_CLIENT_URL}${url}`, '_blank', 'noopener,noreferrer')?.focus()}
    >
      {t('button.viewOnWebsite')}
    </Button>
  )
}