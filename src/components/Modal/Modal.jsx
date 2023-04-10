import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalCss from '../Modal/Modal.module.css';

export const Modal = ({ options, closeModal }) => {
  const largeImage = options;

  useEffect(() => {
    const handleKeyESC = ({ code }) => {
      if (code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyESC);

    return () => {
      window.removeEventListener('keydown', handleKeyESC);
    };
  }, [closeModal]);

  const handleClick = ({ target: { nodeName } }) => {
    if (nodeName === 'DIV') closeModal();
  };

  return (
    <div className={ModalCss.overlay} onClick={handleClick}>
      <div className={ModalCss.modal}>
        <img src={largeImage} alt="bigFoto" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  props: PropTypes.shape({
    largeImage: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
