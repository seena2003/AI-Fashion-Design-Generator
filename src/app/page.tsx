import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Bar with Login */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-2xl text-indigo-700">IMERSE Digital</div>
          <div>
            <Link href="/login">
              <button className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 drop-shadow-sm">AI-Powered Fashion Design</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your fashion ideas into reality with our AI-powered design tools
          </p>
          <Link href="#learn-more">
            <button className="px-8 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-lg font-medium">
              Learn More
            </button>
          </Link>
        </header>

        {/* AI Fashion Design Features Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-black">AI Fashion</span> <span className="text-indigo-600">Design Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Feature Cards */}
            <Link href="/sketch-to-product" className="block">
              <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Sketch to Product</h2>
                <p className="text-gray-600 mb-4">Transform your fashion sketches into realistic product images.</p>
                <div className="text-indigo-600 font-medium">Try it now →</div>
              </div>
            </Link>

            <Link href="/inspiration-to-product" className="block">
              <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Inspiration to Product</h2>
                <p className="text-gray-600 mb-4">Turn inspiration images into fashion product designs.</p>
                <div className="text-indigo-600 font-medium">Try it now →</div>
              </div>
            </Link>

            <Link href="/product-to-catalogue" className="block">
              <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Product to Catalogue</h2>
                <p className="text-gray-600 mb-4">Create catalogue images with models from product photos.</p>
                <div className="text-indigo-600 font-medium">Try it now →</div>
              </div>
            </Link>

            <Link href="/catalogue-to-video" className="block">
              <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-4 text-indigo-700">Catalogue to Video</h2>
                <p className="text-gray-600 mb-4">Generate fashion videos from catalogue images.</p>
                <div className="text-indigo-600 font-medium">Try it now →</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Learn More Section */}
        <div id="learn-more" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Why Choose IMERSE</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Revolutionize Your Fashion Design Process</h3>
                <p className="text-gray-600 mb-4">
                  IMERSE combines cutting-edge AI technology with fashion expertise to help designers, brands, and retailers 
                  streamline their design process and bring ideas to life faster than ever before.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reduce design time by up to 80%</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create unlimited design variations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Visualize products before manufacturing</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-full max-w-md">
                  <div className="absolute inset-0 bg-indigo-100 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/logo.png"
                      alt="Fashion Design Visualization"
                      width={200}
                      height={90}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-600">Upload your fashion sketches or inspiration images</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate</h3>
              <p className="text-gray-600">Our AI transforms your inputs into fashion designs</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-gray-600">Download your AI-generated fashion assets</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500">Our AI technology creates high-quality fashion designs and visualizations</p>
        </div>
      </div>
    </div>
  )
}
