import { useCallback, useState } from 'react';

const useToggleModal = () => {
  const [visible, setVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setVisible((v) => !v);
  }, []);

  return { visible, toggleModal };
};

export default useToggleModal;
