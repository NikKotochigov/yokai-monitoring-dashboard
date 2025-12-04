'use client';

import { useState } from 'react';
import { YokaiCard } from '@/entities/yokai';
import { useCaptureYokai } from '@/features/capture-yokai';
import { Notification } from '@/shared/ui';
import { useYokaiList } from '../model/use-yokai-list';
import { useYokaiStream } from '../model/use-yokai-stream';
import styles from './yokai-list.module.scss';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function YokaiList() {
  const { data: yokaiList, isLoading, error } = useYokaiList();
  const { mutate: captureYokai, isPending } = useCaptureYokai();
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [capturingId, setCapturingId] = useState<string | null>(null);

  // Subscribe to SSE updates
  useYokaiStream();

  const handleCapture = (yokaiId: string, yokaiName: string) => {
    setCapturingId(yokaiId);
    captureYokai(yokaiId, {
      onSuccess: () => {
        setNotification({
          message: `✅ Successfully captured ${yokaiName}!`,
          type: 'success',
        });
        setCapturingId(null);
      },
      onError: (error) => {
        setNotification({
          message: `❌ ${error.message}`,
          type: 'error',
        });
        setCapturingId(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading yokai data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>⚠️ Error loading yokai data</p>
          <small>{error.message}</small>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {yokaiList?.map((yokai) => (
          <YokaiCard
            key={yokai.id}
            yokai={yokai}
            onCapture={() => handleCapture(yokai.id, yokai.name)}
            isCapturing={isPending && capturingId === yokai.id}
          />
        ))}
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
