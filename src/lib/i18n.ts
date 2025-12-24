// 🌍 Sistema de Internacionalização (i18n)

export type SupportedLanguage = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'zh-CN' | 'ru-RU' | 'ar-SA';

export type SupportedCurrency = 'BRL' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'KRW' | 'CNY' | 'RUB' | 'ARS' | 'MXN' | 'AUD' | 'CAD';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  decimals: number;
  position: 'before' | 'after';
}

// 🌐 Idiomas suportados
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'pt-BR', name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'en-US', name: 'English (US)', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar-SA', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true }
];

// 💰 Moedas suportadas
export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2, position: 'before' },
  { code: 'EUR', symbol: '€', name: 'Euro', decimals: 2, position: 'before' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', decimals: 2, position: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound', decimals: 2, position: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimals: 0, position: 'before' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won', decimals: 0, position: 'before' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', decimals: 2, position: 'before' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', decimals: 2, position: 'after' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso', decimals: 2, position: 'before' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', decimals: 2, position: 'before' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', decimals: 2, position: 'before' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', decimals: 2, position: 'before' }
];

// 🌍 Taxas de conversão (exemplo - em produção, usar API de câmbio em tempo real)
export const EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  USD: 1.00,
  EUR: 0.92,
  BRL: 4.95,
  GBP: 0.79,
  JPY: 149.50,
  KRW: 1320.00,
  CNY: 7.24,
  RUB: 92.50,
  ARS: 350.00,
  MXN: 17.20,
  AUD: 1.52,
  CAD: 1.36
};

// 🔧 Funções utilitárias
export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  const config = SUPPORTED_CURRENCIES.find(c => c.code === currency);
  if (!config) return `${amount}`;

  const formatted = amount.toFixed(config.decimals);
  
  if (config.position === 'before') {
    return `${config.symbol}${formatted}`;
  } else {
    return `${formatted} ${config.symbol}`;
  }
}

export function convertCurrency(amount: number, from: SupportedCurrency, to: SupportedCurrency): number {
  const fromRate = EXCHANGE_RATES[from];
  const toRate = EXCHANGE_RATES[to];
  
  // Converte para USD primeiro, depois para moeda de destino
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

export function formatPrice(amount: number, fromCurrency: SupportedCurrency, toCurrency: SupportedCurrency): string {
  const converted = convertCurrency(amount, fromCurrency, toCurrency);
  return formatCurrency(converted, toCurrency);
}

export function getLanguageByCode(code: SupportedLanguage): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

export function getCurrencyByCode(code: SupportedCurrency): CurrencyConfig | undefined {
  return SUPPORTED_CURRENCIES.find(curr => curr.code === code);
}

// 🌐 Detecção automática de idioma/região
export function detectUserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en-US';
  
  const browserLang = navigator.language;
  const supported = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang);
  
  if (supported) return supported.code;
  
  // Fallback para idioma base (ex: 'pt' -> 'pt-BR')
  const baseLang = browserLang.split('-')[0];
  const baseSupported = SUPPORTED_LANGUAGES.find(lang => lang.code.startsWith(baseLang));
  
  return baseSupported?.code || 'en-US';
}

export function detectUserCurrency(): SupportedCurrency {
  if (typeof window === 'undefined') return 'USD';
  
  // Mapeamento de países para moedas
  const currencyMap: Record<string, SupportedCurrency> = {
    'BR': 'BRL',
    'US': 'USD',
    'GB': 'GBP',
    'EU': 'EUR',
    'JP': 'JPY',
    'KR': 'KRW',
    'CN': 'CNY',
    'RU': 'RUB',
    'AR': 'ARS',
    'MX': 'MXN',
    'AU': 'AUD',
    'CA': 'CAD'
  };
  
  const browserLang = navigator.language;
  const country = browserLang.split('-')[1];
  
  return currencyMap[country] || 'USD';
}

// 📅 Formatação de data por região
export function formatDate(date: Date, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatDateTime(date: Date, language: SupportedLanguage): string {
  return new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
