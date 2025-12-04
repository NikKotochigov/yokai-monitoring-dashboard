'use client';

import { useCaptureYokai } from '../model/use-capture-yokai';
import styles from './capture-button.module.scss';

interface CaptureButtonProps {
  yokaiId: string;
  yokaiName: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function CaptureButton({ yokaiId, yokaiName, onSuccess, onError }: CaptureButtonProps) {
  const { mutate, isPending } = useCaptureYokai();

  const handleCapture = () => {
    mutate(yokaiId, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error.message);
      },
    });
  };

  return (
    <button
      onClick={handleCapture}
      disabled={isPending}
      className={styles.button}
      aria-label={`Capture ${yokaiName}`}
    >
      {isPending ? 'Capturing...' : '⚡ Capture'}
    </button>
  );
}
