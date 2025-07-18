const Choose = () => {
  const features = [
    {
      icon: "ri-shield-check-line",
      title: "Quality Materials",
      description: "Premium materials ensure durability and long-lasting performance for all our lighting products."
    },
    {
      icon: "ri-truck-line",
      title: "Fast Delivery",
      description: "Quick and reliable shipping to get your perfect lighting solution delivered to your door."
    },
    {
      icon: "ri-customer-service-2-line",
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to help you with any questions or concerns."
    },
    {
      icon: "ri-price-tag-3-line",
      title: "Best Prices",
      description: "Competitive pricing without compromising on quality. Get the best value for your money."
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800" id="choose">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="choose__img relative">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-second-gradient rounded-full opacity-10"></div>
              <img
                src="/src/assets/img/choose-lamp.png"
                alt="Choose Our Lamps"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="choose__data">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why <span className="bg-hero-gradient bg-clip-text text-transparent">Choose Us?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              We provide the highest quality lighting solutions with exceptional service and unbeatable value.
            </p>

            <div className="choose__content grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="choose__card bg-gray-50 dark:bg-gray-700 p-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-hero-gradient p-3 rounded-lg text-white text-xl">
                      <i className={feature.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-hero-gradient text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Shop Now
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Choose
