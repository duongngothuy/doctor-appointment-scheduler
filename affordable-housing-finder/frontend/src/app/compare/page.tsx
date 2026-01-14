'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { formatCurrency } from '@/lib/api';

const CITIES = [
  { name: 'San Francisco, CA', index: 179.6, avgRent: 3500 },
  { name: 'New York, NY', index: 187.2, avgRent: 3200 },
  { name: 'Los Angeles, CA', index: 166.2, avgRent: 2800 },
  { name: 'San Diego, CA', index: 160.1, avgRent: 2600 },
  { name: 'Seattle, WA', index: 149.7, avgRent: 2400 },
  { name: 'Boston, MA', index: 152.4, avgRent: 2700 },
  { name: 'Denver, CO', index: 128.6, avgRent: 1900 },
  { name: 'Austin, TX', index: 111.5, avgRent: 1700 },
  { name: 'Chicago, IL', index: 107.3, avgRent: 1800 },
  { name: 'Phoenix, AZ', index: 103.4, avgRent: 1500 },
  { name: 'Dallas, TX', index: 104.1, avgRent: 1600 },
  { name: 'Atlanta, GA', index: 106.8, avgRent: 1650 },
];

export default function ComparePage() {
  const [currentCity, setCurrentCity] = useState(CITIES[0]);
  const [targetCity, setTargetCity] = useState(CITIES[7]);
  const [currentSalary, setCurrentSalary] = useState(80000);

  const equivalentSalary = currentSalary * (targetCity.index / currentCity.index);
  const percentDifference = ((targetCity.index - currentCity.index) / currentCity.index) * 100;
  const purchasingPowerGain = currentSalary - equivalentSalary;
  const rentDifference = currentCity.avgRent - targetCity.avgRent;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Salary Negotiation Tool</h1>
            <p className="text-gray-600">Compare cost of living and find equivalent salaries across cities.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Compare Cities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current City</label>
                <select
                  value={currentCity.name}
                  onChange={(e) => setCurrentCity(CITIES.find(c => c.name === e.target.value) || CITIES[0])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  {CITIES.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target City</label>
                <select
                  value={targetCity.name}
                  onChange={(e) => setTargetCity(CITIES.find(c => c.name === e.target.value) || CITIES[7])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  {CITIES.map((city) => <option key={city.name} value={city.name}>{city.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Results</h2>

            <div className={`p-6 rounded-lg mb-6 ${percentDifference < 0 ? 'bg-green-50' : 'bg-orange-50'}`}>
              <div className="text-center">
                <p className="text-gray-600 mb-2">To maintain your lifestyle in <strong>{targetCity.name}</strong>:</p>
                <p className={`text-4xl font-bold ${percentDifference < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {formatCurrency(equivalentSalary)}
                </p>
                <p className={`mt-2 ${percentDifference < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {percentDifference < 0
                    ? `You can take a ${Math.abs(percentDifference).toFixed(1)}% pay cut and live the same!`
                    : `You need ${percentDifference.toFixed(1)}% more to maintain your lifestyle`}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Cost of Living Index</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{currentCity.name}</span>
                    <span className="font-semibold">{currentCity.index}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(currentCity.index / 200) * 100}%` }} />
                  </div>
                  <div className="flex justify-between">
                    <span>{targetCity.name}</span>
                    <span className="font-semibold">{targetCity.index}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(targetCity.index / 200) * 100}%` }} />
                  </div>
                  <p className="text-xs text-gray-500">National average = 100</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Average Rent (1BR)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{currentCity.name}</span>
                    <span className="font-semibold">{formatCurrency(currentCity.avgRent)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{targetCity.name}</span>
                    <span className="font-semibold">{formatCurrency(targetCity.avgRent)}/mo</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Monthly Savings</span>
                      <span className={`font-semibold ${rentDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {rentDifference > 0 ? '+' : ''}{formatCurrency(rentDifference)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {purchasingPowerGain > 0 && (
              <div className="mt-6 bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">Purchasing Power Gain</h3>
                <p className="text-green-700">
                  Same {formatCurrency(currentSalary)} salary in {targetCity.name} gives you{' '}
                  <strong>{formatCurrency(purchasingPowerGain)}/year</strong> more purchasing power!
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Salary Negotiation Tips</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Research cost of living BEFORE accepting an offer</li>
              <li>• A $100k offer in Austin goes further than $120k in San Francisco</li>
              <li>• Factor in state income tax (Texas has none; California is high)</li>
              <li>• Consider remote work to live in lower-cost cities</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
