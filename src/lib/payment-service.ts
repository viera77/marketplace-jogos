/**
 * Serviço de Pagamentos e Transferências Instantâneas
 * Suporta múltiplas moedas com conversão automática
 */

// Taxas de câmbio (em produção, buscar de API como exchangerate-api.com)
const EXCHANGE_RATES: Record<string, number> = {
  BRL: 1.0,
  USD: 5.20,  // 1 USD = 5.20 BRL
  EUR: 5.65,  // 1 EUR = 5.65 BRL
  GBP: 6.50,  // 1 GBP = 6.50 BRL
  ARS: 0.0065, // 1 ARS = 0.0065 BRL
  CLP: 0.0055, // 1 CLP = 0.0055 BRL
  MXN: 0.30,  // 1 MXN = 0.30 BRL
};

export type SupportedCurrency = keyof typeof EXCHANGE_RATES;

export interface PaymentProvider {
  name: string;
  processTransfer: (data: TransferRequest) => Promise<TransferResponse>;
}

export interface TransferRequest {
  amount: number;
  currency: SupportedCurrency;
  recipientName: string;
  recipientDocument: string; // CPF/CNPJ
  pixKey: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TransferResponse {
  success: boolean;
  transactionId: string;
  status: "completed" | "pending" | "failed";
  message: string;
  timestamp: string;
  originalAmount?: number;
  originalCurrency?: string;
  convertedAmount?: number;
  exchangeRate?: number;
}

/**
 * Converte valor de moeda estrangeira para BRL
 */
export function convertToBRL(amount: number, currency: SupportedCurrency): number {
  const rate = EXCHANGE_RATES[currency];
  return amount * rate;
}

/**
 * Formata valor com símbolo da moeda
 */
export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  const symbols: Record<SupportedCurrency, string> = {
    BRL: "R$",
    USD: "$",
    EUR: "€",
    GBP: "£",
    ARS: "ARS$",
    CLP: "CLP$",
    MXN: "MXN$",
  };

  return `${symbols[currency]} ${amount.toFixed(2)}`;
}

/**
 * Mercado Pago - Transferências instantâneas via Pix
 * Suporta conversão automática de moedas
 */
class MercadoPagoProvider implements PaymentProvider {
  name = "Mercado Pago";
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async processTransfer(data: TransferRequest): Promise<TransferResponse> {
    try {
      // Converter para BRL se necessário
      const originalAmount = data.amount;
      const originalCurrency = data.currency;
      const amountInBRL = data.currency !== "BRL" 
        ? convertToBRL(data.amount, data.currency)
        : data.amount;
      const exchangeRate = EXCHANGE_RATES[data.currency];

      // Em produção, fazer requisição real para API do Mercado Pago
      const response = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({
          transaction_amount: amountInBRL,
          description: data.description || "Transferência GameMarket",
          payment_method_id: "pix",
          payer: {
            email: "admin@gamemarket.com",
          },
          metadata: {
            recipient_name: data.recipientName,
            recipient_document: data.recipientDocument,
            pix_key: data.pixKey,
            original_amount: originalAmount,
            original_currency: originalCurrency,
            exchange_rate: exchangeRate,
            ...data.metadata,
          },
        }),
      });

      const result = await response.json();

      return {
        success: response.ok,
        transactionId: result.id || `MP-${Date.now()}`,
        status: response.ok ? "completed" : "failed",
        message: response.ok ? "Transferência realizada com sucesso" : result.message,
        timestamp: new Date().toISOString(),
        originalAmount,
        originalCurrency,
        convertedAmount: amountInBRL,
        exchangeRate,
      };
    } catch (error) {
      return {
        success: false,
        transactionId: `ERROR-${Date.now()}`,
        status: "failed",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      };
    }
  }
}

/**
 * PagSeguro - Transferências instantâneas
 * Suporta conversão automática de moedas
 */
