import { API_ROUTES } from '@/shared/config/constants';
import { captureResponseSchema } from '@/entities/yokai';

export async function captureYokaiApi(yokaiId: string) {
  const response = await fetch(API_ROUTES.YOKAI_CAPTURE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ yokaiId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to capture yokai');
  }

  const data = await response.json();
  return captureResponseSchema.parse(data);
}
