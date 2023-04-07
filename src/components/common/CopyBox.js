import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';

const CopyBoxStyled = styled.div`
  word-break: break-word;
  border: 1px solid #efefef;
  padding: 5px;
  border-radius: 5px;
  flex: 1;
`;

export default function CopyBox({ value }) {
  const { t } = useTranslation();

  const handleCopy = async () => {
    message.success(t('button.copiedToClipboard'));
    navigator.clipboard.writeText(value);
  };

  return (
    <CopyBoxStyled className="description d-flex flex-1">
      <div className="flex-1">{value}</div>
      <Button icon={<CopyOutlined />} type="link" onClick={handleCopy}></Button>
    </CopyBoxStyled>
  );
}
