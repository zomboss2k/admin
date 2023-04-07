import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Modal } from 'antd';
import { acceptPrint } from 'utils/tools';
import { QRCodeUIWrapper } from './styles';

const QRCodeUI = ({ data, size }) => {
  const [visible, setVisible] = useState(false);
  const onPrint = () => {
    acceptPrint();
  };

  return (
    <>
      <QRCodeUIWrapper className="pointer" onClick={() => setVisible(true)}>
        {!!data && <QRCode size={size} value={data} />}
      </QRCodeUIWrapper>
      {visible && (
        <Modal
          onCancel={() => setVisible(false)}
          okText="Print"
          onOk={onPrint}
          open={visible}
        >
          <div id="print-content" className="center text-center">
            <QRCode size={200} value={data} />
          </div>
        </Modal>
      )}
    </>
  );
};

QRCodeUI.propTypes = {
  data: PropTypes.string,
  size: PropTypes.number,
};

QRCodeUI.defaultProps = {
  size: 80,
};

export default QRCodeUI;
