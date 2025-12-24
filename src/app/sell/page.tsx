"use client";

import Link from "next/link";
import { Shield, ArrowLeft, Upload, DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SellPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background futurista */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1920&h=1080&fit=crop" 
          alt="Gaming Background"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-transparent to-purple-900/40" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              GameMarket
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Venda no GameMarket
            </h1>
            <p className="text-xl text-gray-300">
              Transforme seus itens de jogos em dinheiro real
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 text-center">
              <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Fácil de Anunciar</h3>
              <p className="text-gray-400 text-sm">Crie seu anúncio em minutos</p>
            </Card>
            <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 text-center">
              <DollarSign className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Pagamento Rápido</h3>
              <p className="text-gray-400 text-sm">Receba em até 24 horas</p>
            </Card>
            <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 text-center">
              <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Grande Audiência</h3>
              <p className="text-gray-400 text-sm">Milhares de compradores ativos</p>
            </Card>
          </div>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-8 text-center">
            <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Comece a Vender Agora</h2>
            <p className="text-gray-300 mb-6">
              Cadastre-se gratuitamente e comece a lucrar com seus itens de jogos
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30">
                Criar Conta de Vendedor
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
