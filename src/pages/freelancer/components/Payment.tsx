import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, DollarSign, Globe, Shield, Zap, TrendingUp, 
  Clock, CheckCircle, XCircle, ArrowRight, RefreshCw, 
  CreditCardIcon, WalletIcon, PhoneIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

// Typescript Types
type PaymentMethod = 'mpesa' | 'bank' | 'paypal' | 'card';
type PaymentPeriod = '1month' | '3months' | '6months';
type TransactionStatus = 'pending' | 'completed' | 'on-hold' | 'failed';

// Simulated Payment Data
const paymentData = {
  '1month': [
    { name: 'Week 1', earnings: 2500 },
    { name: 'Week 2', earnings: 3200 },
    { name: 'Week 3', earnings: 2800 },
    { name: 'Week 4', earnings: 3500 }
  ],
  '3months': [
    { name: 'Month 1', earnings: 9500 },
    { name: 'Month 2', earnings: 11200 },
    { name: 'Month 3', earnings: 10800 }
  ]
};

// Simulated Transaction History
const transactionHistory = [
  {
    id: '001',
    date: '2024-01-15',
    amount: 3500,
    method: 'mpesa',
    status: 'completed',
    project: 'Web Design Project'
  },
  {
    id: '002',
    date: '2024-02-01',
    amount: 2800,
    method: 'paypal',
    status: 'pending',
    project: 'Mobile App Development'
  },
  {
    id: '003',
    date: '2024-02-10',
    amount: 4200,
    method: 'mpesa',
    status: 'on-hold',
    project: 'E-commerce Platform'
  },
  {
    id: '004',
    date: '2024-02-20',
    amount: 1500,
    method: 'card',
    status: 'failed',
    project: 'Logo Design'
  }
];

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
      >
        <p className="font-bold text-gray-800">{label}</p>
        <p className="text-blue-600">
          Earnings: Ksh{payload[0].value}
        </p>
      </motion.div>
    );
  }
  return null;
};

const Payment: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('mpesa');
  const [paymentPeriod, setPaymentPeriod] = useState<PaymentPeriod>('1month');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [activeTab, setActiveTab] = useState<'earnings' | 'transactions'>('earnings');

  // Status configurations
  const statusColors = {
    'completed': 'text-green-600 bg-green-50',
    'pending': 'text-yellow-600 bg-yellow-50',
    'on-hold': 'text-blue-600 bg-blue-50',
    'failed': 'text-red-600 bg-red-50'
  };

  const statusIcons = {
    'completed': <CheckCircle className="w-5 h-5" />,
    'pending': <Clock className="w-5 h-5" />,
    'on-hold': <RefreshCw className="w-5 h-5" />,
    'failed': <XCircle className="w-5 h-5" />
  };

  // Payment method icons
  const paymentMethodIcons = {
    'mpesa': <PhoneIcon className="w-6 h-6 text-green-500" />,
    // 'bank': <BankIcon className="w-6 h-6 text-blue-500" />,
    'paypal': <WalletIcon className="w-6 h-6 text-indigo-500" />,
    'card': <CreditCardIcon className="w-6 h-6 text-purple-500" />
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Earnings calculations
  const totalEarnings = transactionHistory
    .filter(t => t.status === 'completed')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  const pendingEarnings = transactionHistory
    .filter(t => t.status === 'pending' || t.status === 'on-hold')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden"
    >
      {/* Sidebar */}
      <motion.div 
        variants={itemVariants}
        className="w-full md:w-1/3 space-y-4 md:space-y-6"
      >
        {/* Earnings Summary */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Earnings Summary
            </h2>
          </div>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-50 rounded-xl p-4 text-center"
            >
              <div className="text-sm text-gray-600 mb-2">Total Earnings</div>
              <div className="text-2xl font-bold text-blue-600">Ksh{totalEarnings.toLocaleString()}</div>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-50 rounded-xl p-4 text-center"
            >
              <div className="text-sm text-gray-600 mb-2">Pending Earnings</div>
              <div className="text-2xl font-bold text-yellow-600">Ksh{pendingEarnings.toLocaleString()}</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Transactions and Earnings Tabs */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex border-b border-gray-200 mb-4">
            {['earnings', 'transactions'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab as 'earnings' | 'transactions')}
                className={`flex-1 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {tab === 'earnings' ? 'Earnings' : 'Transactions'}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'earnings' ? (
              <motion.div
                key="earnings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <motion.div 
                  variants={itemVariants}
                  className="bg-gray-100 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm text-gray-600">Net Earnings This Month</div>
                    <div className="text-xl font-bold text-green-600">Ksh 15,500</div>
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="transactions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {transactionHistory.map((transaction) => (
                  <motion.div 
                    key={transaction.id}
                    whileHover={{ scale: 1.02, backgroundColor: '#f5f5f5' }}
                    className="bg-gray-100 rounded-xl p-3 flex items-center justify-between hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${statusColors[transaction.status]}`}>
                        {statusIcons[transaction.status]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{transaction.project}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {paymentMethodIcons[transaction.method as PaymentMethod]}
                      <div className="font-bold text-sm">${transaction.amount}</div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Payment Methods */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Payment Methods
          </h2>
          <div className="space-y-3">
            {[
              { 
                id: 'mpesa', 
                name: 'M-Pesa', 
                icon: <Zap className="w-8 h-8 text-green-500" />,
                description: 'Instant Mobile Money' 
              },
              { 
                id: 'bank', 
                name: 'Bank Transfer', 
                icon: <DollarSign className="w-8 h-8 text-blue-600" />,
                description: 'Direct Bank Deposit' 
              },
              { 
                id: 'paypal', 
                name: 'PayPal', 
                icon: <Globe className="w-8 h-8 text-indigo-600" />,
                description: 'Global Payment Network' 
              },
              { 
                id: 'card', 
                name: 'Credit Card', 
                icon: <CreditCard className="w-8 h-8 text-purple-600" />,
                description: 'Secure Card Payment' 
              }
            ].map((method) => (
              <motion.button 
                key={method.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMethod(method.id as PaymentMethod)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activeMethod === method.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                }`}
              >
                {method.icon}
                <div className="text-left">
                  <div className="font-semibold text-sm md:text-base">{method.name}</div>
                  <div className="text-xs opacity-70">{method.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content - Payment Details */}
      <motion.div 
        variants={itemVariants}
        className="w-full md:w-2/3 space-y-4 md:space-y-6"
      >
        {/* Payment Chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Earnings Overview
            </h2>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">{paymentPeriod}</span>
            </div>
            </div>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={paymentData[paymentPeriod]}
                margin={{ top: 10, right: 0, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorEarnings)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Payment Input Form */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Payment Details
          </h2>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeMethod}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {activeMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInput}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    value={cardDetails.cardName}
                    onChange={handleCardInput}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInput}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={handleCardInput}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              {activeMethod === 'mpesa' && (
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="M-Pesa Phone Number"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
              {activeMethod === 'bank' && (
                <>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Bank Account Number"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Bank Name"
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              {activeMethod === 'paypal' && (
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="PayPal Email Address"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Save Payment Method</span>
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Payment;