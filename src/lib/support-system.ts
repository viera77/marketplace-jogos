// 🌐 Sistema de Suporte Multi-Idioma e Multi-Região

import { SupportedLanguage } from './i18n';

export interface SupportChannel {
  id: string;
  name: string;
  icon: string;
  availability: string;
  responseTime: string;
  languages: SupportedLanguage[];
}

export const SUPPORT_CHANNELS: SupportChannel[] = [
  {
    id: 'live-chat',
    name: 'Chat ao Vivo',
    icon: 'MessageCircle',
    availability: '24/7',
    responseTime: '< 2 minutos',
    languages: ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE']
  },
  {
    id: 'email',
    name: 'Email',
    icon: 'Mail',
    availability: '24/7',
    responseTime: '< 24 horas',
    languages: ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'ja-JP', 'ko-KR', 'zh-CN', 'ru-RU', 'ar-SA']
  },
  {
    id: 'ticket',
    name: 'Sistema de Tickets',
    icon: 'Ticket',
    availability: '24/7',
    responseTime: '< 12 horas',
    languages: ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'ja-JP', 'ko-KR', 'zh-CN', 'ru-RU']
  },
  {
    id: 'phone',
    name: 'Telefone',
    icon: 'Phone',
    availability: 'Horário comercial',
    responseTime: 'Imediato',
    languages: ['pt-BR', 'en-US', 'es-ES']
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'MessageSquare',
    availability: '24/7',
    responseTime: '< 5 minutos',
    languages: ['pt-BR', 'en-US', 'es-ES']
  }
];

// 📞 Números de Suporte por Região
export interface SupportContact {
  region: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  timezone: string;
}

export const SUPPORT_CONTACTS: SupportContact[] = [
  {
    region: 'Brazil',
    phone: '+55 11 4000-0000',
    whatsapp: '+55 11 99999-9999',
    email: 'suporte@gamemarket.com.br',
    hours: '9:00 - 21:00',
    timezone: 'BRT (UTC-3)'
  },
  {
    region: 'United States',
    phone: '+1 (800) 123-4567',
    whatsapp: '+1 (555) 123-4567',
    email: 'support@gamemarket.com',
    hours: '9:00 - 21:00',
    timezone: 'EST (UTC-5)'
  },
  {
    region: 'Europe',
    phone: '+44 20 1234 5678',
    whatsapp: '+44 7700 900000',
    email: 'support@gamemarket.eu',
    hours: '9:00 - 18:00',
    timezone: 'CET (UTC+1)'
  },
  {
    region: 'Asia',
    phone: '+81 3-1234-5678',
    whatsapp: '+81 90-1234-5678',
    email: 'support@gamemarket.jp',
    hours: '9:00 - 18:00',
    timezone: 'JST (UTC+9)'
  }
];

