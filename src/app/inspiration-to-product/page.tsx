'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'


export default function InspirationToProduct() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 3) // Limit to 3 files
      setFiles(selectedFiles)
      
      // Create previews
      const newPreviews: string[] = []
      selectedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string)
            if (newPreviews.length === selectedFiles.length) {
              setPreviews(newPreviews)
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files)
        .filter(file => file.type.includes('image/'))
        .slice(0, 3) // Limit to 3 files
      
      setFiles(droppedFiles)
      
      // Create previews
      const newPreviews: string[] = []
      droppedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            newPreviews.push(event.target.result as string)
            if (newPreviews.length === droppedFiles.length) {
              setPreviews(newPreviews)
            }
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0) return

    setIsLoading(true)
    
    // Mock API call - replace with actual implementation
    try {
      // const formData = new FormData()
      // files.forEach((file, index) => {
      //   formData.append(`inspiration${index}`, file)
      // })
      // const response = await fetch('/api/inspiration-to-product', {
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
      console.error('Error generating product image:', error)
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
      
      <h1 className="text-3xl font-bold mb-6">Inspiration to Product</h1>
      <p className="mb-8 text-gray-600">
        Upload 2-3 inspiration images and our AI will generate a new product design combining elements from all of them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Inspiration Images</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div
                className={`upload-dropzone ${isDragging ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p className="mb-2">Drag and drop up to 3 images here</p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  multiple
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Select up to 3 images (PNG or JPEG)
              </p>
            </div>

            {previews.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Previews:</p>
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative h-24 w-full">
                      <Image 
                        src={preview} 
                        alt={`Inspiration ${index + 1}`} 
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={files.length === 0 || isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium 
                ${files.length === 0 || isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isLoading ? 'Generating...' : 'Generate Product Design'}
            </button>
          </form>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              <p className="mt-4 text-gray-600">Generating your product design...</p>
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
                <button className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Download
                </button>
                <button 
                  onClick={() => {
                    setFiles([])
                    setPreviews([])
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
              <p className="text-gray-500">Your generated product design will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}