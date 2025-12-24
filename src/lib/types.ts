// Types para o GameMarket

export type UserRole = 'buyer' | 'seller' | 'admin';

export type UserStatus = 'active' | 'suspended' | 'banned';

export type SellerTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  // Seller specific
  sellerTier?: SellerTier;
  sellerRating?: number;
  totalSales?: number;
  balance?: number;
}

export type ProductCategory = 
  | 'game-currency'
  | 'virtual-items'
  | 'game-accounts'
  | 'boosting'
  | 'coaching'
  | 'top-ups'
  | 'gift-cards'
  | 'licenses'
  | 'other-services';

export type DeliveryType = 'manual' | 'automatic';

// 🔒 SISTEMA DE SEGURANÇA - Status de Produto/Conta
export type ProductStatus = 
  | 'active'                    // Disponível para venda
  | 'paused'                    // Pausado pelo vendedor
  | 'in_transfer_security'      // 🔒 Em transferência (modo segurança) - BLOQUEADO
  | 'transferred_confirmed'     // ✅ Transferido e confirmado
  | 'blocked_security'          // 🚫 Bloqueado por segurança
  | 'sold'                      // Vendido (legado)
  | 'cancelled'                 // Cancelado
  | 'removed';                  // Removido

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  game: string;
  category: ProductCategory;
  description: string;
  price: number;
  currency: string;
  server?: string;
  region?: string;
  deliveryTime: string; // ex: "1-24 hours"
  deliveryType: DeliveryType;
  stock: number;
  rules?: string;
  status: ProductStatus;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
  // 🔒 Campos de segurança
  securityLockReason?: string;
  securityLockedBy?: string; // Admin ID
  securityLockedAt?: Date;
}

export type OrderStatus = 
  | 'pending_payment'
  | 'paid'
  | 'in_progress'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'cancelled'
  | 'refunded';

// 🔒 Status de pagamento separado do status da conta
export type PaymentReleaseStatus = 
  | 'held'                      // 💰 Retido (padrão após pagamento)
  | 'pending_verification'      // 🔍 Aguardando verificação
  | 'approved_for_release'      // ✅ Aprovado para liberação
  | 'released'                  // 💸 Liberado ao vendedor
  | 'refunded';                 // 🔄 Reembolsado ao comprador

export interface Order {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: string;
  escrowAmount: number;
  deliveryDetails?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  // 🔒 Sistema de liberação de pagamento
  paymentReleaseStatus: PaymentReleaseStatus;
  paymentReleasedAt?: Date;
  paymentReleasedBy?: string; // Admin ID
  paymentReleaseNotes?: string;
}

export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'closed';

export type DisputeResolution = 'refund_full' | 'refund_partial' | 'no_refund' | 'pending';

export interface Dispute {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  reason: string;
  description: string;
  status: DisputeStatus;
  resolution?: DisputeResolution;
  refundAmount?: number;
  adminNotes?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Review {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  receiverId: string;
  message: string;
  attachments?: string[];
  createdAt: Date;
  read: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'sale' | 'purchase' | 'commission' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: Date;
}

export interface PlatformSettings {
  commissionRate: number; // percentage
  withdrawalFee: number;
  minWithdrawal: number;
  featuredListingPrice: number;
}

// 🔒 SISTEMA DE LOG DE SEGURANÇA
export type SecurityActionType = 
  | 'account_marked_in_transfer'
  | 'account_transfer_confirmed'
  | 'account_blocked'
  | 'account_unblocked'
  | 'payment_released'
  | 'payment_held'
  | 'payment_refunded';

export interface SecurityLog {
  id: string;
  productId?: string;
  orderId?: string;
  actionType: SecurityActionType;
  performedBy: string; // Admin ID
  performedByUsername: string;
  reason: string;
  notes?: string;
  previousStatus?: string;
  newStatus?: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

// 🔒 Interface para ações de segurança do Admin
export interface AdminSecurityAction {
  productId: string;
  orderId?: string;
  action: 'mark_in_transfer' | 'confirm_transfer' | 'block_account' | 'release_payment' | 'refund_payment';
  reason: string;
  notes?: string;
  adminId: string;
}
