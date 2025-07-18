import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useCart } from '../context/CartContext'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Popular = () => {
  const { addToCart, getItemQuantity } = useCart()
  const popularProducts = [
    {
      id: 1,
      name: "Modern Industrial Lamp",
      category: "Industrial",
      price: 89.99,
      originalPrice: 120.00,
      image: "/src/assets/img/industrial-lamp.png",
      rating: 4.8
    },
    {
      id: 2,
      name: "Ultra Wide Desk Lamp",
      category: "Desk Lamp",
      price: 129.99,
      originalPrice: 160.00,
      image: "/src/assets/img/ultrawide-lamp.png",
      rating: 4.9
    },
    {
      id: 3,
      name: "Minimalist Table Lamp",
      category: "Table Lamp",
      price: 69.99,
      originalPrice: 90.00,
      image: "/src/assets/img/modern-lamp.png",
      rating: 4.7
    },
    {
      id: 4,
      name: "SuperBowl Floor Lamp",
      category: "Floor Lamp",
      price: 199.99,
      originalPrice: 250.00,
      image: "/src/assets/img/superbolw-lamp.png",
      rating: 4.9
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="popular">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Popular <span className="bg-hero-gradient bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most loved lighting solutions that combine style, functionality, and innovation
          </p>
        </div>

        <div className="popular__container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="mySwiper"
          >
            {popularProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain"
                    />
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      Sale
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
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
                    
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-xl font-bold text-primary-500">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-hero-gradient text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <i className="ri-shopping-cart-line"></i>
                      {getItemQuantity(product.id) > 0 ? `In Cart (${getItemQuantity(product.id)})` : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Popular
