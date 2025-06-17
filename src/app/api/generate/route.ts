import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    
    if (!file || !type) {
      return NextResponse.json(
        { error: 'File and type are required' },
        { status: 400 }
      );
    }

    // Create unique filename
    const uniqueId = uuidv4();
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uniqueId}-${file.name.replace(/\s+/g, '-')}`;
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, filename);
    const publicPath = `/uploads/${filename}`;
    
    // Save the file
    await writeFile(filePath, buffer);
    
    // Process with AI based on type
    let result;
    
    switch (type) {
      case 'sketch-to-product':
        result = await processSketchToProduct(filePath, publicPath);
        break;
      case 'inspiration-to-product':
        result = await processInspirationToProduct(filePath, publicPath);
        break;
      case 'product-to-catalogue':
        const withModel = formData.get('withModel') === 'true';
        result = await processProductToCatalogue(filePath, publicPath, withModel);
        break;
      case 'catalogue-to-video':
        result = await processCatalogueToVideo(filePath, publicPath);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid type' },
          { status: 400 }
        );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

async function processSketchToProduct(filePath: string, publicPath: string) {
  try {
    // Check if we should use mock data
    const useMockData = process.env.USE_MOCK_DATA === 'true';
    
    if (useMockData) {
      // Return mock data for development
      return {
        success: true,
        originalImage: publicPath,
        resultImage: '/demo-results/fashion-result-1.jpg',
        mockData: true
      };
    }
    
    console.log("Calling Together.ai API with FLUX.1-schnell-Free model...");
    
    try {
      // Use Together.ai API with the FLUX.1-schnell-Free model
      const response = await fetch('https://api.together.ai/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "black-forest-labs/FLUX.1-schnell-Free",
          prompt: "A high-quality fashion product image of a stylish summer dress, detailed fabric texture, professional photography",
          max_tokens: 1024,
          temperature: 0.7,
          response_format: "image"
        }),
      });
      
      console.log("Together.ai API response status:", response.status);
      
      // Handle rate limiting specifically
      if (response.status === 429) {
        console.log("Rate limit reached, using mock data instead");
        return {
          success: true,
          originalImage: publicPath,
          resultImage: '/demo-results/fashion-result-1.jpg',
          mockData: true,
          rateLimited: true
        };
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Together.ai API error: ${response.status} - ${errorText}`);
        
        // Fall back to mock data for errors
        return {
          success: true,
          originalImage: publicPath,
          resultImage: '/demo-results/fashion-result-2.jpg',
          mockData: true
        };
      }
      
      // Process the response
      const data = await response.json();
      
      if (data.output && data.output.choices && data.output.choices[0] && data.output.choices[0].image_base64) {
        // Handle the new response format
        const base64Image = data.output.choices[0].image_base64;
        const imageBuffer = Buffer.from(base64Image, 'base64');
        
        const resultFilename = `result-${path.basename(filePath)}`;
        const resultPath = path.join(process.cwd(), 'public/uploads', resultFilename);
        await writeFile(resultPath, imageBuffer);
        
        return {
          success: true,
          originalImage: publicPath,
          resultImage: `/uploads/${resultFilename}`  // Ensure correct path format
        };
      } else if (data.choices && data.choices[0] && data.choices[0].image) {
        // Save the result image
        const base64Image = data.choices[0].image;
        const imageBuffer = Buffer.from(base64Image, 'base64');
        
        const resultFilename = `result-${path.basename(filePath)}`;
        const resultPath = path.join(process.cwd(), 'public/uploads', resultFilename);
        await writeFile(resultPath, imageBuffer);
        
        return {
          success: true,
          originalImage: publicPath,
          resultImage: `/uploads/${resultFilename}`  // Ensure correct path format
        };
      } else {
        console.error('Unexpected response format from Together.ai API');
        // Fall back to mock data
        return {
          success: true,
          originalImage: publicPath,
          resultImage: '/demo-results/fashion-result-2.jpg',
          mockData: true
        };
      }
    } catch (apiError) {
      console.error('API error in processSketchToProduct:', apiError);
      // Fall back to mock data on API error
      return {
        success: true,
        originalImage: publicPath,
        resultImage: '/demo-results/fashion-result-2.jpg',
        mockData: true,
        error: apiError instanceof Error ? apiError.message : String(apiError)
      };
    }
  } catch (error) {
    console.error('Error in processSketchToProduct:', error);
    // Fall back to mock data on error
    return {
      success: true,
      originalImage: publicPath,
      resultImage: '/demo-results/fashion-result-3.jpg',
      mockData: true
    };
  }
}

// Implement other processing functions with similar pattern
async function processInspirationToProduct(filePath: string, publicPath: string) {
  // Similar implementation to processSketchToProduct
  // For now, return a mock result
  return {
    success: true,
    originalImage: publicPath,
    resultImage: '/demo-results/inspiration-result.jpg',
    mockData: true
  };
}

async function processProductToCatalogue(filePath: string, publicPath: string, withModel: boolean) {
  // Implementation for product to catalogue
  return {
    success: true,
    originalImage: publicPath,
    resultImage: '/demo-results/catalogue-result.jpg',
    mockData: true,
    withModel
  };
}

async function processCatalogueToVideo(filePath: string, publicPath: string) {
  // Implementation for catalogue to video
  return {
    success: true,
    originalImage: publicPath,
    videoUrl: '/demo-results/video-result.mp4',
    mockData: true
  };
}