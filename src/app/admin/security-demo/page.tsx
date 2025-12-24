'use client';

import { useState } from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Product, Order, AdminSecurityAction } from '@/lib/types';
import AdminSecurityPanel from '@/components/admin/AdminSecurityPanel';
import SecurityLogViewer from '@/components/admin/SecurityLogViewer';
import SecurityStatusBadge from '@/components/admin/SecurityStatusBadge';
import { SECURITY_LEGAL_TEXTS } from '@/lib/constants';

// Mock data para demonstração
const mockProduct: Product = {
  id: 'prod-123',
  sellerId: 'seller-456',
  title: 'Conta League of Legends - Diamante IV',
  game: 'League of Legends',
  category: 'game-accounts',
  description: 'Conta ranqueada com 150+ skins',
  price: 299.99,
  currency: 'USD',
  server: 'BR',
  region: 'Brasil',
  deliveryTime: '1-2 hours',
  deliveryType: 'manual',
  stock: 1,
  status: 'active',
  images: [],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15')
};

const mockOrder: Order = {
  id: 'order-789',
  productId: 'prod-123',
  buyerId: 'buyer-101',
  sellerId: 'seller-456',
  quantity: 1,
  totalPrice: 299.99,
  status: 'paid',
  paymentMethod: 'credit_card',
  escrowAmount: 299.99,
  createdAt: new Date('2024-01-20'),
  updatedAt: new Date('2024-01-20'),
  paymentReleaseStatus: 'held'
};

const mockLogs = [
  {
    id: 'log-1',
    productId: 'prod-123',
    orderId: 'order-789',
    actionType: 'account_marked_in_transfer' as const,
    performedBy: 'admin-001',
    performedByUsername: 'Admin Master',
    reason: 'Comprador pagou, iniciando processo de transferência',
    notes: 'Vendedor notificado para iniciar transferência',
    previousStatus: 'active',
    newStatus: 'in_transfer_security',
    createdAt: new Date('2024-01-20T10:30:00'),
    metadata: {}
  }
];

export default function AdminSecurityDemoPage() {
  const [product, setProduct] = useState<Product>(mockProduct);
  const [order, setOrder] = useState<Order>(mockOrder);
  const [logs, setLogs] = useState(mockLogs);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSecurityAction = async (action: AdminSecurityAction) => {
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Atualizar produto
    const updatedProduct = { ...product };
    const updatedOrder = { ...order };

    switch (action.action) {
      case 'mark_in_transfer':
        updatedProduct.status = 'in_transfer_security';
        updatedProduct.securityLockReason = action.reason;
        updatedProduct.securityLockedBy = action.adminId;
        updatedProduct.securityLockedAt = new Date();
        setSuccessMessage('✅ Conta marcada em transferência com sucesso!');
        break;

      case 'confirm_transfer':
        updatedProduct.status = 'transferred_confirmed';
        setSuccessMessage('✅ Transferência confirmada com sucesso!');
        break;

      case 'block_account':
        updatedProduct.status = 'blocked_security';
        updatedProduct.securityLockReason = action.reason;
        updatedProduct.securityLockedBy = action.adminId;
        updatedProduct.securityLockedAt = new Date();
        setSuccessMessage('🚫 Conta bloqueada por segurança!');
        break;

      case 'release_payment':
        updatedOrder.paymentReleaseStatus = 'released';
        updatedOrder.paymentReleasedAt = new Date();
        updatedOrder.paymentReleasedBy = action.adminId;
        updatedOrder.paymentReleaseNotes = action.reason;
        updatedOrder.status = 'completed';
        setSuccessMessage('💸 Pagamento liberado ao vendedor!');
        break;

      case 'refund_payment':
        updatedOrder.paymentReleaseStatus = 'refunded';
        updatedOrder.paymentReleasedAt = new Date();
        updatedOrder.paymentReleasedBy = action.adminId;
        updatedOrder.paymentReleaseNotes = action.reason;
        updatedOrder.status = 'refunded';
        setSuccessMessage('🔄 Pagamento reembolsado ao comprador!');
        break;
    }

    setProduct(updatedProduct);
    setOrder(updatedOrder);

    // Adicionar log
    const newLog = {
      id: `log-${Date.now()}`,
      productId: action.productId,
      orderId: action.orderId,
      actionType: action.action === 'mark_in_transfer' ? 'account_marked_in_transfer' as const :
                  action.action === 'confirm_transfer' ? 'account_transfer_confirmed' as const :
                  action.action === 'block_account' ? 'account_blocked' as const :
                  action.action === 'release_payment' ? 'payment_released' as const :
                  'payment_refunded' as const,
      performedBy: action.adminId,
      performedByUsername: 'Admin Master',
      reason: action.reason,
      notes: action.notes,
      previousStatus: product.status,
      newStatus: updatedProduct.status,
      createdAt: new Date(),
      metadata: {}
    };

    setLogs([newLog, ...logs]);

    // Limpar mensagem após 5 segundos
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Sistema de Segurança Admin
              </h1>
              <p className="text-gray-400">
                Controle preventivo de contas e liberação de pagamentos
              </p>
            </div>
          </div>

          {/* Aviso Legal Principal */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6">
            <div className="flex gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-bold text-white text-lg">⚖️ Aviso Legal Importante</h3>
                <p className="text-sm text-orange-200">
                  {SECURITY_LEGAL_TEXTS.accountTransferWarning}
                </p>
                <p className="text-sm text-orange-200">
                  {SECURITY_LEGAL_TEXTS.paymentReleaseWarning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagem de Sucesso */}
        {successMessage && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-green-200 font-medium">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Informações do Produto/Pedido */}
          <div className="space-y-6">
            {/* Card do Produto */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Informações do Produto</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-400">Título:</span>
                  <p className="text-white font-medium">{product.title}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Jogo:</span>
                  <p className="text-white">{product.game}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Preço:</span>
                  <p className="text-white font-bold">${product.price}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">ID do Produto:</span>
                  <p className="text-white text-sm font-mono">{product.id}</p>
                </div>
              </div>
            </div>

            {/* Card do Pedido */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Informações do Pedido</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-400">ID do Pedido:</span>
                  <p className="text-white text-sm font-mono">{order.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Valor Total:</span>
                  <p className="text-white font-bold">${order.totalPrice}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Valor em Escrow:</span>
                  <p className="text-white">${order.escrowAmount}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Método de Pagamento:</span>
                  <p className="text-white">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <SecurityStatusBadge 
              product={product} 
              order={order}
              showDetails={true}
            />
          </div>

          {/* Painel de Ações */}
          <div>
            <AdminSecurityPanel
              product={product}
              order={order}
              onSecurityAction={handleSecurityAction}
            />
          </div>
        </div>

        {/* Histórico de Logs */}
        <SecurityLogViewer logs={logs} />

        {/* Informações Adicionais */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Proteção ao Comprador</h4>
                <p className="text-xs text-blue-200">
                  {SECURITY_LEGAL_TEXTS.buyerProtection}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Diretrizes para Vendedores</h4>
                <p className="text-xs text-purple-200">
                  {SECURITY_LEGAL_TEXTS.sellerGuidelines}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Sistema Mais Seguro</h4>
                <p className="text-xs text-green-200">
                  Controle preventivo + liberação manual = máxima segurança para todas as partes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
