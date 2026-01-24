const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-white">
              Mastery in Every Stitch,{' '}
              <span className="text-accent">Soul in Every Craft.</span>
            </h1>
            <p className="text-xl text-neutral-100 mb-8 leading-relaxed">
              Connect with local artisans and skilled micro-entrepreneurs. Discover authentic
              handmade treasures and expert services in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-heading font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Marketplace
              </a>
              <a
                href="/services"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white px-8 py-3 rounded-lg font-heading font-semibold text-lg transition-all"
              >
                Find an Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-neutral-900">
            Why Choose HunarHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-primary">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-neutral-900">
                Authentic Craftsmanship
              </h3>
              <p className="text-neutral-600">
                Every product is handcrafted with care by skilled artisans, ensuring quality and uniqueness.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-accent">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-neutral-900">
                Support Local Talent
              </h3>
              <p className="text-neutral-600">
                Empower micro-entrepreneurs and artisans in your community by supporting their craft.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-primary">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-neutral-900">
                Trusted Platform
              </h3>
              <p className="text-neutral-600">
                Secure transactions and verified sellers ensure a safe and reliable marketplace experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-neutral-100 mb-8">
            Join thousands of artisans and customers building a vibrant community.
          </p>
          <a
            href="/register"
            className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-heading font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
