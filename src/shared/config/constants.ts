export const API_ROUTES = {
  YOKAI_LIST: '/api/yokai',
  YOKAI_CAPTURE: '/api/yokai-capture',
  YOKAI_STREAM: '/api/yokai-stream',
} as const;

export const QUERY_KEYS = {
  YOKAI_LIST: ['yokai-list'],
} as const;

export const SSE_UPDATE_INTERVAL = 5000; // 5 seconds
export const CAPTURE_ERROR_RATE = 0.3; // 30% error rate
