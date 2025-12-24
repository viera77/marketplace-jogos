'use client';

import { useState } from 'react';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  ShieldAlert, 
  DollarSign, 
  RotateCcw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Product, Order, AdminSecurityAction } from '@/lib/types';
import { ADMIN_SECURITY_ACTIONS, SECURITY_LEGAL_TEXTS } from '@/lib/constants';
import { validateSecurityAction } from '@/lib/security';

interface AdminSecurityPanelProps {
  product: Product;
  order?: Order;
  onSecurityAction: (action: AdminSecurityAction) => Promise<void>;
}

export default function AdminSecurityPanel({ 
  product, 
  order,
  onSecurityAction 
}: AdminSecurityPanelProps) {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setWarning('');

    if (!selectedAction) {
      setError('Selecione uma ação');
      return;
    }

    // Criar ação
    const action: AdminSecurityAction = {
      productId: product.id,
      orderId: order?.id,
      action: selectedAction as any,
      reason,
      notes,
      adminId: 'current-admin-id' // TODO: Pegar do contexto de autenticação
    };

    // Validar ação
    const validation = validateSecurityAction(action, product, order);
    
    if (!validation.valid) {
      setError(validation.error || 'Ação inválida');
      return;
    }

    if (validation.warning) {
      setWarning(validation.warning);
    }

    try {
      setLoading(true);
      await onSecurityAction(action);
      
      // Limpar formulário
      setSelectedAction('');
      setReason('');
      setNotes('');
      setWarning('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao executar ação');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (actionValue: string) => {
    switch (actionValue) {
      case 'mark_in_transfer':
        return <Lock className="w-5 h-5" />;
      case 'confirm_transfer':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'block_account':
        return <ShieldAlert className="w-5 h-5" />;
      case 'release_payment':
        return <DollarSign className="w-5 h-5" />;
      case 'refund_payment':
        return <RotateCcw className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Painel de Segurança Admin</h2>
          <p className="text-sm text-gray-400">Controle preventivo de contas e pagamentos</p>
        </div>
      </div>

      {/* Avisos Legais */}
      <div className="space-y-3 mb-6">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-200">
              {SECURITY_LEGAL_TEXTS.accountTransferWarning}
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-200">
              {SECURITY_LEGAL_TEXTS.paymentReleaseWarning}
            </div>
          </div>
        </div>
      </div>

      {/* Status Atual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Status da Conta</div>
          <div className="text-lg font-semibold text-white">{product.status}</div>
          {product.securityLockReason && (
            <div className="text-xs text-gray-500 mt-2">
              Motivo: {product.securityLockReason}
            </div>
          )}
        </div>

        {order && (
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Status do Pagamento</div>
            <div className="text-lg font-semibold text-white">
              {order.paymentReleaseStatus}
            </div>
            {order.paymentReleaseNotes && (
              <div className="text-xs text-gray-500 mt-2">
                Notas: {order.paymentReleaseNotes}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Formulário de Ação */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seleção de Ação */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ação de Segurança
          </label>
          <div className="grid grid-cols-1 gap-2">
            {ADMIN_SECURITY_ACTIONS.map((action) => (
              <button
                key={action.value}
                type="button"
                onClick={() => setSelectedAction(action.value)}
                className={`
                  flex items-center gap-3 p-4 rounded-lg border-2 transition-all
                  ${selectedAction === action.value
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }
                `}
              >
                <div className={`p-2 ${action.color} rounded-lg`}>
                  {getActionIcon(action.value)}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white">{action.label}</div>
                  <div className="text-xs text-gray-400">{action.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Motivo (obrigatório) */}
        {selectedAction && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Motivo * (mínimo 10 caracteres)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Descreva o motivo desta ação de segurança..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                rows={3}
                required
                minLength={10}
              />
            </div>

            {/* Notas Adicionais (opcional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notas Adicionais (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Informações complementares, observações, etc..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                rows={2}
              />
            </div>
          </>
        )}

        {/* Mensagens de Erro/Aviso */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="text-sm text-red-200">{error}</div>
            </div>
          </div>
        )}

        {warning && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <div className="text-sm text-yellow-200">{warning}</div>
            </div>
          </div>
        )}

        {/* Botão de Submissão */}
        <button
          type="submit"
          disabled={!selectedAction || loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Executando...' : 'Executar Ação de Segurança'}
        </button>
      </form>

      {/* Informações de Segurança */}
      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="text-xs text-gray-500 space-y-2">
          <p>🔒 Todas as ações são registradas em log permanente</p>
          <p>⚖️ Apenas Admin Master pode executar ações de segurança</p>
          <p>💰 Marcação de conta NÃO libera pagamento automaticamente</p>
          <p>🛡️ Reversões exigem permissão máxima</p>
        </div>
      </div>
    </div>
  );
}
