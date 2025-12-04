import { SSE_UPDATE_INTERVAL } from '@/shared/config/constants';

export async function GET() {
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  // Send SSE events every 5 seconds
  const interval = setInterval(async () => {
    try {
      // Random yokai ID (1-6)
      const randomYokaiId = String(Math.floor(Math.random() * 6) + 1);
      
      // Random threat level
      const levels = ['low', 'medium', 'high', 'critical'] as const;
      const newLevel = levels[Math.floor(Math.random() * levels.length)];

      const data = JSON.stringify({
        yokaiId: randomYokaiId,
        threatLevel: newLevel,
        timestamp: new Date().toISOString(),
      });

      await writer.write(encoder.encode(`data: ${data}\n\n`));
    } catch (error) {
      console.error('Error writing SSE event:', error);
      clearInterval(interval);
    }
  }, SSE_UPDATE_INTERVAL);

  // Clean up on connection close
  const cleanup = () => {
    clearInterval(interval);
    writer.close();
  };

  // Handle client disconnect
  setTimeout(() => {
    // This is a fallback cleanup, actual cleanup happens when client closes
  }, 0);

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
