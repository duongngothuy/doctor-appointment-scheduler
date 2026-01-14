'use client';

import { useState } from 'react';
import { BudgetInput, BudgetResult } from '@/types';
import { calculatorApi, formatCurrency } from '@/lib/api';

export default function BudgetCalculator() {
  const [input, setInput] = useState<BudgetInput>({ annual_salary: 60000, monthly_debt: 0 });
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const budgetResult = await calculatorApi.calculateBudget(input);
      setResult(budgetResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate budget');
    } finally {
      setLoading(false);
    }
  };

  const healthColors = {
    healthy: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    stretched: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget Calculator</h2>
        <p className="text-gray-600 mb-6">Find out how much rent you can afford using the 30% rule.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Salary (before taxes)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={input.annual_salary}
                onChange={(e) => setInput({ ...input, annual_salary: Number(e.target.value) })}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Debt Payments</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={input.monthly_debt}
                onChange={(e) => setInput({ ...input, monthly_debt: Number(e.target.value) })}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300">
            {loading ? 'Calculating...' : 'Calculate My Budget'}
          </button>
        </form>

        {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

        {result && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Housing Budget</h3>

            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${healthColors[result.financial_health_score]}`}>
                Financial Health: {result.financial_health_score.charAt(0).toUpperCase() + result.financial_health_score.slice(1)}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Maximum (30% Rule)</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.max_rent_30_percent)}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-1">Recommended</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(result.recommended_rent)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Comfortable (25%)</p>
                <p className="text-2xl font-bold text-gray-600">{formatCurrency(result.comfortable_rent)}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Monthly Income Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Monthly</span>
                  <span className="font-medium">{formatCurrency(result.gross_monthly_income)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="text-red-500">-{formatCurrency(result.estimated_taxes)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Net Monthly</span>
                  <span className="font-bold">{formatCurrency(result.net_monthly_income)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