// 📚 Central de Ajuda Multi-Idioma
export interface HelpCategory {
  id: string;
  icon: string;
  title: Record<SupportedLanguage, string>;
  articles: number;
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: 'getting-started',
    icon: 'Rocket',
    title: {
      'pt-BR': 'Começando',
      'en-US': 'Getting Started',
      'es-ES': 'Comenzando',
      'fr-FR': 'Commencer',
      'de-DE': 'Erste Schritte',
      'it-IT': 'Iniziare',
      'ja-JP': 'はじめに',
      'ko-KR': '시작하기',
      'zh-CN': '入门',
      'ru-RU': 'Начало работы',
      'ar-SA': 'البدء'
    },
    articles: 12
  },
  {
    id: 'buying',
    icon: 'ShoppingCart',
    title: {
      'pt-BR': 'Comprando',
      'en-US': 'Buying',
      'es-ES': 'Comprando',
      'fr-FR': 'Acheter',
      'de-DE': 'Kaufen',
      'it-IT': 'Acquistare',
      'ja-JP': '購入',
      'ko-KR': '구매',
      'zh-CN': '购买',
      'ru-RU': 'Покупка',
      'ar-SA': 'الشراء'
    },
    articles: 18
  },
  {
    id: 'selling',
    icon: 'DollarSign',
    title: {
      'pt-BR': 'Vendendo',
      'en-US': 'Selling',
      'es-ES': 'Vendiendo',
      'fr-FR': 'Vendre',
      'de-DE': 'Verkaufen',
      'it-IT': 'Vendere',
      'ja-JP': '販売',
      'ko-KR': '판매',
      'zh-CN': '销售',
      'ru-RU': 'Продажа',
      'ar-SA': 'البيع'
    },
    articles: 24
  },
  {
    id: 'payments',
    icon: 'CreditCard',
    title: {
      'pt-BR': 'Pagamentos',
      'en-US': 'Payments',
      'es-ES': 'Pagos',
      'fr-FR': 'Paiements',
      'de-DE': 'Zahlungen',
      'it-IT': 'Pagamenti',
      'ja-JP': '支払い',
      'ko-KR': '결제',
      'zh-CN': '支付',
      'ru-RU': 'Платежи',
      'ar-SA': 'المدفوعات'
    },
    articles: 15
  },
  {
    id: 'security',
    icon: 'Shield',
    title: {
      'pt-BR': 'Segurança',
      'en-US': 'Security',
      'es-ES': 'Seguridad',
      'fr-FR': 'Sécurité',
      'de-DE': 'Sicherheit',
      'it-IT': 'Sicurezza',
      'ja-JP': 'セキュリティ',
      'ko-KR': '보안',
      'zh-CN': '安全',
      'ru-RU': 'Безопасность',
      'ar-SA': 'الأمان'
    },
    articles: 10
  },
  {
    id: 'disputes',
    icon: 'AlertTriangle',
    title: {
      'pt-BR': 'Disputas',
      'en-US': 'Disputes',
      'es-ES': 'Disputas',
      'fr-FR': 'Litiges',
      'de-DE': 'Streitigkeiten',
      'it-IT': 'Controversie',
      'ja-JP': '紛争',
      'ko-KR': '분쟁',
      'zh-CN': '争议',
      'ru-RU': 'Споры',
      'ar-SA': 'النزاعات'
    },
    articles: 8
  }
];

// 🤖 Chatbot Multi-Idioma
export interface ChatbotResponse {
  intent: string;
  confidence: number;
  response: Record<SupportedLanguage, string>;
  suggestedActions?: string[];
}

export const COMMON_CHATBOT_RESPONSES: ChatbotResponse[] = [
  {
    intent: 'greeting',
    confidence: 0.95,
    response: {
      'pt-BR': 'Olá! Como posso ajudar você hoje?',
      'en-US': 'Hello! How can I help you today?',
      'es-ES': '¡Hola! ¿Cómo puedo ayudarte hoy?',
      'fr-FR': 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
      'de-DE': 'Hallo! Wie kann ich Ihnen heute helfen?',
      'it-IT': 'Ciao! Come posso aiutarti oggi?',
      'ja-JP': 'こんにちは！今日はどのようにお手伝いできますか？',
      'ko-KR': '안녕하세요! 오늘 어떻게 도와드릴까요?',
      'zh-CN': '你好！今天我能帮你什么？',
      'ru-RU': 'Здравствуйте! Чем я могу вам помочь сегодня?',
      'ar-SA': 'مرحبا! كيف يمكنني مساعدتك اليوم؟'
    },
    suggestedActions: ['Ver produtos', 'Criar conta', 'Falar com atendente']
  },
  {
    intent: 'how_to_buy',
    confidence: 0.90,
    response: {
      'pt-BR': 'Para comprar: 1) Busque o produto desejado 2) Clique em "Comprar" 3) Escolha método de pagamento 4) Aguarde a entrega. Seu pagamento fica protegido em escrow!',
      'en-US': 'To buy: 1) Search for the desired product 2) Click "Buy" 3) Choose payment method 4) Wait for delivery. Your payment is protected in escrow!',
      'es-ES': 'Para comprar: 1) Busca el producto deseado 2) Haz clic en "Comprar" 3) Elige método de pago 4) Espera la entrega. ¡Tu pago está protegido en depósito!',
      'fr-FR': 'Pour acheter: 1) Recherchez le produit souhaité 2) Cliquez sur "Acheter" 3) Choisissez le mode de paiement 4) Attendez la livraison. Votre paiement est protégé en dépôt!',
      'de-DE': 'Zum Kaufen: 1) Suchen Sie das gewünschte Produkt 2) Klicken Sie auf "Kaufen" 3) Wählen Sie die Zahlungsmethode 4) Warten Sie auf die Lieferung. Ihre Zahlung ist im Treuhand geschützt!',
      'it-IT': 'Per acquistare: 1) Cerca il prodotto desiderato 2) Clicca su "Acquista" 3) Scegli il metodo di pagamento 4) Attendi la consegna. Il tuo pagamento è protetto in deposito!',
      'ja-JP': '購入方法：1）希望の商品を検索 2）「購入」をクリック 3）支払い方法を選択 4）配送を待つ。お支払いはエスクローで保護されています！',
      'ko-KR': '구매 방법: 1) 원하는 제품 검색 2) "구매" 클릭 3) 결제 방법 선택 4) 배송 대기. 결제는 에스크로로 보호됩니다!',
      'zh-CN': '购买方法：1）搜索所需产品 2）点击"购买" 3）选择付款方式 4）等待交付。您的付款受托管保护！',
      'ru-RU': 'Чтобы купить: 1) Найдите нужный товар 2) Нажмите "Купить" 3) Выберите способ оплаты 4) Дождитесь доставки. Ваш платеж защищен эскроу!',
      'ar-SA': 'للشراء: 1) ابحث عن المنتج المطلوب 2) انقر على "شراء" 3) اختر طريقة الدفع 4) انتظر التسليم. دفعتك محمية في الضمان!'
    },
    suggestedActions: ['Ver tutorial completo', 'Buscar produtos', 'Falar com atendente']
  }
];

