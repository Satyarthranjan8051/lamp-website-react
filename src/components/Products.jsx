import { useCart } from '../context/CartContext'

const Products = () => {
  const { addToCart, getItemQuantity } = useCart()
  const products = [
    {
      id: 1,
      name: "Stickness Light",
      category: "Desk Lamp",
      price: 45.99,
      image: "/src/assets/img/stickness-light.png",
      badge: "New"
    },
    {
      id: 2,
      name: "Roundness Light",
      category: "Ceiling Lamp",
      price: 89.99,
      image: "/src/assets/img/roundness-light.png",
      badge: "Popular"
    },
    {
      id: 3,
      name: "Nakedness Lamp",
      category: "Floor Lamp",
      price: 129.99,
      image: "/src/assets/img/nakedness-lamp.png",
      badge: "Sale"
    },
    {
      id: 4,
      name: "SuperJet Light",
      category: "Wall Lamp",
      price: 79.99,
      image: "/src/assets/img/superjet-light.png",
      badge: "Hot"
    },
    {
      id: 5,
      name: "Features Lamp",
      category: "Smart Lamp",
      price: 159.99,
      image: "/src/assets/img/features-lamp.png",
      badge: "Smart"
    },
    {
      id: 6,
      name: "Modern Industrial",
      category: "Industrial",
      price: 199.99,
      image: "/src/assets/img/industrial-lamp.png",
      badge: "Premium"
    }
  ]

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'New': return 'bg-green-500'
      case 'Popular': return 'bg-blue-500'
      case 'Sale': return 'bg-red-500'
      case 'Hot': return 'bg-orange-500'
      case 'Smart': return 'bg-purple-500'
      case 'Premium': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="products">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="bg-hero-gradient bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our complete collection of modern lighting solutions designed to illuminate and enhance your space
          </p>
        </div>

        <div className="products__container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="products__card group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {product.badge}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <i className="ri-heart-line text-gray-600 dark:text-gray-300"></i>
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2">
                  <span className="text-sm text-primary-500 font-medium">{product.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-500">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-hero-gradient text-white p-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
                  >
                    <i className="ri-shopping-cart-line"></i>
                    {getItemQuantity(product.id) > 0 && (
                      <span className="text-xs">{getItemQuantity(product.id)}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-hero-gradient text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products
