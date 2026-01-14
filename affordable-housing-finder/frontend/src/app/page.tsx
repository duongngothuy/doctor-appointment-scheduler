import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Affordable Housing<br />
                <span className="text-blue-200">For New Graduates</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Calculate how much rent you can afford, search listings within your budget,
                and compare salaries across cities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calculator" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">
                  Calculate Your Budget
                </Link>
                <Link href="/search" className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 border border-blue-400">
                  Browse Listings
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Calculator</h3>
                <p className="text-gray-600">Calculate affordable rent using the 30% rule</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Listings</h3>
                <p className="text-gray-600">Filter by city, price, and bedrooms</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Map View</h3>
                <p className="text-gray-600">See listings on an interactive map</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your First Home?</h2>
            <p className="text-gray-300 mb-8">Start with our budget calculator to find out exactly how much you can afford.</p>
            <Link href="/calculator" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500">
              Get Started
            </Link>
          </div>
        </section>

        <footer className="bg-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
            <p>Built for new grads</p>
          </div>
        </footer>
      </main>
    </>
  );
}
