'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductToCatalogue() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [withModel, setWithModel] = useState(true)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsLoading(true)
    
    // Mock API call - replace with actual implementation
    try {
      // const formData = new FormData()
      // formData.append('product', file)
      // formData.append('withModel', withModel.toString())
      // const response = await fetch('/api/product-to-catalogue', {
      //   method: 'POST',
      //   body: formData,
      // })
      // const data = await response.json()
      // setResult(data.imageUrl)
      
      // Mock response for now
      setTimeout(() => {
        setResult('/placeholder-result.jpg')
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Error generating catalogue image:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block shadow-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 drop-shadow-sm">Product to Catalogue</h1>
        <p className="mb-10 text-gray-600 text-center max-w-2xl mx-auto">
          Transform your product images into styled catalogue images with or without models.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700">Upload Product Image</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Upload your product image (PNG or JPEG)
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={withModel}
                    onChange={(e) => setWithModel(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm">Include model in catalogue image</span>
                </label>
              </div>

              {preview && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <div className="relative h-64 w-full">
                    <Image 
                      src={preview} 
                      alt="Product preview" 
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium 
                  ${!file || isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? 'Generating...' : 'Generate Catalogue Image'}
              </button>
            </form>
          </div>

          <div className="border rounded-lg p-8 bg-white shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-indigo-700">Result</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                <p className="mt-4 text-gray-600">Generating your catalogue image...</p>
              </div>
            ) : result ? (
              <div>
                <div className="relative h-64 w-full mb-4">
                  <Image 
                    src={result} 
                    alt="Generated catalogue image" 
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex justify-between">
                  <button className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Download
                  </button>
                  <button 
                    onClick={() => {
                      setFile(null)
                      setPreview(null)
                      setResult(null)
                    }}
                    className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">Your generated catalogue image will appear here</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Our AI technology creates high-quality fashion designs and visualizations</p>
        </div>
      </div>
    </div>
  )
}