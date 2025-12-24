"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Shield, Mail, Lock, Eye, EyeOff, ArrowLeft, User, 
  Phone, CheckCircle2, Upload, Camera, CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

type Step = 1 | 2 | 3 | 4 | 5;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Informações Básicas
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Informações de Contato
    phone: "",
    country: "",
    city: "",
    // Step 3: Verificação de Identidade
    documentType: "cpf",
    documentNumber: "",
    birthDate: "",
    // Step 4: Verificação de Foto
    photoId: null as File | null,
    selfie: null as File | null,
    // Step 5: Informações de Pagamento (opcional)
    paymentMethod: "",
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simular processo de verificação e aprovação
    toast({
      title: "Processando cadastro...",
      description: "Verificando suas informações",
    });

    // Etapa 1: Verificação de dados (2 segundos)
    setTimeout(() => {
      toast({
        title: "✓ Dados verificados",
        description: "Validando documentos...",
      });
    }, 2000);

    // Etapa 2: Validação de documentos (3 segundos)
    setTimeout(() => {
      toast({
        title: "✓ Documentos validados",
        description: "Verificando identidade...",
      });
    }, 5000);

    // Etapa 3: Verificação de identidade (2 segundos)
    setTimeout(() => {
      toast({
        title: "✓ Identidade verificada",
        description: "Finalizando cadastro...",
      });
    }, 7000);

    // Etapa 4: Aprovação automática (2 segundos)
    setTimeout(() => {
      toast({
        title: "🎉 Cadastro aprovado!",
        description: "Sua conta foi criada com sucesso. Redirecionando...",
      });
      
      // Redirecionar para o marketplace após aprovação
      setTimeout(() => {
        router.push("/marketplace");
      }, 2000);
    }, 9000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Informações Básicas</h2>
              <p className="text-gray-400">Vamos começar com suas informações pessoais</p>
            </div>

            {/* Nome Completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="João Silva"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Mínimo 8 caracteres, incluindo letras e números</p>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Informações de Contato</h2>
              <p className="text-gray-400">Como podemos entrar em contato com você?</p>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                  required
                />
              </div>
            </div>

            {/* País */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-300">País</Label>
              <Input
                id="country"
                type="text"
                placeholder="Brasil"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                required
              />
            </div>

            {/* Cidade */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-300">Cidade</Label>
              <Input
                id="city"
                type="text"
                placeholder="São Paulo"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Verificação de Identidade</h2>
              <p className="text-gray-400">Precisamos verificar sua identidade para sua segurança</p>
            </div>

            {/* Tipo de Documento */}
            <div className="space-y-2">
              <Label className="text-gray-300">Tipo de Documento</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, documentType: "cpf" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.documentType === "cpf"
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/30 bg-slate-900/50 hover:border-cyan-400/50"
                  }`}
                >
                  <p className="text-white font-semibold">CPF</p>
                  <p className="text-xs text-gray-400">Cadastro de Pessoa Física</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, documentType: "rg" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.documentType === "rg"
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-cyan-500/30 bg-slate-900/50 hover:border-cyan-400/50"
                  }`}
                >
                  <p className="text-white font-semibold">RG</p>
                  <p className="text-xs text-gray-400">Registro Geral</p>
                </button>
              </div>
            </div>

            {/* Número do Documento */}
            <div className="space-y-2">
              <Label htmlFor="documentNumber" className="text-gray-300">
                Número do {formData.documentType.toUpperCase()}
              </Label>
              <Input
                id="documentNumber"
                type="text"
                placeholder={formData.documentType === "cpf" ? "000.000.000-00" : "00.000.000-0"}
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400"
                required
              />
            </div>

            {/* Data de Nascimento */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-gray-300">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="bg-slate-900/50 border-cyan-500/30 text-white focus:border-cyan-400"
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Verificação Fotográfica</h2>
              <p className="text-gray-400">Envie fotos para confirmar sua identidade</p>
            </div>

            {/* Foto do Documento */}
            <div className="space-y-2">
              <Label className="text-gray-300">Foto do Documento</Label>
              <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-all bg-slate-900/50">
                <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-white mb-2">Clique para enviar ou arraste aqui</p>
                <p className="text-sm text-gray-400">Foto clara do seu documento (frente)</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, photoId: e.target.files?.[0] || null })}
                  className="hidden"
                  id="photoId"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => document.getElementById("photoId")?.click()}
                >
                  Selecionar Arquivo
                </Button>
                {formData.photoId && (
                  <p className="text-sm text-green-400 mt-2">✓ {formData.photoId.name}</p>
                )}
              </div>
            </div>

            {/* Selfie */}
            <div className="space-y-2">
              <Label className="text-gray-300">Selfie com Documento</Label>
              <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-all bg-slate-900/50">
                <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-white mb-2">Tire uma selfie segurando seu documento</p>
                <p className="text-sm text-gray-400">Certifique-se de que seu rosto e o documento estejam visíveis</p>
                <Input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) => setFormData({ ...formData, selfie: e.target.files?.[0] || null })}
                  className="hidden"
                  id="selfie"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={() => document.getElementById("selfie")?.click()}
                >
                  Tirar Selfie
                </Button>
                {formData.selfie && (
                  <p className="text-sm text-green-400 mt-2">✓ {formData.selfie.name}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Informações de Pagamento</h2>
              <p className="text-gray-400">Configure seu método de pagamento (opcional)</p>
            </div>

            {/* Métodos de Pagamento */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "pix" })}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  formData.paymentMethod === "pix"
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-cyan-500/30 bg-slate-900/50 hover:border-cyan-400/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">PIX</p>
                    <p className="text-xs text-gray-400">Pagamento instantâneo</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  formData.paymentMethod === "card"
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-cyan-500/30 bg-slate-900/50 hover:border-cyan-400/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Cartão de Crédito</p>
                    <p className="text-xs text-gray-400">Visa, Mastercard, Elo</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: "boleto" })}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  formData.paymentMethod === "boleto"
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-cyan-500/30 bg-slate-900/50 hover:border-cyan-400/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Boleto Bancário</p>
                    <p className="text-xs text-gray-400">Pagamento em até 3 dias úteis</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <p className="text-sm text-cyan-300">
                💡 Você pode adicionar ou alterar seu método de pagamento a qualquer momento nas configurações da conta.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Home
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                GameMarket
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Criar Nova Conta</h1>
            <p className="text-gray-400">Junte-se à maior comunidade de gamers</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Etapa {currentStep} de {totalSteps}</span>
              <span className="text-sm text-cyan-400 font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-900/50" />
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step < currentStep
                    ? "bg-cyan-500 border-cyan-500"
                    : step === currentStep
                    ? "bg-cyan-500/20 border-cyan-400"
                    : "bg-slate-900/50 border-cyan-500/30"
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm font-semibold ${step === currentStep ? "text-cyan-400" : "text-gray-500"}`}>
                    {step}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 py-6"
                >
                  Voltar
                </Button>
              )}
              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30 py-6"
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-400 hover:via-emerald-400 hover:to-teal-500 shadow-lg shadow-green-500/30 py-6"
                >
                  {isLoading ? "Processando..." : "Finalizar Cadastro"}
                </Button>
              )}
            </div>
          </Card>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Faça login
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Todas as suas informações são criptografadas e protegidas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
