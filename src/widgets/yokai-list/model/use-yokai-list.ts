'use client';

import { useQuery } from '@tanstack/react-query';
import { getYokaiList } from '@/entities/yokai';
import { QUERY_KEYS } from '@/shared/config/constants';

export function useYokaiList() {
  return useQuery({
    queryKey: QUERY_KEYS.YOKAI_LIST,
    queryFn: getYokaiList,
    refetchInterval: false,
  });
}
