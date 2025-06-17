'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SketchToProductPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // Existing handlers remain unchanged
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'sketch-to-product');
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Generated image path:', data.resultImage);
        setResult(data.resultImage);
      } else {
        setError(data.error || 'Failed to generate product image');
        console.error('API error:', data);
      }
    } catch (err) {
      setError('An error occurred while processing your request');
      console.error('Request error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setFileName('');
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = 'generated-product.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block shadow-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 drop-shadow-sm">Sketch to Product</h1>
        <p className="mb-10 text-gray-600 text-center max-w-2xl mx-auto">
          Transform your fashion sketches into realistic product images.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700">Upload Sketch</h2>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Upload your sketch (PNG or JPEG)
              </label>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                id="fileInput"
              />
              {fileName && <p className="mt-2 text-sm text-gray-600">{fileName}</p>}
            </div>
            
            {preview && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative h-64 w-full">
                  {preview && (
                    <Image 
                      src={preview} 
                      alt="Preview" 
                      fill
                      className="object-contain rounded-md"
                    />
                  )}
                </div>
              </div>
            )}
            
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${!file || loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Generating...' : 'Generate Product Image'}
            </button>
          </div>
          
          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700">Result</h2>
            
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
                {error}
              </div>
            )}
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                <p className="mt-4 text-gray-600">Generating your product image...</p>
              </div>
            ) : result ? (
              <div>
                <div className="relative h-64 w-full mb-4">
                  <Image 
                    src={result} 
                    alt="Generated product" 
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={handleDownload}
                    className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Download
                  </button>
                  <button 
                    onClick={handleStartOver}
                    className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Your generated product image will appear here</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Our AI technology creates high-quality fashion designs and visualizations</p>
        </div>
      </div>
    </div>
  );
}