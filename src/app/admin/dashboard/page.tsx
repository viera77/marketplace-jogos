"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DollarSign, 
  Send, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Wallet,
  ArrowUpRight,
  Filter,
  Search,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SupportedCurrency, formatCurrency, convertToBRL } from "@/lib/payment-service";

interface Payment {
  id: string;
  amount: number;
  currency: SupportedCurrency;
  status: "pending" | "completed" | "transferred";
  buyer: string;
  seller: string;
  product: string;
  createdAt: string;
  transferredAt?: string;
  transactionId?: string;
}

interface TransferData {
  recipientName: string;
  recipientCpf: string;
  pixKey: string;
  amount: number;
  currency: SupportedCurrency;
  description: string;
}

const CURRENCY_FLAGS: Record<SupportedCurrency, string> = {
  BRL: "🇧🇷",
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  ARS: "🇦🇷",
  CLP: "🇨🇱",
  MXN: "🇲🇽",
};

export default function AdminDashboard() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY-001",
      amount: 150.00,
      currency: "BRL",
      status: "completed",
      buyer: "João Silva",
      seller: "Maria Santos",
      product: "League of Legends - 1000 RP",
      createdAt: new Date().toISOString(),
    },
    {
      id: "PAY-002",
      amount: 50.00,
      currency: "USD",
      status: "completed",
      buyer: "Pedro Costa",
      seller: "Ana Lima",
      product: "Valorant - 2000 VP",
      createdAt: new Date().toISOString(),
    },
    {
      id: "PAY-003",
      amount: 89.90,
      currency: "BRL",
      status: "completed",
      buyer: "Carlos Mendes",
      seller: "Lucas Oliveira",
      product: "CS:GO - Skin AWP Dragon Lore",
      createdAt: new Date().toISOString(),
    },
    {
      id: "PAY-004",
      amount: 30.00,
      currency: "EUR",
      status: "completed",
      buyer: "Roberto Alves",
      seller: "Fernanda Costa",
      product: "Fortnite - 5000 V-Bucks",
      createdAt: new Date().toISOString(),
    },
    {
      id: "PAY-005",
      amount: 25.00,
      currency: "GBP",
      status: "completed",
      buyer: "Marcos Silva",
      seller: "Juliana Souza",
      product: "Apex Legends - Battle Pass",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState<TransferData>({
    recipientName: "",
    recipientCpf: "",
    pixKey: "",
    amount: 0,
    currency: "BRL",
    description: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [transferError, setTransferError] = useState<string>("");
  const [transferSuccess, setTransferSuccess] = useState<string>("");

  // Calcular estatísticas (converter tudo para BRL)
  const totalReceived = payments
    .filter(p => p.status === "completed" || p.status === "transferred")
    .reduce((sum, p) => sum + convertToBRL(p.amount, p.currency), 0);

  const availableBalance = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + convertToBRL(p.amount, p.currency), 0);

  const totalTransferred = payments
    .filter(p => p.status === "transferred")
    .reduce((sum, p) => sum + convertToBRL(p.amount, p.currency), 0);

  const handleOpenTransfer = (payment: Payment) => {
    setSelectedPayment(payment);
    setTransferData({
      recipientName: "",
      recipientCpf: "",
      pixKey: "",
      amount: payment.amount,
      currency: payment.currency,
      description: `Transferência ref. ${payment.id}`,
    });
    setTransferError("");
    setTransferSuccess("");
    setShowTransferModal(true);
  };

  const handleTransfer = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);
    setTransferError("");
    setTransferSuccess("");

    try {
      // Chamar API de transferência
      const response = await fetch("/api/admin/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: selectedPayment.id,
          amount: transferData.amount,
          currency: transferData.currency,
          recipientName: transferData.recipientName,
          recipientDocument: transferData.recipientCpf,
          pixKey: transferData.pixKey,
          description: transferData.description,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Atualizar status do pagamento
        setPayments(prev =>
          prev.map(p =>
            p.id === selectedPayment.id
              ? { 
                  ...p, 
                  status: "transferred", 
                  transferredAt: new Date().toISOString(),
                  transactionId: result.transactionId 
                }
              : p
          )
        );

        let successMessage = `✅ Transferência realizada com sucesso! ID: ${result.transactionId}`;
        
        // Adicionar informação de conversão se aplicável
        if (result.originalCurrency && result.originalCurrency !== "BRL") {
          successMessage += `\n💱 Convertido: ${formatCurrency(result.originalAmount, result.originalCurrency as SupportedCurrency)} → R$ ${result.convertedAmount.toFixed(2)} (taxa: ${result.exchangeRate})`;
        }

        setTransferSuccess(successMessage);
        
        // Fechar modal após 3 segundos
        setTimeout(() => {
          setShowTransferModal(false);
          setSelectedPayment(null);
          setTransferData({
            recipientName: "",
            recipientCpf: "",
            pixKey: "",
            amount: 0,
            currency: "BRL",
            description: "",
          });
        }, 3000);
      } else {
        setTransferError(result.error || "Erro ao processar transferência");
      }
    } catch (error) {
      setTransferError("Erro de conexão. Tente novamente.");
      console.error("Erro ao transferir:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Filtrar pagamentos
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "all" || payment.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-400">Gerencie pagamentos em múltiplas moedas e transferências instantâneas via Pix</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-cyan-400">
            <RefreshCw className="w-4 h-4" />
            <span>Suporte a BRL, USD, EUR, GBP, ARS, CLP, MXN com conversão automática</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 hover:border-cyan-400/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              R$ {totalReceived.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">Total Recebido (convertido)</div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-green-500/20 p-6 hover:border-green-400/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/50">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              R$ {availableBalance.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">Saldo Disponível para Transferir</div>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-purple-500/20 p-6 hover:border-purple-400/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Send className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              R$ {totalTransferred.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">Total Transferido</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por ID, comprador, vendedor ou produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-cyan-500/30 text-white"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-cyan-500/30 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="transferred">Transferido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Payments Table */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 overflow-hidden">
          <div className="p-6 border-b border-cyan-500/20">
            <h2 className="text-xl font-bold text-white">Pagamentos Recebidos</h2>
            <p className="text-sm text-gray-400 mt-1">
              Pagamentos em múltiplas moedas com conversão automática para BRL
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Produto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Comprador</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Vendedor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Valor Original</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Valor em BRL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {filteredPayments.map((payment) => {
                  const amountInBRL = convertToBRL(payment.amount, payment.currency);
                  return (
                    <tr key={payment.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-white font-mono">{payment.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{payment.product}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{payment.buyer}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{payment.seller}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-cyan-400">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{CURRENCY_FLAGS[payment.currency]}</span>
                          <span>{formatCurrency(payment.amount, payment.currency)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-400">
                        R$ {amountInBRL.toFixed(2)}
                        {payment.currency !== "BRL" && (
                          <span className="text-xs text-gray-500 ml-2">(convertido)</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            payment.status === "completed"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : payment.status === "transferred"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {payment.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {payment.status === "transferred" && <Send className="w-3 h-3 mr-1" />}
                          {payment.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {payment.status === "completed" ? "Concluído" : 
                           payment.status === "transferred" ? "Transferido" : "Pendente"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {payment.status === "completed" && (
                          <Button
                            size="sm"
                            onClick={() => handleOpenTransfer(payment)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Transferir
                          </Button>
                        )}
                        {payment.status === "transferred" && (
                          <div className="flex flex-col">
                            <span className="text-sm text-purple-400 font-semibold">✓ Transferido</span>
                            {payment.transactionId && (
                              <span className="text-xs text-gray-500 font-mono">{payment.transactionId}</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Transfer Modal */}
        {showTransferModal && selectedPayment && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-slate-900 border-cyan-500/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Transferência Instantânea via Pix
                </h3>
                <p className="text-gray-400 text-sm">
                  Pagamento: {selectedPayment.id}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">{CURRENCY_FLAGS[selectedPayment.currency]}</span>
                  <span className="text-cyan-400 font-semibold">
                    {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                  </span>
                  {selectedPayment.currency !== "BRL" && (
                    <>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-400 font-semibold">
                        R$ {convertToBRL(selectedPayment.amount, selectedPayment.currency).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                {transferError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-semibold mb-1">Erro na Transferência</p>
                      <p className="text-sm text-red-300">{transferError}</p>
                    </div>
                  </div>
                )}

                {transferSuccess && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-400 font-semibold mb-1">Sucesso!</p>
                      <p className="text-sm text-green-300 whitespace-pre-line">{transferSuccess}</p>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-white mb-2">Nome do Destinatário</Label>
                  <Input
                    placeholder="Ex: Maria Santos"
                    value={transferData.recipientName}
                    onChange={(e) => setTransferData({ ...transferData, recipientName: e.target.value })}
                    className="bg-slate-800/50 border-cyan-500/30 text-white"
                    disabled={isProcessing || !!transferSuccess}
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">CPF/CNPJ do Destinatário</Label>
                  <Input
                    placeholder="000.000.000-00"
                    value={transferData.recipientCpf}
                    onChange={(e) => setTransferData({ ...transferData, recipientCpf: e.target.value })}
                    className="bg-slate-800/50 border-cyan-500/30 text-white"
                    disabled={isProcessing || !!transferSuccess}
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">Chave Pix</Label>
                  <Input
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                    value={transferData.pixKey}
                    onChange={(e) => setTransferData({ ...transferData, pixKey: e.target.value })}
                    className="bg-slate-800/50 border-cyan-500/30 text-white"
                    disabled={isProcessing || !!transferSuccess}
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">Valor da Transferência</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={transferData.amount}
                    onChange={(e) => setTransferData({ ...transferData, amount: parseFloat(e.target.value) })}
                    className="bg-slate-800/50 border-cyan-500/30 text-white"
                    disabled={isProcessing || !!transferSuccess}
                  />
                </div>

                <div>
                  <Label className="text-white mb-2">Descrição (opcional)</Label>
                  <Input
                    placeholder="Descrição da transferência"
                    value={transferData.description}
                    onChange={(e) => setTransferData({ ...transferData, description: e.target.value })}
                    className="bg-slate-800/50 border-cyan-500/30 text-white"
                    disabled={isProcessing || !!transferSuccess}
                  />
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Transferência Instantânea com Conversão Automática</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    O valor será convertido automaticamente para BRL e transferido instantaneamente via Pix.
                    {selectedPayment.currency !== "BRL" && (
                      <span className="block mt-2 text-cyan-300">
                        💱 Conversão: {formatCurrency(selectedPayment.amount, selectedPayment.currency)} → R$ {convertToBRL(selectedPayment.amount, selectedPayment.currency).toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-cyan-500/20 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTransferModal(false);
                    setSelectedPayment(null);
                  }}
                  disabled={isProcessing}
                  className="flex-1 border-cyan-500/30 text-white hover:bg-cyan-500/10"
                >
                  {transferSuccess ? "Fechar" : "Cancelar"}
                </Button>
                {!transferSuccess && (
                  <Button
                    onClick={handleTransfer}
                    disabled={
                      isProcessing ||
                      !transferData.recipientName ||
                      !transferData.recipientCpf ||
                      !transferData.pixKey ||
                      transferData.amount <= 0
                    }
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30"
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Transferir Agora
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
