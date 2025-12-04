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
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.YOKAI_LIST });

      const previousYokaiList = queryClient.getQueryData<Yokai[]>(QUERY_KEYS.YOKAI_LIST);

      queryClient.setQueryData<Yokai[]>(QUERY_KEYS.YOKAI_LIST, (old) => {
        if (!old) return old;
        return old.map((yokai) =>
          yokai.id === yokaiId ? { ...yokai, status: 'captured' as const } : yokai
        );
      });

      return { previousYokaiList };
    },

    onError: (err, variables, context) => {
      if (context?.previousYokaiList) {
        queryClient.setQueryData(QUERY_KEYS.YOKAI_LIST, context.previousYokaiList);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.YOKAI_LIST });
    },
  });
}
