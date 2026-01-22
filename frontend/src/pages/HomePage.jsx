import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary-dark text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight text-white">
            Mastery in Every Stitch, <br />
            <span className="text-secondary-light">Soul in Every Craft.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
            Connect with local artisans and skilled micro-entrepreneurs. 
            Discover authentic handmade treasures and expert services in your community.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/products"
              className="bg-secondary text-white px-8 py-3.5 rounded font-semibold hover:bg-secondary-light transition shadow-lg"
            >
              Browse Marketplace
            </Link>
            <Link
              to="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded font-semibold hover:bg-white hover:text-primary-dark transition"
            >
              Find an Expert
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose HunarHub?</h2>
            <p className="text-neutral-600 max-w-xl mx-auto">We bridge the gap between talent and opportunity, fostering a thriving local economy.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-neutral-100 rounded-lg hover:shadow-xl transition duration-300 bg-neutral-50">
              <div className="w-14 h-14 bg-primary/10 rounded flex items-center justify-center mb-6 text-2xl">
                🎨
              </div>
              <h3 className="text-xl font-bold mb-3">Authentic Craftsmanship</h3>
              <p className="text-neutral-600 leading-relaxed">
                Access unique, handmade items directly from the creators. No mass production, just pure skill.
              </p>
            </div>
            <div className="p-8 border border-neutral-100 rounded-lg hover:shadow-xl transition duration-300 bg-neutral-50">
              <div className="w-14 h-14 bg-secondary/10 rounded flex items-center justify-center mb-6 text-2xl">
                🛠️
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Experts</h3>
              <p className="text-neutral-600 leading-relaxed">
                From tailoring to pottery, find vetted professionals who take pride in their work and service.
              </p>
            </div>
            <div className="p-8 border border-neutral-100 rounded-lg hover:shadow-xl transition duration-300 bg-neutral-50">
              <div className="w-14 h-14 bg-primary/10 rounded flex items-center justify-center mb-6 text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-3">Community Impact</h3>
              <p className="text-neutral-600 leading-relaxed">
                Every purchase supports a local family and keeps traditional skills alive in your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
