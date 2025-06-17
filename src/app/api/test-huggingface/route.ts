import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
  try {
    // Log API key information (safely)
    const apiKey = process.env.HUGGINGFACE_API_KEY || '';
    console.log(`API key length: ${apiKey.length}`);
    console.log(`API key prefix: ${apiKey.substring(0, 4)}...`);
    
    // Try a different free model
    const response = await fetch('https://api-inference.huggingface.co/models/prompthero/openjourney', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: 'mdjrny-v4 style a fashion sketch of a summer dress, detailed design',
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: `API error: ${response.status} - ${response.statusText}`,
        details: errorText,
        model: 'prompthero/openjourney',
        apiKeyProvided: apiKey.length > 0
      });
    }
    
    // Save the generated image for verification
    try {
      const resultBuffer = await response.arrayBuffer();
      const uploadDir = path.join(process.cwd(), 'public/test-results');
      await mkdir(uploadDir, { recursive: true });
      
      const resultFilename = `test-${uuidv4()}.png`;
      const resultPath = path.join(uploadDir, resultFilename);
      await writeFile(resultPath, Buffer.from(resultBuffer));
      
      return NextResponse.json({
        success: true,
        message: 'Free image generation model is working',
        model: 'prompthero/openjourney',
        testImage: `/test-results/${resultFilename}`
      });
    } catch (saveError) {
      return NextResponse.json({
        success: true,
        message: 'Free image generation model is working but could not save the test image',
        model: 'prompthero/openjourney',
        saveError: saveError instanceof Error ? saveError.message : String(saveError)
      });
    }
  } catch (error) {
    console.error('Error testing Hugging Face API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to test Hugging Face API',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}