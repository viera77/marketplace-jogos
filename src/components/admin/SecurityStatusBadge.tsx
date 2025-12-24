'use client';

import { Shield, Lock, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Product, Order } from '@/lib/types';
import { PRODUCT_STATUSES, PAYMENT_RELEASE_STATUSES } from '@/lib/constants';
import { getProductStatusMessage, getPaymentStatusMessage } from '@/lib/security';

interface SecurityStatusBadgeProps {
  product: Product;
  order?: Order;
  showDetails?: boolean;
}

export default function SecurityStatusBadge({ 
  product, 
  order,
  showDetails = false 
}: SecurityStatusBadgeProps) {
  const productStatusConfig = PRODUCT_STATUSES.find(s => s.value === product.status);
  const productStatusMsg = getProductStatusMessage(product);
  
  const paymentStatusConfig = order 
    ? PAYMENT_RELEASE_STATUSES.find(s => s.value === order.paymentReleaseStatus)
    : null;
  const paymentStatusMsg = order ? getPaymentStatusMessage(order) : null;

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <Shield className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30 text-green-400';
      case 'warning':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  return (
    <div className="space-y-3">
      {/* Status da Conta */}
      <div className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border
        ${getStatusColor(productStatusMsg.type)}
      `}>
        {getStatusIcon(productStatusMsg.type)}
        <div className="flex-1">
          <div className="font-semibold text-sm">
            {productStatusConfig?.label || product.status}
          </div>
          {showDetails && (
            <div className="text-xs opacity-80 mt-1">
              {productStatusMsg.message}
            </div>
          )}
        </div>
        {product.status === 'in_transfer_security' && (
          <Lock className="w-5 h-5" />
        )}
      </div>

      {/* Status do Pagamento (se houver pedido) */}
      {order && paymentStatusConfig && paymentStatusMsg && (
        <div className={`
          flex items-center gap-3 px-4 py-3 rounded-lg border
          ${getStatusColor(paymentStatusMsg.type)}
        `}>
          {getStatusIcon(paymentStatusMsg.type)}
          <div className="flex-1">
            <div className="font-semibold text-sm">
              {paymentStatusConfig.label}
            </div>
            {showDetails && (
              <div className="text-xs opacity-80 mt-1">
                {paymentStatusMsg.message}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Informações de Bloqueio */}
      {product.securityLockReason && showDetails && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white mb-1">
                Motivo do Bloqueio
              </div>
              <div className="text-sm text-gray-300">
                {product.securityLockReason}
              </div>
              {product.securityLockedAt && (
                <div className="text-xs text-gray-500 mt-2">
                  Bloqueado em: {new Date(product.securityLockedAt).toLocaleString('pt-BR')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notas de Pagamento */}
      {order?.paymentReleaseNotes && showDetails && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-white mb-1">
                Notas do Administrador
              </div>
              <div className="text-sm text-gray-300">
                {order.paymentReleaseNotes}
              </div>
              {order.paymentReleasedAt && (
                <div className="text-xs text-gray-500 mt-2">
                  Atualizado em: {new Date(order.paymentReleasedAt).toLocaleString('pt-BR')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
