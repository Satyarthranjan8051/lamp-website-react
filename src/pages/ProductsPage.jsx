import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import ProductModal from '../components/ProductModal'

const ProductsPage = () => {
  const { addToCart, getItemQuantity } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Expanded product catalog
  const allProducts = [
    {
      id: 1,
      name: "Modern Industrial Lamp",
      category: "Industrial",
      price: 89.99,
      originalPrice: 120.00,
      image: "/img/industrial-lamp.png",
      rating: 4.8,
      description: "A sleek industrial-style lamp perfect for modern workspaces",
      features: ["LED Technology", "Adjustable Height", "Metal Construction"],
      inStock: true,
      newArrival: false
    },
    {
      id: 2,
      name: "Ultra Wide Desk Lamp",
      category: "Desk",
      price: 129.99,
      originalPrice: 160.00,
      image: "/img/ultrawide-lamp.png",
      rating: 4.9,
      description: "Wide-angle illumination for your entire workspace",
      features: ["Wide Coverage", "Touch Control", "USB Charging"],
      inStock: true,
      newArrival: true
    },
    {
      id: 3,
      name: "Minimalist Table Lamp",
      category: "Table",
      price: 69.99,
      originalPrice: 90.00,
      image: "/img/modern-lamp.png",
      rating: 4.7,
      description: "Clean, minimalist design for contemporary homes",
      features: ["Minimalist Design", "Soft Light", "Compact Size"],
      inStock: true,
      newArrival: false
    },
    {
      id: 4,
      name: "SuperBowl Floor Lamp",
      category: "Floor",
      price: 199.99,
      originalPrice: 250.00,
      image: "/img/superbolw-lamp.png",
      rating: 4.9,
      description: "Statement floor lamp with modern curved design",
      features: ["Arc Design", "Marble Base", "Dimmable Light"],
      inStock: true,
      newArrival: false
    },
    {
      id: 5,
      name: "SuperJet Pendant Light",
      category: "Pendant",
      price: 159.99,
      originalPrice: 200.00,
      image: "/img/superjet-light.png",
      rating: 4.6,
      description: "Modern pendant light with sleek jet-inspired design",
      features: ["Pendant Style", "Metal Finish", "Directional Light"],
      inStock: true,
      newArrival: true
    },
    {
      id: 6,
      name: "Roundness Ceiling Light",
      category: "Ceiling",
      price: 89.99,
      originalPrice: 110.00,
      image: "/img/roundness-light.png",
      rating: 4.5,
      description: "Circular ceiling light with ambient illumination",
      features: ["360° Light", "Easy Install", "Energy Efficient"],
      inStock: true,
      newArrival: false
    },
    {
      id: 7,
      name: "Stickness Wall Light",
      category: "Wall",
      price: 79.99,
      originalPrice: 100.00,
      image: "/img/stickness-light.png",
      rating: 4.4,
      description: "Adhesive wall light for versatile placement",
      features: ["No Wiring", "Battery Powered", "Motion Sensor"],
      inStock: false,
      newArrival: false
    },
    {
      id: 8,
      name: "Nakedness Artistic Lamp",
      category: "Artistic",
      price: 249.99,
      originalPrice: 300.00,
      image: "/img/nakedness-lamp.png",
      rating: 4.8,
      description: "Artistic lamp with exposed bulb design",
      features: ["Artistic Design", "Exposed Bulb", "Hand Crafted"],
      inStock: true,
      newArrival: true
    }
  ]

  const categories = ['All', 'Industrial', 'Desk', 'Table', 'Floor', 'Pendant', 'Ceiling', 'Wall', 'Artistic']

  useEffect(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, sortBy, priceRange])

  const handleQuickView = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <div className="bg-hero-gradient text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Discover our complete collection of premium lighting solutions designed to illuminate your space with style and efficiency
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Products
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search lamps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProducts.length} of {allProducts.length} products
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                />
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {!product.inStock && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                  {product.newArrival && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      New
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Sale
                    </span>
                  )}
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                  <button 
                    onClick={() => handleQuickView(product)}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transform scale-90 hover:scale-100 transition-transform"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-3 flex-1 flex flex-col">
                <div>
                  <span className="text-xs font-medium text-orange-500 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem] flex items-center">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-sm`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">({product.rating})</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 min-h-[2rem]">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{product.features.length - 2} more
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-end justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-orange-500">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-medium text-green-600">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => product.inStock && addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 mt-auto ${
                    product.inStock
                      ? 'bg-hero-gradient text-white hover:opacity-90 transform hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <i className={`${product.inStock ? 'ri-shopping-cart-line' : 'ri-close-circle-line'}`}></i>
                  {!product.inStock 
                    ? 'Out of Stock' 
                    : getItemQuantity(product.id) > 0 
                      ? `In Cart (${getItemQuantity(product.id)})` 
                      : 'Add to Cart'
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <i className="ri-search-line text-6xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button 
              onClick={() => {
                setSelectedCategory('All')
                setSearchTerm('')
                setPriceRange([0, 500])
              }}
              className="bg-hero-gradient text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ProductsPage