class PagSeguroProvider implements PaymentProvider {
  name = "PagSeguro";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async processTransfer(data: TransferRequest): Promise<TransferResponse> {
    try {
      // Converter para BRL se necessário
      const originalAmount = data.amount;
      const originalCurrency = data.currency;
      const amountInBRL = data.currency !== "BRL" 
        ? convertToBRL(data.amount, data.currency)
        : data.amount;
      const exchangeRate = EXCHANGE_RATES[data.currency];

      // Em produção, fazer requisição real para API do PagSeguro
      const response = await fetch("https://ws.pagseguro.uol.com.br/v2/transfers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          amount: amountInBRL,
          receiver: {
            name: data.recipientName,
            document: data.recipientDocument,
            pix_key: data.pixKey,
          },
          description: data.description,
          metadata: {
            original_amount: originalAmount,
            original_currency: originalCurrency,
            exchange_rate: exchangeRate,
          },
        }),
      });

      const result = await response.json();

      return {
        success: response.ok,
        transactionId: result.code || `PS-${Date.now()}`,
        status: response.ok ? "completed" : "failed",
        message: response.ok ? "Transferência realizada com sucesso" : result.error,
        timestamp: new Date().toISOString(),
        originalAmount,
        originalCurrency,
        convertedAmount: amountInBRL,
        exchangeRate,
      };
    } catch (error) {
      return {
        success: false,
        transactionId: `ERROR-${Date.now()}`,
        status: "failed",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      };
    }
  }
}

/**
 * Simulador de Transferências (para desenvolvimento)
 * Suporta múltiplas moedas
 */
class MockProvider implements PaymentProvider {
  name = "Mock Provider (Desenvolvimento)";

  async processTransfer(data: TransferRequest): Promise<TransferResponse> {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Converter para BRL se necessário
    const originalAmount = data.amount;
    const originalCurrency = data.currency;
    const amountInBRL = data.currency !== "BRL" 
      ? convertToBRL(data.amount, data.currency)
      : data.amount;
    const exchangeRate = EXCHANGE_RATES[data.currency];

    // Simular sucesso em 95% dos casos
    const success = Math.random() > 0.05;

    const conversionInfo = data.currency !== "BRL"
      ? ` (convertido de ${formatCurrency(originalAmount, originalCurrency)} para R$ ${amountInBRL.toFixed(2)})`
      : "";

    return {
      success,
      transactionId: `MOCK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: success ? "completed" : "failed",
      message: success 
        ? `Transferência de R$ ${amountInBRL.toFixed(2)}${conversionInfo} realizada com sucesso para ${data.recipientName}` 
        : "Falha na transferência - Tente novamente",
      timestamp: new Date().toISOString(),
      originalAmount,
      originalCurrency,
      convertedAmount: amountInBRL,
      exchangeRate,
    };
  }
}

/**
 * Gerenciador de Pagamentos
 * Escolhe o provedor adequado e processa transferências com suporte a múltiplas moedas
 */
export class PaymentService {
  private provider: PaymentProvider;

  constructor(providerType: "mercadopago" | "pagseguro" | "mock" = "mock") {
    switch (providerType) {
      case "mercadopago":
        this.provider = new MercadoPagoProvider(
          process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN || ""
        );
        break;
      case "pagseguro":
        this.provider = new PagSeguroProvider(
          process.env.NEXT_PUBLIC_PAGSEGURO_API_KEY || ""
        );
        break;
      default:
        this.provider = new MockProvider();
    }
  }

  async transfer(data: TransferRequest): Promise<TransferResponse> {
    // Validações básicas
    if (data.amount <= 0) {
      return {
        success: false,
        transactionId: "INVALID",
        status: "failed",
        message: "Valor inválido para transferência",
        timestamp: new Date().toISOString(),
      };
    }

    if (!data.pixKey || !data.recipientName || !data.recipientDocument) {
      return {
        success: false,
        transactionId: "INVALID",
        status: "failed",
        message: "Dados do destinatário incompletos",
        timestamp: new Date().toISOString(),
      };
    }

    // Validar moeda suportada
    if (!EXCHANGE_RATES[data.currency]) {
      return {
        success: false,
        transactionId: "INVALID",
        status: "failed",
        message: `Moeda ${data.currency} não suportada`,
        timestamp: new Date().toISOString(),
      };
    }

    // Processar transferência
    return await this.provider.processTransfer(data);
  }

  getProviderName(): string {
    return this.provider.name;
  }

  getSupportedCurrencies(): SupportedCurrency[] {
    return Object.keys(EXCHANGE_RATES) as SupportedCurrency[];
  }

  getExchangeRate(currency: SupportedCurrency): number {
    return EXCHANGE_RATES[currency];
  }
}

// Instância singleton
let paymentServiceInstance: PaymentService | null = null;

export function getPaymentService(): PaymentService {
  if (!paymentServiceInstance) {
    // Em produção, usar "mercadopago" ou "pagseguro"
    // Em desenvolvimento, usar "mock"
    const providerType = process.env.NODE_ENV === "production" ? "mercadopago" : "mock";
    paymentServiceInstance = new PaymentService(providerType as any);
  }
  return paymentServiceInstance;
}
