// Constants para o GameMarket

export const GAMES = [
  'League of Legends',
  'Valorant',
  'CS:GO',
  'Dota 2',
  'World of Warcraft',
  'Final Fantasy XIV',
  'Genshin Impact',
  'Fortnite',
  'Apex Legends',
  'Overwatch 2',
  'Rocket League',
  'FIFA 24',
  'Call of Duty',
  'Minecraft',
  'Roblox',
  'Lost Ark',
  'New World',
  'Diablo IV',
  'Path of Exile',
  'Runescape',
  'Albion Online',
  'Black Desert Online',
  'Guild Wars 2',
  'Elder Scrolls Online',
  'Destiny 2',
  'Warframe',
  'Star Citizen',
  'Eve Online',
  'Escape from Tarkov',
  'Rainbow Six Siege',
  'PUBG',
  'Mobile Legends',
  'Free Fire',
  'Clash of Clans',
  'Clash Royale',
  'Brawl Stars',
  'Pokemon GO',
  'Honkai Star Rail',
  'Tower of Fantasy',
  'Lineage 2',
  'Outros'
] as const;

export const CATEGORIES = [
  { value: 'game-currency', label: 'Moedas de Jogos', icon: 'Coins' },
  { value: 'virtual-items', label: 'Itens Virtuais', icon: 'Package' },
  { value: 'game-accounts', label: 'Contas de Jogos', icon: 'User' },
  { value: 'boosting', label: 'Boosting / Carry', icon: 'TrendingUp' },
  { value: 'coaching', label: 'Coaching', icon: 'GraduationCap' },
  { value: 'top-ups', label: 'Top-ups / Recargas', icon: 'Zap' },
  { value: 'gift-cards', label: 'Gift Cards', icon: 'Gift' },
  { value: 'licenses', label: 'Licenças Digitais', icon: 'Key' },
  { value: 'other-services', label: 'Outros Serviços', icon: 'MoreHorizontal' }
] as const;

export const REGIONS = [
  'América do Norte',
  'América do Sul',
  'Europa',
  'Ásia',
  'Oceania',
  'Global',
  'Brasil',
  'EUA',
  'Europa Ocidental',
  'Europa Oriental',
  'Ásia-Pacífico',
  'Oriente Médio',
  'África'
] as const;

export const SELLER_TIERS = [
  { value: 'bronze', label: 'Bronze', color: 'from-amber-600 to-amber-800', minSales: 0 },
  { value: 'silver', label: 'Prata', color: 'from-gray-400 to-gray-600', minSales: 50 },
  { value: 'gold', label: 'Ouro', color: 'from-yellow-400 to-yellow-600', minSales: 200 },
  { value: 'platinum', label: 'Platina', color: 'from-cyan-400 to-blue-600', minSales: 500 }
] as const;

export const ORDER_STATUSES = [
  { value: 'pending_payment', label: 'Aguardando Pagamento', color: 'bg-yellow-500' },
  { value: 'paid', label: 'Pago', color: 'bg-blue-500' },
  { value: 'in_progress', label: 'Em Andamento', color: 'bg-purple-500' },
  { value: 'delivered', label: 'Entregue', color: 'bg-green-500' },
  { value: 'completed', label: 'Concluído', color: 'bg-emerald-600' },
  { value: 'disputed', label: 'Em Disputa', color: 'bg-red-500' },
  { value: 'cancelled', label: 'Cancelado', color: 'bg-gray-500' },
  { value: 'refunded', label: 'Reembolsado', color: 'bg-orange-500' }
] as const;

// 🔒 SISTEMA DE SEGURANÇA - Status de Produtos/Contas
export const PRODUCT_STATUSES = [
  { 
    value: 'active', 
    label: 'Disponível', 
    color: 'bg-green-500',
    description: 'Produto disponível para venda',
    icon: 'CheckCircle'
  },
  { 
    value: 'paused', 
    label: 'Pausado', 
    color: 'bg-gray-500',
    description: 'Pausado pelo vendedor',
    icon: 'Pause'
  },
  { 
    value: 'in_transfer_security', 
    label: '🔒 Em Transferência (Segurança)', 
    color: 'bg-orange-600',
    description: 'Conta bloqueada preventivamente - aguardando confirmação de transferência',
    icon: 'Lock',
    adminOnly: true
  },
  { 
    value: 'transferred_confirmed', 
    label: '✅ Transferido', 
    color: 'bg-emerald-600',
    description: 'Transferência confirmada pelo administrador',
    icon: 'CheckCircle2',
    adminOnly: true
  },
  { 
    value: 'blocked_security', 
    label: '🚫 Bloqueado', 
    color: 'bg-red-600',
    description: 'Bloqueado por segurança',
    icon: 'ShieldAlert',
    adminOnly: true
  },
  { 
    value: 'cancelled', 
    label: 'Cancelado', 
    color: 'bg-gray-600',
    description: 'Venda cancelada',
    icon: 'XCircle'
  },
  { 
    value: 'removed', 
    label: 'Removido', 
    color: 'bg-gray-700',
    description: 'Produto removido',
    icon: 'Trash2'
  }
] as const;

