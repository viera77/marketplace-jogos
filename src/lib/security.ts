// 🔒 Sistema de Segurança - Funções de Validação e Controle

import { 
  Product, 
  Order, 
  SecurityLog, 
  AdminSecurityAction,
  ProductStatus,
  PaymentReleaseStatus 
} from './types';

/**
 * 🔒 REGRAS DE SEGURANÇA CRÍTICAS
 * 
 * 1. Apenas Admin Master pode executar ações de segurança
 * 2. Marcação de conta NÃO libera pagamento automaticamente
 * 3. Pagamento e status de conta são INDEPENDENTES
 * 4. Todas as ações são registradas em log
 * 5. Reversões exigem permissão máxima
 */

// Verifica se usuário é Admin Master
export function isAdminMaster(userId: string, userRole: string): boolean {
  // TODO: Implementar verificação real com banco de dados
  // Por enquanto, verifica apenas se é admin
  return userRole === 'admin';
}

// Verifica se produto pode ser marcado em transferência
export function canMarkInTransfer(product: Product): {
  allowed: boolean;
  reason?: string;
} {
  // Produto deve estar ativo ou pausado
  if (!['active', 'paused'].includes(product.status)) {
    return {
      allowed: false,
      reason: 'Produto não está disponível para marcação'
    };
  }

  // Produto deve ter estoque
  if (product.stock <= 0) {
    return {
      allowed: false,
      reason: 'Produto sem estoque'
    };
  }

  return { allowed: true };
}

// Verifica se pagamento pode ser liberado
export function canReleasePayment(order: Order, product: Product): {
  allowed: boolean;
  reason?: string;
} {
  // Pedido deve estar pago
  if (order.status !== 'paid' && order.status !== 'delivered') {
    return {
      allowed: false,
      reason: 'Pedido não está em status válido para liberação'
    };
  }

  // Pagamento não pode já estar liberado
  if (order.paymentReleaseStatus === 'released') {
    return {
      allowed: false,
      reason: 'Pagamento já foi liberado'
    };
  }

  // Pagamento não pode estar reembolsado
  if (order.paymentReleaseStatus === 'refunded') {
    return {
      allowed: false,
      reason: 'Pagamento já foi reembolsado'
    };
  }

  // Idealmente, conta deve estar transferida
  if (product.status !== 'transferred_confirmed') {
    return {
      allowed: true, // Permitido, mas com aviso
      reason: 'ATENÇÃO: Conta ainda não foi confirmada como transferida'
    };
  }

  return { allowed: true };
}

// Verifica se pagamento pode ser reembolsado
export function canRefundPayment(order: Order): {
  allowed: boolean;
  reason?: string;
} {
  // Pagamento não pode já estar liberado
  if (order.paymentReleaseStatus === 'released') {
    return {
      allowed: false,
      reason: 'Pagamento já foi liberado ao vendedor'
    };
  }

  // Pagamento não pode já estar reembolsado
  if (order.paymentReleaseStatus === 'refunded') {
    return {
      allowed: false,
      reason: 'Pagamento já foi reembolsado'
    };
  }

  return { allowed: true };
}

// Valida ação de segurança
export function validateSecurityAction(
  action: AdminSecurityAction,
  product: Product,
  order?: Order
): {
  valid: boolean;
  error?: string;
  warning?: string;
} {
  switch (action.action) {
    case 'mark_in_transfer':
      const markCheck = canMarkInTransfer(product);
      if (!markCheck.allowed) {
        return { valid: false, error: markCheck.reason };
      }
      break;

    case 'confirm_transfer':
      if (product.status !== 'in_transfer_security') {
        return { 
          valid: false, 
          error: 'Produto não está em processo de transferência' 
        };
      }
      break;

    case 'block_account':
      if (product.status === 'blocked_security') {
        return { valid: false, error: 'Produto já está bloqueado' };
      }
      break;

    case 'release_payment':
      if (!order) {
        return { valid: false, error: 'Pedido não encontrado' };
      }
      const releaseCheck = canReleasePayment(order, product);
      if (!releaseCheck.allowed) {
        return { valid: false, error: releaseCheck.reason };
      }
      if (releaseCheck.reason) {
        return { valid: true, warning: releaseCheck.reason };
      }
      break;

    case 'refund_payment':
      if (!order) {
        return { valid: false, error: 'Pedido não encontrado' };
      }
      const refundCheck = canRefundPayment(order);
      if (!refundCheck.allowed) {
        return { valid: false, error: refundCheck.reason };
      }
      break;
  }

  // Validar motivo obrigatório
  if (!action.reason || action.reason.trim().length < 10) {
    return { 
      valid: false, 
      error: 'Motivo deve ter pelo menos 10 caracteres' 
    };
  }

  return { valid: true };
}

