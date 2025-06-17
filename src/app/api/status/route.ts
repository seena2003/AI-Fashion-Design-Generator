import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const predictionId = request.nextUrl.searchParams.get('id');
  
  if (!predictionId) {
    return NextResponse.json(
      { error: 'Prediction ID is required' },
      { status: 400 }
    );
  }
  
  // For demo purposes, just return a success with a mock image
  return NextResponse.json({
    status: 'succeeded',
    resultImage: '/demo-results/fashion-result-1.jpg'
  });
}