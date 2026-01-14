'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { Listing } from '@/types';
import { listingsApi, formatCurrency, formatNumber } from '@/lib/api';

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = Number(params.id);
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!listingId) return;
    listingsApi.getById(listingId)
      .then(setListing)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [listingId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        </main>
      </>
    );
  }

  if (error || !listing) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Listing Not Found</h1>
            <Link href="/search" className="text-blue-600 hover:underline">Back to Search</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="mb-6">
            <Link href="/search" className="text-blue-600 hover:underline">← Back to Search</Link>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-lg overflow-hidden h-96 mb-6">
                {listing.images[0] ? (
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">🏠</div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{listing.address}, {listing.city}, {listing.state}</p>

              {listing.description && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-600">{listing.description}</p>
                </div>
              )}

              {listing.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.map((a) => (
                      <span key={a} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-blue-600">{formatCurrency(listing.price)}</p>
                  <p className="text-gray-500">per month</p>
                </div>

                <div className="border-t border-b py-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-semibold">{listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}</p>
                      <p className="text-gray-500 text-sm">{listing.bedrooms === 0 ? '' : 'Beds'}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">{listing.bathrooms}</p>
                      <p className="text-gray-500 text-sm">Baths</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">{listing.sqft ? formatNumber(listing.sqft) : 'N/A'}</p>
                      <p className="text-gray-500 text-sm">Sqft</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                    Contact Landlord
                  </button>
                  <button className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50">
                    Save to Favorites
                  </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">To afford this rent, you need:</p>
                  <p className="font-semibold text-blue-700">{formatCurrency(listing.price * 12 / 0.3)} annual salary</p>
                  <Link href="/calculator" className="text-blue-600 text-sm hover:underline">Check your budget →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
