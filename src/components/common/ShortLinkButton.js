import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function ShortLinkButton({ url }) {
  const { t } = useTranslation();

  const handleShortenLink = async () => {
    const res = await axios.request({
      method: 'post',
      url: `${process.env.REACT_APP_SHORTLINK_URL}/short-link/create-short-link`,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        // authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
      data: {
        link: `${process.env.REACT_APP_CLIENT_URL}${url}`,
      },
    });
    message.success(t('button.copiedToClipboard'))
    navigator.clipboard.writeText(res?.data?.shortURL)
  }

  return (
    <Button type="link" onClick={handleShortenLink}>
      {t('button.shortenLink')}
    </Button>
  )
}