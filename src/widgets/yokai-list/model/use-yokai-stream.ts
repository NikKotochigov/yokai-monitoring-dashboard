'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { API_ROUTES, QUERY_KEYS } from '@/shared/config/constants';
import { sseEventSchema } from '@/entities/yokai';
import type { Yokai } from '@/entities/yokai';

export function useYokaiStream() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource(API_ROUTES.YOKAI_STREAM);

    eventSource.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data);
        const data = sseEventSchema.parse(rawData);

        queryClient.setQueryData<Yokai[]>(QUERY_KEYS.YOKAI_LIST, (old) => {
          if (!old) return old;
          return old.map((yokai) =>
            yokai.id === data.yokaiId
              ? { ...yokai, threatLevel: data.threatLevel }
              : yokai
          );
        });
      } catch (error) {
        console.error('Failed to parse SSE event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
}
