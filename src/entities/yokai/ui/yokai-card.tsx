import { Yokai } from '../model/types';
import styles from './yokai-card.module.scss';

interface YokaiCardProps {
  yokai: Yokai;
  onCapture?: () => void;
  isCapturing?: boolean;
}

export function YokaiCard({ yokai, onCapture, isCapturing }: YokaiCardProps) {
  const threatLevelColors = {
    low: '#3fb950',
    medium: '#d29922',
    high: '#f85149',
    critical: '#da3633',
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{yokai.name}</h3>
        <span
          className={`${styles.threatBadge} ${styles[`threat-${yokai.threatLevel}`]}`}
          style={{ backgroundColor: threatLevelColors[yokai.threatLevel] }}
        >
          {yokai.threatLevel.toUpperCase()}
        </span>
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{yokai.location}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.value} ${styles[`status-${yokai.status}`]}`}>
            {yokai.status === 'active' ? '🔴 Active' : '✅ Captured'}
          </span>
        </div>
      </div>

      {yokai.status === 'active' && onCapture && (
        <button
          onClick={onCapture}
          disabled={isCapturing}
          className={styles.captureButton}
        >
          {isCapturing ? 'Capturing...' : '⚡ Capture'}
        </button>
      )}
    </div>
  );
}
