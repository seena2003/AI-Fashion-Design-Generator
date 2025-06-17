'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CatalogueToVideo() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

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
      // formData.append('catalogue', file)
      // const response = await fetch('/api/catalogue-to-video', {
      //   method: 'POST',
      //   body: formData,
      // })
      // const data = await response.json()
      // setResult(data.videoUrl)
      
      // Mock response for now
      setTimeout(() => {
        setResult('/placeholder-video.mp4')
        setIsLoading(false)
      }, 3000)
    } catch (error) {
      console.error('Error generating fashion video:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          ← Back to Home
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Catalogue to Video</h1>
      <p className="mb-8 text-gray-600">
        Transform your catalogue images into fashion walk videos or slow pans with the same model.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Catalogue Image</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Upload your catalogue image (PNG or JPEG)
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

            {preview && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative h-64 w-full">
                  <Image 
                    src={preview} 
                    alt="Catalogue preview" 
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
              {isLoading ? 'Generating...' : 'Generate Fashion Video'}
            </button>
          </form>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              <p className="mt-4 text-gray-600">Generating your fashion video...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a minute or two</p>
            </div>
          ) : result ? (
            <div>
              <div className="relative h-64 w-full mb-4">
                <video 
                  src={result} 
                  controls
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <a 
                  href={result} 
                  download="fashion-video.mp4"
                  className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Download
                </a>
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
              <p className="text-gray-500">Your generated fashion video will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}