'use client';

import Link from 'next/link';
import { Listing } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/api';

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          {listing.images[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {formatCurrency(listing.price)}/mo
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{listing.title}</h3>
          <p className="text-gray-500 text-sm mt-1">{listing.city}, {listing.state}</p>

          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <span>🛏️ {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}</span>
            <span>🚿 {listing.bathrooms} bath</span>
            {listing.sqft && <span>📐 {formatNumber(listing.sqft)} sqft</span>}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{listing.property_type}</span>
            {listing.amenities.slice(0, 2).map((amenity) => (
              <span key={amenity} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{amenity}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