// Cria log de segurança
export function createSecurityLog(
  action: AdminSecurityAction,
  adminUsername: string,
  previousStatus?: string,
  newStatus?: string
): Omit<SecurityLog, 'id' | 'createdAt'> {
  const actionTypeMap: Record<string, SecurityLog['actionType']> = {
    'mark_in_transfer': 'account_marked_in_transfer',
    'confirm_transfer': 'account_transfer_confirmed',
    'block_account': 'account_blocked',
    'release_payment': 'payment_released',
    'refund_payment': 'payment_refunded'
  };

  return {
    productId: action.productId,
    orderId: action.orderId,
    actionType: actionTypeMap[action.action],
    performedBy: action.adminId,
    performedByUsername: adminUsername,
    reason: action.reason,
    notes: action.notes,
    previousStatus,
    newStatus,
    metadata: {
      action: action.action,
      timestamp: new Date().toISOString()
    }
  };
}

// Aplica ação de segurança no produto
export function applySecurityActionToProduct(
  product: Product,
  action: AdminSecurityAction
): Product {
  const updatedProduct = { ...product };

  switch (action.action) {
    case 'mark_in_transfer':
      updatedProduct.status = 'in_transfer_security';
      updatedProduct.securityLockReason = action.reason;
      updatedProduct.securityLockedBy = action.adminId;
      updatedProduct.securityLockedAt = new Date();
      break;

    case 'confirm_transfer':
      updatedProduct.status = 'transferred_confirmed';
      updatedProduct.securityLockReason = action.reason;
      break;

    case 'block_account':
      updatedProduct.status = 'blocked_security';
      updatedProduct.securityLockReason = action.reason;
      updatedProduct.securityLockedBy = action.adminId;
      updatedProduct.securityLockedAt = new Date();
      break;
  }

  updatedProduct.updatedAt = new Date();
  return updatedProduct;
}

// Aplica ação de segurança no pedido (pagamento)
export function applySecurityActionToOrder(
  order: Order,
  action: AdminSecurityAction
): Order {
  const updatedOrder = { ...order };

  switch (action.action) {
    case 'release_payment':
      updatedOrder.paymentReleaseStatus = 'released';
      updatedOrder.paymentReleasedAt = new Date();
      updatedOrder.paymentReleasedBy = action.adminId;
      updatedOrder.paymentReleaseNotes = action.reason;
      updatedOrder.status = 'completed';
      break;

    case 'refund_payment':
      updatedOrder.paymentReleaseStatus = 'refunded';
      updatedOrder.paymentReleasedAt = new Date();
      updatedOrder.paymentReleasedBy = action.adminId;
      updatedOrder.paymentReleaseNotes = action.reason;
      updatedOrder.status = 'refunded';
      break;
  }

  updatedOrder.updatedAt = new Date();
  return updatedOrder;
}

// Verifica se vendedor pode editar produto
export function canSellerEditProduct(product: Product): boolean {
  // Vendedor NÃO pode editar se produto estiver em status de segurança
  const blockedStatuses: ProductStatus[] = [
    'in_transfer_security',
    'transferred_confirmed',
    'blocked_security'
  ];

  return !blockedStatuses.includes(product.status);
}

// Verifica se produto pode ser comprado
export function canBuyProduct(product: Product): boolean {
  return product.status === 'active' && product.stock > 0;
}

// Gera mensagem de status para UI
export function getProductStatusMessage(product: Product): {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
} {
  switch (product.status) {
    case 'active':
      return { 
        message: 'Produto disponível para compra', 
        type: 'success' 
      };
    
    case 'paused':
      return { 
        message: 'Produto pausado pelo vendedor', 
        type: 'info' 
      };
    
    case 'in_transfer_security':
      return { 
        message: '🔒 Conta em processo de transferência (bloqueada por segurança)', 
        type: 'warning' 
      };
    
    case 'transferred_confirmed':
      return { 
        message: '✅ Transferência confirmada pelo administrador', 
        type: 'success' 
      };
    
    case 'blocked_security':
      return { 
        message: '🚫 Produto bloqueado por segurança', 
        type: 'error' 
      };
    
    default:
      return { 
        message: 'Status desconhecido', 
        type: 'info' 
      };
  }
}

// Gera mensagem de status de pagamento para UI
export function getPaymentStatusMessage(order: Order): {
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
} {
  switch (order.paymentReleaseStatus) {
    case 'held':
      return { 
        message: '💰 Pagamento retido em escrow (segurança)', 
        type: 'info' 
      };
    
    case 'pending_verification':
      return { 
        message: '🔍 Aguardando verificação do administrador', 
        type: 'warning' 
      };
    
    case 'approved_for_release':
      return { 
        message: '✅ Pagamento aprovado para liberação', 
        type: 'success' 
      };
    
    case 'released':
      return { 
        message: '💸 Pagamento liberado ao vendedor', 
        type: 'success' 
      };
    
    case 'refunded':
      return { 
        message: '🔄 Pagamento reembolsado ao comprador', 
        type: 'info' 
      };
    
    default:
      return { 
        message: 'Status desconhecido', 
        type: 'info' 
      };
  }
}
