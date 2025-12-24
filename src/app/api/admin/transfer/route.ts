import { NextRequest, NextResponse } from "next/server";
import { getPaymentService, SupportedCurrency } from "@/lib/payment-service";

/**
 * API Route para processar transferências instantâneas com suporte a múltiplas moedas
 * POST /api/admin/transfer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      paymentId,
      amount,
      currency = "BRL",
      recipientName,
      recipientDocument,
      pixKey,
      description,
    } = body;

    // Validações
    if (!paymentId || !amount || !recipientName || !recipientDocument || !pixKey) {
      return NextResponse.json(
        { error: "Dados incompletos para transferência" },
        { status: 400 }
      );
    }

    // Validar moeda
    if (!["BRL", "USD", "EUR", "GBP", "ARS", "CLP", "MXN"].includes(currency)) {
      return NextResponse.json(
        { error: `Moeda ${currency} não suportada` },
        { status: 400 }
      );
    }

    // Processar transferência via serviço de pagamentos
    const paymentService = getPaymentService();
    const result = await paymentService.transfer({
      amount,
      currency: currency as SupportedCurrency,
      recipientName,
      recipientDocument,
      pixKey,
      description: description || `Transferência ref. ${paymentId}`,
      metadata: {
        paymentId,
        source: "GameMarket Admin",
      },
    });

    if (result.success) {
      // Em produção, salvar no banco de dados
      // await supabase.from('transfers').insert({
      //   payment_id: paymentId,
      //   transaction_id: result.transactionId,
      //   amount,
      //   currency,
      //   original_amount: result.originalAmount,
      //   original_currency: result.originalCurrency,
      //   converted_amount: result.convertedAmount,
      //   exchange_rate: result.exchangeRate,
      //   recipient_name: recipientName,
      //   recipient_document: recipientDocument,
      //   pix_key: pixKey,
      //   status: result.status,
      //   created_at: new Date().toISOString(),
      // });

      return NextResponse.json({
        success: true,
        transactionId: result.transactionId,
        message: result.message,
        timestamp: result.timestamp,
        originalAmount: result.originalAmount,
        originalCurrency: result.originalCurrency,
        convertedAmount: result.convertedAmount,
        exchangeRate: result.exchangeRate,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erro ao processar transferência:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar transferência" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/transfer - Listar transferências
 */
export async function GET(request: NextRequest) {
  try {
    // Em produção, buscar do banco de dados
    // const { data, error } = await supabase
    //   .from('transfers')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // Mock data para desenvolvimento
    const transfers = [
      {
        id: "TRANS-001",
        paymentId: "PAY-001",
        transactionId: "MOCK-123456",
        amount: 150.0,
        currency: "BRL",
        recipientName: "Maria Santos",
        recipientDocument: "123.456.789-00",
        pixKey: "maria@email.com",
        status: "completed",
        createdAt: new Date().toISOString(),
      },
      {
        id: "TRANS-002",
        paymentId: "PAY-002",
        transactionId: "MOCK-789012",
        amount: 50.0,
        currency: "USD",
        originalAmount: 50.0,
        originalCurrency: "USD",
        convertedAmount: 260.0,
        exchangeRate: 5.2,
        recipientName: "Ana Lima",
        recipientDocument: "987.654.321-00",
        pixKey: "ana@email.com",
        status: "completed",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ transfers });
  } catch (error) {
    console.error("Erro ao listar transferências:", error);
    return NextResponse.json(
      { error: "Erro ao listar transferências" },
      { status: 500 }
    );
  }
}
