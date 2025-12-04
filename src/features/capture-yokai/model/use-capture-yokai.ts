import { useMutation, useQueryClient } from '@tanstack/react-query';
import { captureYokaiApi } from '../api/capture-yokai';
import { QUERY_KEYS } from '@/shared/config/constants';
import type { Yokai } from '@/entities/yokai';

export function useCaptureYokai() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: captureYokaiApi,

    // Optimistic update
    onMutate: async (yokaiId: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.YOKAI_LIST });

      // Snapshot the previous value
      const previousYokaiList = queryClient.getQueryData<Yokai[]>(QUERY_KEYS.YOKAI_LIST);

      // Optimistically update to the new value
      queryClient.setQueryData<Yokai[]>(QUERY_KEYS.YOKAI_LIST, (old) => {
        if (!old) return old;
        return old.map((yokai) =>
          yokai.id === yokaiId ? { ...yokai, status: 'captured' as const } : yokai
        );
      });

      // Return context with the previous value
      return { previousYokaiList };
    },

    // If mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousYokaiList) {
        queryClient.setQueryData(QUERY_KEYS.YOKAI_LIST, context.previousYokaiList);
      }
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YOKAI_LIST });
    },
  });
}
