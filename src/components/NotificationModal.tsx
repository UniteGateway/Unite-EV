import React from 'react';
import { NotificationItem } from '../types';
import { Bell, CheckCheck, X, Zap, Landmark, Building2, AlertTriangle, Info } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'charging':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'finance':
        return <Landmark className="w-4 h-4 text-emerald-500" />;
      case 'application':
        return <Building2 className="w-4 h-4 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#002D62]" />
            <h3 className="font-bold text-slate-900 text-base">Platform Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl transition-colors ${
                  !n.read ? 'bg-blue-50/50 border border-blue-100/70' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Real-time push alerts for charging, applications & network operations
          </p>
        </div>
      </div>
    </div>
  );
};
