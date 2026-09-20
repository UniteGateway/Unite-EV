import React, { useState } from 'react';
import { Wallet, X, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onAddFunds: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  balance,
  onAddFunds,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleTopup = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (amount > 0) {
      onAddFunds(amount);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        onClose();
      }, 1200);
    }
  };

  const presetAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-gradient-to-r from-[#002D62] to-[#0A3D78] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-base">Unitev EV Wallet</h3>
              <p className="text-xs text-blue-200">Instant 1-Click Fast Charging Checkout</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Current Balance Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Available Balance</span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Auto-Refund Ready
            </div>
          </div>

          {/* Quick Amounts */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Top-up Amount
            </label>
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedAmount === amt && !customAmount
                      ? 'border-[#002D62] bg-blue-50 text-[#002D62] shadow-2xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="mt-3">
              <input
                type="number"
                placeholder="Or enter custom amount (₹)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#002D62] focus:border-transparent"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPaymentMode('upi')}
                className={`py-2 px-2 text-center rounded-xl text-xs font-medium border cursor-pointer ${
                  paymentMode === 'upi' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600'
                }`}
              >
                UPI / QR
              </button>
              <button
                onClick={() => setPaymentMode('card')}
                className={`py-2 px-2 text-center rounded-xl text-xs font-medium border cursor-pointer ${
                  paymentMode === 'card' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600'
                }`}
              >
                Credit/Debit
              </button>
              <button
                onClick={() => setPaymentMode('netbanking')}
                className={`py-2 px-2 text-center rounded-xl text-xs font-medium border cursor-pointer ${
                  paymentMode === 'netbanking' ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600'
                }`}
              >
                NetBanking
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleTopup}
            disabled={successMsg}
            className="w-full py-3 bg-[#002D62] hover:bg-[#002047] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {successMsg ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Wallet Recharged Successfully!</span>
              </>
            ) : (
              <>
                <span>Add ₹{customAmount ? customAmount : selectedAmount} to Wallet</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
