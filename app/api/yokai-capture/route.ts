import { NextResponse } from 'next/server';
import { CAPTURE_ERROR_RATE } from '@/shared/config/constants';

export async function POST(request: Request) {
  try {
    const { yokaiId } = await request.json();

    if (!yokaiId) {
      return NextResponse.json(
        { error: 'Yokai ID is required' },
        { status: 400 }
      );
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 30% probability of failure
    if (Math.random() < CAPTURE_ERROR_RATE) {
      return NextResponse.json(
        { error: 'Capture failed - yokai escaped!' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      yokaiId,
      capturedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
