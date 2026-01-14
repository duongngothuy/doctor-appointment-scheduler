'use client';

import { useEffect, useRef } from 'react';
import { Listing } from '@/types';
import { formatCurrency } from '@/lib/api';

declare global {
  interface Window { L: any; }
}

interface MapViewProps {
  listings: Listing[];
}

export default function MapView({ listings }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      const L = window.L;
      const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      listings.forEach((listing) => {
        if (listing.latitude && listing.longitude) {
          const marker = L.marker([listing.latitude, listing.longitude]).addTo(map);
          marker.bindPopup(`
            <div style="min-width: 180px;">
              <strong>${listing.title}</strong><br/>
              <span style="color: #2563eb; font-weight: bold;">${formatCurrency(listing.price)}/mo</span><br/>
              <span style="color: #666;">${listing.city}, ${listing.state}</span><br/>
              <a href="/listing/${listing.id}" style="color: #2563eb;">View Details →</a>
            </div>
          `);
        }
      });

      const validListings = listings.filter((l) => l.latitude && l.longitude);
      if (validListings.length > 0) {
        const bounds = L.latLngBounds(validListings.map((l) => [l.latitude!, l.longitude!]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [listings]);

  return <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden shadow-md" />;
}
