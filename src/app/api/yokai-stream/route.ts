import {SSE_UPDATE_INTERVAL} from '@/shared/config/constants';

export async function GET(request: Request) {
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    const interval = setInterval(async () => {
        try {
            const randomYokaiId = String(Math.floor(Math.random() * 6) + 1);

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
            writer.close().catch(() => {
            });
        }
    }, SSE_UPDATE_INTERVAL);

    request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        writer.close().catch(() => {
        });
    });

    return new Response(stream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no',
        },
    });
}
