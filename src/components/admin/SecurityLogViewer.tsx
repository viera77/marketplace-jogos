'use client';

import { Shield, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SecurityLog } from '@/lib/types';

interface SecurityLogViewerProps {
  logs: SecurityLog[];
}

export default function SecurityLogViewer({ logs }: SecurityLogViewerProps) {
  const getActionIcon = (actionType: SecurityLog['actionType']) => {
    switch (actionType) {
      case 'account_marked_in_transfer':
        return <Shield className="w-5 h-5 text-orange-500" />;
      case 'account_transfer_confirmed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'account_blocked':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'payment_released':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'payment_refunded':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionLabel = (actionType: SecurityLog['actionType']) => {
    const labels: Record<SecurityLog['actionType'], string> = {
      'account_marked_in_transfer': '🔒 Conta Marcada em Transferência',
      'account_transfer_confirmed': '✅ Transferência Confirmada',
      'account_blocked': '🚫 Conta Bloqueada',
      'account_unblocked': '🔓 Conta Desbloqueada',
      'payment_released': '💸 Pagamento Liberado',
      'payment_held': '💰 Pagamento Retido',
      'payment_refunded': '🔄 Pagamento Reembolsado'
    };
    return labels[actionType] || actionType;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (logs.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
        <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Nenhum log de segurança registrado</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Histórico de Segurança</h2>
          <p className="text-sm text-gray-400">Registro completo de ações administrativas</p>
        </div>
      </div>

      {/* Timeline de Logs */}
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={log.id}
            className="relative pl-8 pb-6 border-l-2 border-gray-800 last:pb-0"
          >
            {/* Ícone na timeline */}
            <div className="absolute left-[-13px] top-0 bg-gray-900 p-1 rounded-full border-2 border-gray-800">
              {getActionIcon(log.actionType)}
            </div>

            {/* Conteúdo do log */}
            <div className="bg-gray-800 rounded-lg p-4">
              {/* Cabeçalho */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {getActionLabel(log.actionType)}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(log.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-400">Admin:</span>
                  <span className="text-white font-medium">{log.performedByUsername}</span>
                </div>

                {log.previousStatus && log.newStatus && (
                  <div className="flex gap-2">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white">
                      {log.previousStatus} → {log.newStatus}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <span className="text-gray-400">Motivo:</span>
                  <span className="text-white">{log.reason}</span>
                </div>

                {log.notes && (
                  <div className="flex gap-2">
                    <span className="text-gray-400">Notas:</span>
                    <span className="text-gray-300">{log.notes}</span>
                  </div>
                )}

                {/* IDs de referência */}
                <div className="pt-2 mt-2 border-t border-gray-700 text-xs text-gray-500">
                  {log.productId && <div>Produto: {log.productId}</div>}
                  {log.orderId && <div>Pedido: {log.orderId}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          🔒 Logs de segurança são permanentes e não podem ser alterados
        </div>
      </div>
    </div>
  );
}
