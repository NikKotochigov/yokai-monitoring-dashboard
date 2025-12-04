import { yokaiListSchema } from './schemas';
import { API_ROUTES } from '@/shared/config/constants';

export async function getYokaiList() {
  const response = await fetch(API_ROUTES.YOKAI_LIST);
  
  if (!response.ok) {
    throw new Error('Failed to fetch yokai list');
  }
  
  const data = await response.json();
  return yokaiListSchema.parse(data);
}
