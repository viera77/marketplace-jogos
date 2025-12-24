// 🌍 Configurações de Conformidade Legal Internacional

export interface LegalCompliance {
  region: string;
  dataProtectionLaw: string;
  requirements: string[];
  cookieConsent: boolean;
  ageVerification: boolean;
  taxCompliance: string[];
}

// 📋 Conformidade por região
export const LEGAL_COMPLIANCE: Record<string, LegalCompliance> = {
  'EU': {
    region: 'European Union',
    dataProtectionLaw: 'GDPR (General Data Protection Regulation)',
    requirements: [
      'Consentimento explícito para coleta de dados',
      'Direito ao esquecimento (apagar dados)',
      'Portabilidade de dados',
      'Notificação de violação de dados em 72h',
      'DPO (Data Protection Officer) se necessário',
      'Privacy by Design'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['VAT (Value Added Tax)', 'Digital Services Tax']
  },
  
  'BR': {
    region: 'Brazil',
    dataProtectionLaw: 'LGPD (Lei Geral de Proteção de Dados)',
    requirements: [
      'Consentimento para tratamento de dados',
      'Direito de acesso aos dados',
      'Direito de correção de dados',
      'Direito de eliminação de dados',
      'Encarregado de dados (DPO)',
      'Relatório de impacto à privacidade'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['ISS (Imposto sobre Serviços)', 'PIS/COFINS']
  },
  
  'US': {
    region: 'United States',
    dataProtectionLaw: 'CCPA (California Consumer Privacy Act) / State Laws',
    requirements: [
      'Aviso de coleta de dados',
      'Direito de opt-out de venda de dados',
      'Direito de acesso aos dados',
      'Direito de exclusão de dados',
      'Não discriminação por exercer direitos'
    ],
    cookieConsent: false, // Não obrigatório federalmente
    ageVerification: true, // COPPA para menores de 13 anos
    taxCompliance: ['Sales Tax (varia por estado)', 'Income Tax']
  },
  
  'UK': {
    region: 'United Kingdom',
    dataProtectionLaw: 'UK GDPR + Data Protection Act 2018',
    requirements: [
      'Consentimento para processamento de dados',
      'Direito de acesso aos dados',
      'Direito ao esquecimento',
      'Portabilidade de dados',
      'Notificação de violação de dados',
      'ICO (Information Commissioner\'s Office) compliance'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['VAT', 'Digital Services Tax']
  },
  
  'CN': {
    region: 'China',
    dataProtectionLaw: 'PIPL (Personal Information Protection Law)',
    requirements: [
      'Consentimento para coleta de dados',
      'Localização de dados na China',
      'Avaliação de segurança para transferências internacionais',
      'Nomeação de representante local',
      'Conformidade com Cybersecurity Law'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['VAT', 'Corporate Income Tax']
  },
  
  'JP': {
    region: 'Japan',
    dataProtectionLaw: 'APPI (Act on the Protection of Personal Information)',
    requirements: [
      'Notificação de propósito de uso',
      'Consentimento para uso de dados sensíveis',
      'Medidas de segurança apropriadas',
      'Restrições para transferências internacionais',
      'Registro com PPC (Personal Information Protection Commission)'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['Consumption Tax', 'Corporate Tax']
  },
  
  'AU': {
    region: 'Australia',
    dataProtectionLaw: 'Privacy Act 1988 + Australian Privacy Principles',
    requirements: [
      'Política de privacidade clara',
      'Consentimento para coleta de dados sensíveis',
      'Direito de acesso e correção',
      'Notificação de violação de dados',
      'Conformidade com OAIC (Office of the Australian Information Commissioner)'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['GST (Goods and Services Tax)']
  },
  
  'CA': {
    region: 'Canada',
    dataProtectionLaw: 'PIPEDA (Personal Information Protection and Electronic Documents Act)',
    requirements: [
      'Consentimento para coleta de dados',
      'Limitação de uso de dados',
      'Direito de acesso aos dados',
      'Medidas de segurança apropriadas',
      'Notificação de violação de dados'
    ],
    cookieConsent: true,
    ageVerification: true,
    taxCompliance: ['GST/HST', 'Provincial Sales Tax']
  }
};

// 🍪 Configurações de Cookies
export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Cookies Necessários',
    description: 'Essenciais para o funcionamento do site. Não podem ser desativados.',
    required: true
  },
  {
    id: 'functional',
    name: 'Cookies Funcionais',
    description: 'Permitem funcionalidades aprimoradas e personalização (idioma, moeda).',
    required: false
  },
  {
    id: 'analytics',
    name: 'Cookies de Análise',
    description: 'Ajudam a entender como os visitantes interagem com o site.',
    required: false
  },
  {
    id: 'marketing',
    name: 'Cookies de Marketing',
    description: 'Usados para rastrear visitantes e exibir anúncios relevantes.',
    required: false
  }
];

// 📄 Templates de Documentos Legais
export const LEGAL_DOCUMENTS = {
  termsOfService: {
    sections: [
      'Aceitação dos Termos',
      'Descrição do Serviço',
      'Registro e Conta',
      'Compra e Venda',
      'Sistema de Escrow',
      'Taxas e Comissões',
      'Disputas e Reembolsos',
      'Propriedade Intelectual',
      'Limitação de Responsabilidade',
      'Modificações dos Termos',
      'Lei Aplicável e Jurisdição'
    ]
  },
  
  privacyPolicy: {
    sections: [
      'Informações que Coletamos',
      'Como Usamos suas Informações',
      'Compartilhamento de Dados',
      'Segurança de Dados',
      'Seus Direitos',
      'Cookies e Tecnologias Similares',
      'Transferências Internacionais',
      'Retenção de Dados',
      'Menores de Idade',
      'Alterações na Política',
      'Contato'
    ]
  },
  
  riskNotice: {
    warnings: [
      'Compra e venda de contas pode violar termos de serviço dos jogos',
      'Risco de banimento de conta pelo desenvolvedor do jogo',
      'Transações digitais são irreversíveis',
      'Verifique sempre a reputação do vendedor',
      'Use apenas métodos de pagamento seguros',
      'Não compartilhe informações sensíveis fora da plataforma'
    ]
  }
};

// 🔒 Requisitos de Verificação de Idade
export const AGE_REQUIREMENTS = {
  minimum: 18, // Idade mínima padrão
  byRegion: {
    'US': 13, // Com consentimento parental (COPPA)
    'EU': 16, // GDPR
    'BR': 18, // LGPD
    'UK': 13, // Com consentimento parental
    'JP': 20, // Maioridade no Japão
    'KR': 19  // Maioridade na Coreia do Sul
  }
};

// 💳 Métodos de Pagamento por Região
export const PAYMENT_METHODS_BY_REGION: Record<string, string[]> = {
  'Global': ['Credit Card', 'PayPal', 'Stripe'],
  'BR': ['Credit Card', 'PIX', 'Boleto', 'PayPal'],
  'EU': ['Credit Card', 'SEPA', 'PayPal', 'Klarna'],
  'US': ['Credit Card', 'PayPal', 'Venmo', 'Cash App'],
  'CN': ['Alipay', 'WeChat Pay', 'UnionPay'],
  'JP': ['Credit Card', 'Konbini', 'PayPay', 'Line Pay'],
  'KR': ['Credit Card', 'KakaoPay', 'Naver Pay', 'Toss'],
  'IN': ['Credit Card', 'UPI', 'Paytm', 'PhonePe']
};

// 🌐 Suporte ao Cliente por Região
export const CUSTOMER_SUPPORT_HOURS: Record<string, string> = {
  'Americas': '9:00 - 21:00 EST',
  'Europe': '9:00 - 18:00 CET',
  'Asia': '9:00 - 18:00 JST',
  'Oceania': '9:00 - 17:00 AEST'
};

// 📧 Contatos de Conformidade
export const COMPLIANCE_CONTACTS = {
  dpo: 'dpo@gamemarket.com', // Data Protection Officer
  legal: 'legal@gamemarket.com',
  support: 'support@gamemarket.com',
  abuse: 'abuse@gamemarket.com'
};
