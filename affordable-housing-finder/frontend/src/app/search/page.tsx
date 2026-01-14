'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import ListingCard from '@/components/ListingCard';
import MapView from '@/components/MapView';
import { Listing, ListingSearchParams } from '@/types';
import { listingsApi } from '@/lib/api';

export default function SearchPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const fetchListings = async (params?: ListingSearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listingsApi.getAll(params);
      setListings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(); }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Affordable Housing</h1>
              <p className="text-gray-600">Search listings in major cities across the US</p>
            </div>
            <div className="flex bg-white rounded-lg shadow p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Map View
              </button>
            </div>
          </div>

          <div className="mb-8">
            <SearchFilters onSearch={fetchListings} loading={loading} />
          </div>

          {!loading && !error && <p className="text-gray-600 mb-4">{listings.length} listings found</p>}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading listings...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
              <button onClick={() => fetchListings()} className="mt-2 text-sm underline">Try again</button>
            </div>
          )}

          {!loading && !error && listings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">No listings found</h3>
              <p className="text-gray-600">Try adjusting your search filters.</p>
            </div>
          )}

          {!loading && !error && listings.length > 0 && viewMode === 'map' && (
            <div className="mb-8">
              <MapView listings={listings} />
              <p className="text-sm text-gray-500 mt-2">Click markers to see listing details</p>
            </div>
          )}

          {!loading && !error && listings.length > 0 && viewMode === 'list' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