// 🔒 Status de liberação de pagamento
export const PAYMENT_RELEASE_STATUSES = [
  { 
    value: 'held', 
    label: '💰 Retido', 
    color: 'bg-yellow-600',
    description: 'Pagamento retido em escrow',
    icon: 'Lock'
  },
  { 
    value: 'pending_verification', 
    label: '🔍 Em Verificação', 
    color: 'bg-blue-600',
    description: 'Aguardando verificação do administrador',
    icon: 'Search'
  },
  { 
    value: 'approved_for_release', 
    label: '✅ Aprovado', 
    color: 'bg-green-600',
    description: 'Aprovado para liberação',
    icon: 'CheckCircle'
  },
  { 
    value: 'released', 
    label: '💸 Liberado', 
    color: 'bg-emerald-600',
    description: 'Pagamento liberado ao vendedor',
    icon: 'DollarSign'
  },
  { 
    value: 'refunded', 
    label: '🔄 Reembolsado', 
    color: 'bg-orange-600',
    description: 'Reembolsado ao comprador',
    icon: 'RotateCcw'
  }
] as const;

export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Cartão de Crédito', icon: 'CreditCard' },
  { value: 'paypal', label: 'PayPal', icon: 'Wallet' },
  { value: 'stripe', label: 'Stripe', icon: 'Zap' },
  { value: 'balance', label: 'Saldo da Conta', icon: 'DollarSign' }
] as const;

export const PLATFORM_CONFIG = {
  defaultCommissionRate: 5, // 5%
  defaultWithdrawalFee: 2, // $2
  minWithdrawal: 10, // $10
  featuredListingPrice: 5, // $5
  currency: 'USD',
  currencySymbol: '$'
} as const;

// 🔒 TEXTOS LEGAIS DE SEGURANÇA
export const SECURITY_LEGAL_TEXTS = {
  accountTransferWarning: `⚖️ AVISO LEGAL: A marcação de uma conta como "vendida" ou "em transferência" é uma medida preventiva de segurança e não implica conclusão de venda ou liberação de pagamento, que dependem exclusivamente de validação manual da administração.`,
  
  paymentReleaseWarning: `💰 IMPORTANTE: O pagamento permanece retido em escrow até que o administrador confirme a transferência completa e segura da conta. A liberação do pagamento é uma ação manual e independente do status da conta.`,
  
  buyerProtection: `🛡️ PROTEÇÃO AO COMPRADOR: Seu pagamento fica retido com segurança até que a transferência seja confirmada. Em caso de problemas, você pode abrir uma disputa.`,
  
  sellerGuidelines: `📋 DIRETRIZES PARA VENDEDORES: Após a venda, transfira a conta imediatamente ao comprador. O pagamento será liberado apenas após validação do administrador.`
} as const;

// 🔒 Ações de segurança disponíveis para Admin
export const ADMIN_SECURITY_ACTIONS = [
  {
    value: 'mark_in_transfer',
    label: '🔒 Marcar em Transferência',
    description: 'Bloqueia a conta preventivamente durante processo de venda',
    requiresReason: true,
    color: 'bg-orange-600'
  },
  {
    value: 'confirm_transfer',
    label: '✅ Confirmar Transferência',
    description: 'Confirma que a conta foi transferida com sucesso',
    requiresReason: true,
    color: 'bg-green-600'
  },
  {
    value: 'block_account',
    label: '🚫 Bloquear Conta',
    description: 'Bloqueia a conta por motivos de segurança',
    requiresReason: true,
    color: 'bg-red-600'
  },
  {
    value: 'release_payment',
    label: '💸 Liberar Pagamento',
    description: 'Libera o pagamento ao vendedor (ação independente)',
    requiresReason: true,
    color: 'bg-emerald-600'
  },
  {
    value: 'refund_payment',
    label: '🔄 Reembolsar',
    description: 'Reembolsa o pagamento ao comprador',
    requiresReason: true,
    color: 'bg-orange-600'
  }
] as const;
