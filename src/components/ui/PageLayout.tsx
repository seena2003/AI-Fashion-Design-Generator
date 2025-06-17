import Link from 'next/link'
import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export default function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block shadow-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 drop-shadow-sm">{title}</h1>
        <p className="mb-10 text-gray-600 text-center max-w-2xl mx-auto">
          {description}
        </p>

        {children}
        
        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Our AI technology creates high-quality fashion designs and visualizations</p>
        </div>
      </div>
    </div>
  )
}