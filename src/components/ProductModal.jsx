import { useState } from 'react'
import { useCart } from '../context/CartContext'

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart, getItemQuantity } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)

  if (!isOpen || !product) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Mock additional images for demo (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image, // You can add more image variations here
    product.image,
  ]

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-orange-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div>
                <span className="inline-block bg-orange-100 dark:bg-orange-900/20 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.newArrival && (
                  <span className="inline-block bg-green-100 dark:bg-green-900/20 text-green-500 px-3 py-1 rounded-full text-sm font-medium ml-2">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'}`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">({product.rating})</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">• 128 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-orange-500">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <i className="ri-check-line text-green-500 text-sm"></i>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <i className={`ri-checkbox-circle-line ${product.inStock ? 'text-green-500' : 'text-red-500'}`}></i>
                <span className={`font-medium ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => product.inStock && addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
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
                  
                  <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                    <i className="ri-heart-line text-xl text-gray-600 dark:text-gray-400 hover:text-orange-500"></i>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <i className="ri-truck-line text-orange-500"></i>
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-orange-500"></i>
                    <span>2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-arrow-go-back-line text-orange-500"></i>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-customer-service-line text-orange-500"></i>
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
