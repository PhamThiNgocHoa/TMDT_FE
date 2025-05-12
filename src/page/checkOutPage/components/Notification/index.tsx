import React, { useEffect } from 'react';
import styles from './styles.module.css';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  type, 
  onClose,
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p className={styles.message}>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
