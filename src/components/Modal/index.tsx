import './Modal.css';
import { IModalProps } from '../../types';
import { useEffect } from 'react';

export function Modal({ isOpen, onClose, children, title }: IModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h3>{title}</h3>
          <button onClick={onClose} className='close-button'>
            &times;
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
}
