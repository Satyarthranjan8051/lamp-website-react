const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    products: [
      { name: 'Desk Lamps', href: '#' },
      { name: 'Floor Lamps', href: '#' },
      { name: 'Ceiling Lights', href: '#' },
      { name: 'Smart Lighting', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Installation', href: '#' },
      { name: 'Warranty', href: '#' },
      { name: 'Returns', href: '#' }
    ]
  }

  const socialLinks = [
    { icon: 'ri-facebook-fill', href: '#', name: 'Facebook' },
    { icon: 'ri-twitter-fill', href: '#', name: 'Twitter' },
    { icon: 'ri-instagram-line', href: '#', name: 'Instagram' },
    { icon: 'ri-linkedin-fill', href: '#', name: 'LinkedIn' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-semibold font-secondary mb-4 inline-block">
              SUN<span className="bg-hero-gradient bg-clip-text text-transparent">LIGHT</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-md">
              Illuminating your world with premium quality lighting solutions. 
              Discover the perfect blend of style, functionality, and innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-gray-800 p-3 rounded-lg hover:bg-primary-500 transition-colors duration-300"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SunLight. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
