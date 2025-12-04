import { NextResponse } from 'next/server';
import { yokaiListSchema } from '@/entities/yokai';

const yokaiData = [
  {
    id: '1',
    name: 'Kitsune',
    threatLevel: 'medium' as const,
    location: 'Shibuya',
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Tengu',
    threatLevel: 'high' as const,
    location: 'Shinjuku',
    status: 'active' as const,
  },
  {
    id: '3',
    name: 'Kappa',
    threatLevel: 'low' as const,
    location: 'Asakusa',
    status: 'active' as const,
  },
  {
    id: '4',
    name: 'Oni',
    threatLevel: 'critical' as const,
    location: 'Roppongi',
    status: 'active' as const,
  },
  {
    id: '5',
    name: 'Yurei',
    threatLevel: 'medium' as const,
    location: 'Harajuku',
    status: 'active' as const,
  },
  {
    id: '6',
    name: 'Tanuki',
    threatLevel: 'low' as const,
    location: 'Akihabara',
    status: 'active' as const,
  },
];

export async function GET() {
  try {
    const validated = yokaiListSchema.parse(yokaiData);
    
    return NextResponse.json(validated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch yokai data' },
      { status: 500 }
    );
  }
}
