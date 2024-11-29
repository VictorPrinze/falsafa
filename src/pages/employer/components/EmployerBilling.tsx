import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  FileText, 
  Clock, 
  Check, 
  X,
  TrendingUp,
  Calendar,
  Download,
  CreditCard as CardIcon,
  AlertCircle,
  ChevronRight,
  Smartphone // Added for M-Pesa icon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const EmployerBilling = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const spendingData = [
    { month: 'Aug', amount: 59999 }, // Converted to KSH
    { month: 'Sep', amount: 67499 }, // Converted to KSH
    { month: 'Oct', amount: 74999 }, // Converted to KSH
    { month: 'Nov', amount: 74999 }, // Converted to KSH
    { month: 'Dec', amount: 89999 }, // Converted to KSH
    { month: 'Jan', amount: 82499 }  // Converted to KSH
  ];

  const invoices = [
    {
      id: 'INV-2023-001',
      date: 'Nov 15, 2023',
      amount: 74999,
      status: 'Paid',
      items: ['Pro Plan', 'Additional Users']
    },
    {
      id: 'INV-2023-002',
      date: 'Dec 15, 2023',
      amount: 89999,
      status: 'Pending',
      items: ['Pro Plan', 'Additional Users', 'Featured Jobs']
    },
    {
      id: 'INV-2024-001',
      date: 'Jan 15, 2024',
      amount: 82499,
      status: 'Overdue',
      items: ['Pro Plan', 'Featured Jobs']
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Paid': 'bg-emerald-100 text-emerald-600',
      'Pending': 'bg-amber-100 text-amber-600',
      'Overdue': 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  const renderSpendingTrends = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-orange-500" />
          Spending Trends
        </h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="12months">Last 12 months</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendingData}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#f97316" 
              fill="url(#colorAmount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderPaymentMethod = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <CardIcon className="text-orange-500" />
        Payment Method
      </h3>
      <div className="space-y-4">
        {[
          { id: 'mpesa', label: 'M-Pesa', icon: Smartphone },
          { id: 'credit', label: 'Credit Card', icon: CreditCard },
          { id: 'bank', label: 'Bank Transfer', icon: FileText }
        ].map(({ id, label, icon: Icon }) => (
          <div 
            key={id}
            onClick={() => setPaymentMethod(id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              paymentMethod === id 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                paymentMethod === id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{label}</span>
              {paymentMethod === id && (
                <Check className="ml-auto text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBillingOverview = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <DollarSign className="text-orange-500" />
        Billing Overview
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-orange-50 rounded-xl">
          <p className="text-gray-600 text-sm">Total Spent</p>
          <p className="text-3xl font-bold text-orange-500 mt-1">KSH 247,496</p>
          <p className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +12.5% from last month
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-gray-600 text-sm">Current Plan</p>
          <p className="text-xl font-semibold text-gray-800 mt-1">Pro Employer</p>
          <p className="text-sm text-gray-500 mt-2">Renews on Feb 15, 2024</p>
        </div>
      </div>
    </div>
  );

  const renderInvoiceHistory = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="text-orange-500" />
          Recent Invoices
        </h3>
        <button className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 text-left text-gray-500 font-medium">Invoice ID</th>
              <th className="py-3 text-left text-gray-500 font-medium">Date</th>
              <th className="py-3 text-left text-gray-500 font-medium">Items</th>
              <th className="py-3 text-right text-gray-500 font-medium">Amount</th>
              <th className="py-3 text-center text-gray-500 font-medium">Status</th>
              <th className="py-3 text-right text-gray-500 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 text-gray-800 font-medium">{invoice.id}</td>
                <td className="py-4 text-gray-600">{invoice.date}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    {invoice.items.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-right font-medium">KSH {invoice.amount.toLocaleString()}</td>
                <td className="py-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-500 hover:text-orange-500">
                    <Download className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-500 mt-2">Manage your billing information and view your invoice history</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderSpendingTrends()}
          {renderPaymentMethod()}
          {renderBillingOverview()}
          {renderInvoiceHistory()}
        </div>

        <div className="mt-8 flex justify-between items-center bg-orange-50 p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-orange-500" />
            <p className="text-sm text-gray-600">
              Changes to your payment method will take effect on your next billing cycle.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center gap-2">
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerBilling;