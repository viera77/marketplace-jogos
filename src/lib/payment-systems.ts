// 🌍 Sistema de Pagamentos Internacionais

import { SupportedCurrency } from './i18n';

export interface PaymentGateway {
  id: string;
  name: string;
  logo: string;
  supportedCurrencies: SupportedCurrency[];
  supportedRegions: string[];
  fees: {
    percentage: number;
    fixed: number;
    currency: SupportedCurrency;
  };
  processingTime: string;
  features: string[];
}

// 💳 Gateways de Pagamento Disponíveis
export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/payment-logos/stripe.svg',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'BRL', 'JPY', 'AUD', 'CAD', 'MXN'],
    supportedRegions: ['Global'],
    fees: {
      percentage: 2.9,
      fixed: 0.30,
      currency: 'USD'
    },
    processingTime: 'Instant',
    features: [
      'Cartões de crédito/débito',
      'Apple Pay / Google Pay',
      'SEPA (Europa)',
      'PIX (Brasil)',
      'Proteção contra fraude',
      'Suporte 3D Secure'
    ]
  },
  
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '/payment-logos/paypal.svg',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'BRL', 'JPY', 'AUD', 'CAD', 'MXN', 'CNY'],
    supportedRegions: ['Global'],
    fees: {
      percentage: 3.4,
      fixed: 0.30,
      currency: 'USD'
    },
    processingTime: 'Instant',
    features: [
      'Conta PayPal',
      'Cartões vinculados',
      'PayPal Credit',
      'Proteção ao comprador',
      'Aceito globalmente'
    ]
  },
  
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    logo: '/payment-logos/mercadopago.svg',
    supportedCurrencies: ['BRL', 'ARS', 'MXN'],
    supportedRegions: ['BR', 'AR', 'MX', 'CL', 'CO', 'PE', 'UY'],
    fees: {
      percentage: 4.99,
      fixed: 0,
      currency: 'BRL'
    },
    processingTime: 'Instant',
    features: [
      'PIX (Brasil)',
      'Boleto Bancário',
      'Cartões de crédito',
      'Parcelamento',
      'Saldo Mercado Pago'
    ]
  },
  
  {
    id: 'alipay',
    name: 'Alipay',
    logo: '/payment-logos/alipay.svg',
    supportedCurrencies: ['CNY', 'USD', 'EUR'],
    supportedRegions: ['CN', 'HK', 'TW', 'Global'],
    fees: {
      percentage: 2.0,
      fixed: 0,
      currency: 'CNY'
    },
    processingTime: 'Instant',
    features: [
      'Carteira digital',
      'QR Code',
      'Integração com Taobao/Tmall',
      'Popular na China',
      'Suporte internacional'
    ]
  },
  
  {
    id: 'wechatpay',
    name: 'WeChat Pay',
    logo: '/payment-logos/wechat.svg',
    supportedCurrencies: ['CNY', 'USD', 'EUR'],
    supportedRegions: ['CN', 'Global'],
    fees: {
      percentage: 2.0,
      fixed: 0,
      currency: 'CNY'
    },
    processingTime: 'Instant',
    features: [
      'Integrado ao WeChat',
      'QR Code',
      'Transferências P2P',
      'Amplamente usado na China',
      'Mini Programs'
    ]
  },
  
  {
    id: 'paypay',
    name: 'PayPay',
    logo: '/payment-logos/paypay.svg',
    supportedCurrencies: ['JPY'],
    supportedRegions: ['JP'],
    fees: {
      percentage: 1.98,
      fixed: 0,
      currency: 'JPY'
    },
    processingTime: 'Instant',
    features: [
      'Carteira digital',
      'QR Code',
      'Cashback',
      'Popular no Japão',
      'Integração com lojas físicas'
    ]
  },
  
  {
    id: 'kakaopay',
    name: 'Kakao Pay',
    logo: '/payment-logos/kakaopay.svg',
    supportedCurrencies: ['KRW'],
    supportedRegions: ['KR'],
    fees: {
      percentage: 2.5,
      fixed: 0,
      currency: 'KRW'
    },
    processingTime: 'Instant',
    features: [
      'Integrado ao KakaoTalk',
      'Carteira digital',
      'Transferências instantâneas',
      'Amplamente usado na Coreia',
      'Pagamentos por QR Code'
    ]
  }
];

// 🔒 Sistema de Escrow Internacional
export interface EscrowConfig {
  holdPeriod: number; // dias
  releaseConditions: string[];
  disputeWindow: number; // dias
  autoReleaseEnabled: boolean;
}

export const ESCROW_CONFIG: EscrowConfig = {
  holdPeriod: 7, // Pagamento retido por 7 dias
  releaseConditions: [
    'Comprador confirma recebimento',
    'Vendedor confirma entrega',
    'Período de disputa expirou sem reclamações',
    'Administrador aprova liberação manual'
  ],
  disputeWindow: 14, // Comprador tem 14 dias para abrir disputa
  autoReleaseEnabled: true // Libera automaticamente após período sem disputas
};

// 💰 Taxas da Plataforma por Região
export interface PlatformFees {
  region: string;
  commissionRate: number; // porcentagem
  withdrawalFee: number;
  minWithdrawal: number;
  currency: SupportedCurrency;
}

export const PLATFORM_FEES_BY_REGION: PlatformFees[] = [
  {
    region: 'Global',
    commissionRate: 5.0,
    withdrawalFee: 2.00,
    minWithdrawal: 10.00,
    currency: 'USD'
  },
  {
    region: 'BR',
    commissionRate: 5.0,
    withdrawalFee: 5.00,
    minWithdrawal: 50.00,
    currency: 'BRL'
  },
  {
    region: 'EU',
    commissionRate: 5.0,
    withdrawalFee: 2.00,
    minWithdrawal: 10.00,
    currency: 'EUR'
  },
  {
    region: 'JP',
    commissionRate: 5.0,
    withdrawalFee: 200,
    minWithdrawal: 1000,
    currency: 'JPY'
  },
  {
    region: 'KR',
    commissionRate: 5.0,
    withdrawalFee: 2000,
    minWithdrawal: 10000,
    currency: 'KRW'
  }
];

// 🌐 Detecção de Gateway Recomendado
export function getRecommendedGateway(
  userRegion: string,
  currency: SupportedCurrency
): PaymentGateway | undefined {
  // Prioriza gateways regionais
  const regionalGateway = PAYMENT_GATEWAYS.find(
    gateway => 
      gateway.supportedRegions.includes(userRegion) &&
      gateway.supportedCurrencies.includes(currency)
  );
  
  if (regionalGateway) return regionalGateway;
  
  // Fallback para gateway global
  return PAYMENT_GATEWAYS.find(
    gateway => 
      gateway.supportedRegions.includes('Global') &&
      gateway.supportedCurrencies.includes(currency)
  );
}

// 💸 Cálculo de Taxas
export function calculateFees(
  amount: number,
  gateway: PaymentGateway,
  platformCommission: number = 5.0
): {
  subtotal: number;
  gatewayFee: number;
  platformFee: number;
  total: number;
  sellerReceives: number;
} {
  const gatewayFee = (amount * gateway.fees.percentage / 100) + gateway.fees.fixed;
  const platformFee = amount * platformCommission / 100;
  const total = amount + gatewayFee;
  const sellerReceives = amount - platformFee;
  
  return {
    subtotal: amount,
    gatewayFee,
    platformFee,
    total,
    sellerReceives
  };
}

// 🔄 Status de Transação
export type TransactionStatus = 
  | 'pending'
  | 'processing'
  | 'held_escrow'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'disputed';

export interface TransactionStatusInfo {
  status: TransactionStatus;
  label: string;
  description: string;
  color: string;
}

export const TRANSACTION_STATUSES: TransactionStatusInfo[] = [
  {
    status: 'pending',
    label: 'Pendente',
    description: 'Aguardando processamento do pagamento',
    color: 'bg-yellow-500'
  },
  {
    status: 'processing',
    label: 'Processando',
    description: 'Pagamento sendo processado pelo gateway',
    color: 'bg-blue-500'
  },
  {
    status: 'held_escrow',
    label: 'Retido (Escrow)',
    description: 'Pagamento retido com segurança até confirmação',
    color: 'bg-purple-500'
  },
  {
    status: 'completed',
    label: 'Concluído',
    description: 'Transação concluída com sucesso',
    color: 'bg-green-500'
  },
  {
    status: 'failed',
    label: 'Falhou',
    description: 'Pagamento não foi aprovado',
    color: 'bg-red-500'
  },
  {
    status: 'refunded',
    label: 'Reembolsado',
    description: 'Valor devolvido ao comprador',
    color: 'bg-orange-500'
  },
  {
    status: 'disputed',
    label: 'Em Disputa',
    description: 'Transação contestada, aguardando resolução',
    color: 'bg-red-600'
  }
];

// 🛡️ Proteção contra Fraude
export interface FraudCheck {
  ipAddress: string;
  country: string;
  vpnDetected: boolean;
  riskScore: number; // 0-100
  recommendation: 'approve' | 'review' | 'reject';
}

export function assessFraudRisk(
  transaction: {
    amount: number;
    buyerHistory: number; // número de transações anteriores
    sellerRating: number;
    ipCountry: string;
    accountAge: number; // dias
  }
): FraudCheck {
  let riskScore = 0;
  
  // Transação de alto valor
  if (transaction.amount > 500) riskScore += 20;
  
  // Comprador novo
  if (transaction.buyerHistory === 0) riskScore += 30;
  
  // Vendedor com baixa reputação
  if (transaction.sellerRating < 3.0) riskScore += 25;
  
  // Conta muito nova
  if (transaction.accountAge < 7) riskScore += 15;
  
  let recommendation: 'approve' | 'review' | 'reject';
  if (riskScore < 30) recommendation = 'approve';
  else if (riskScore < 60) recommendation = 'review';
  else recommendation = 'reject';
  
  return {
    ipAddress: '0.0.0.0', // Placeholder
    country: transaction.ipCountry,
    vpnDetected: false,
    riskScore,
    recommendation
  };
}
