const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden pt-16 md:pt-20" id="home">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Content */}
        <div className="home__data">
          <h3 className="text-base sm:text-lg md:text-xl text-primary-400 font-medium mb-4">
            The best light bulbs
          </h3>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8">
            Unique Light <br />
            <span className="bg-hero-gradient bg-clip-text text-transparent">For Your Home</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <a 
              href="#products" 
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-hero-gradient text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-base sm:text-lg"
            >
              Discover Now
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-white hover:text-primary-400 transition-colors text-base sm:text-lg"
            >
              <i className="ri-play-circle-line text-2xl"></i>
              Watch Video
            </a>
          </div>
          
          {/* Stats */}
          <div className="home__info grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-8 mt-6">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8 md:gap-16 mt-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">100+</span>
                <span className="text-base text-gray-300 mt-1">Products</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">2K+</span>
                <span className="text-base text-gray-300 mt-1">Customers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">95%</span>
                <span className="text-base text-gray-300 mt-1">Rating</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="home__img relative flex justify-center lg:justify-end mt-10 lg:mt-0">
          <div className="relative">
            <div className="w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-hero-gradient rounded-full opacity-20 absolute -top-6 -left-6 sm:-top-10 sm:-left-10 animate-pulse"></div>
            <img 
              src="/img/home-lamp.png" 
              alt="Modern Lamp" 
              className="relative z-10 w-48 xs:w-64 sm:w-80 md:w-96 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-20 w-3 h-3 bg-primary-300 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
    </section>
  )
}

export default Home
