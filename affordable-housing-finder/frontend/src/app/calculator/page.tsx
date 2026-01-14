import Header from '@/components/Header';
import BudgetCalculator from '@/components/BudgetCalculator';

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Housing Budget Calculator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find out how much rent you can afford based on your salary using the 30% rule.
            </p>
          </div>

          <BudgetCalculator />

          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for New Grads</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Build Your Credit Score</h3>
                <p className="text-gray-600 text-sm">Many landlords check credit scores. Start building credit early.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Save for Security Deposit</h3>
                <p className="text-gray-600 text-sm">Budget to have 2-3 months rent saved before moving.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Consider Roommates</h3>
                <p className="text-gray-600 text-sm">Splitting rent can significantly reduce your housing costs.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Factor in All Costs</h3>
                <p className="text-gray-600 text-sm">Remember utilities, internet, and renter's insurance.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold mb-2">What is the 30% Rule?</h3>
            <p className="text-gray-600 text-sm">
              The 30% rule suggests spending no more than 30% of gross monthly income on rent,
              leaving room for savings, emergencies, and other expenses.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