// 📊 Métricas de Satisfação
export interface SupportMetrics {
  metric: string;
  target: number;
  current: number;
  unit: string;
}

export const SUPPORT_METRICS: SupportMetrics[] = [
  {
    metric: 'Tempo de Resposta Médio',
    target: 5,
    current: 3.2,
    unit: 'minutos'
  },
  {
    metric: 'Taxa de Resolução no Primeiro Contato',
    target: 80,
    current: 87,
    unit: '%'
  },
  {
    metric: 'Satisfação do Cliente',
    target: 4.5,
    current: 4.7,
    unit: '/5'
  },
  {
    metric: 'Tickets Resolvidos em 24h',
    target: 90,
    current: 94,
    unit: '%'
  }
];

// 🌍 Horários de Atendimento por Região
export interface SupportHours {
  region: string;
  timezone: string;
  weekdays: string;
  weekends: string;
  holidays: string;
}

export const SUPPORT_HOURS: SupportHours[] = [
  {
    region: 'Americas',
    timezone: 'EST (UTC-5)',
    weekdays: '9:00 - 21:00',
    weekends: '10:00 - 18:00',
    holidays: '10:00 - 16:00'
  },
  {
    region: 'Europe',
    timezone: 'CET (UTC+1)',
    weekdays: '9:00 - 18:00',
    weekends: '10:00 - 16:00',
    holidays: 'Fechado'
  },
  {
    region: 'Asia',
    timezone: 'JST (UTC+9)',
    weekdays: '9:00 - 18:00',
    weekends: '10:00 - 16:00',
    holidays: 'Fechado'
  },
  {
    region: 'Oceania',
    timezone: 'AEST (UTC+10)',
    weekdays: '9:00 - 17:00',
    weekends: 'Fechado',
    holidays: 'Fechado'
  }
];

// 🎓 Programa de Treinamento para Suporte
export const SUPPORT_TRAINING = {
  languages: ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE'],
  topics: [
    'Atendimento ao cliente',
    'Resolução de conflitos',
    'Conhecimento de produtos',
    'Sistemas de pagamento',
    'Políticas da plataforma',
    'Segurança e fraude',
    'Comunicação intercultural'
  ],
  certifications: [
    'Customer Service Excellence',
    'Dispute Resolution Specialist',
    'Payment Systems Expert',
    'Security Awareness'
  ]
};
