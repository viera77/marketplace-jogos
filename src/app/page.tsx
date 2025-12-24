"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Shield, Zap, Users, TrendingUp, Star, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/custom/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/custom/CurrencySwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([]);
  const { language } = useLanguage();
  
  const { t } = useTranslation(language);

  // Gerar partículas apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`
    }));
    setParticles(generatedParticles);
  }, []);

  const categories = [
    { name: t('categories.gameCurrency'), icon: "💰", count: "15.2k" },
    { name: t('categories.gameAccounts'), icon: "👤", count: "8.5k" },
    { name: t('categories.boosting'), icon: "📈", count: "6.8k" },
    { name: t('categories.virtualItems'), icon: "🎁", count: "12.3k" },
    { name: t('categories.giftCards'), icon: "🎫", count: "4.2k" },
    { name: t('categories.coaching'), icon: "🎓", count: "2.1k" }
  ];

  const topGames = [
    { name: "League of Legends", offers: "3.2k" },
    { name: "Valorant", offers: "2.8k" },
    { name: "CS:GO", offers: "2.5k" },
    { name: "Genshin Impact", offers: "2.1k" },
    { name: "World of Warcraft", offers: "1.9k" },
    { name: "Fortnite", offers: "1.7k" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background futurista gamer profissional */}
      <div className="fixed inset-0 -z-10">
        {/* Imagem de fundo - Gaming Setup */}
        <img 
          src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1920&h=1080&fit=crop" 
          alt="Gaming Background"
          className="w-full h-full object-cover opacity-5"
        />
        
        {/* Gradiente base escuro com azul, roxo e ciano */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Camada de gradiente adicional para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-transparent to-purple-900/40" />
        
        {/* Formas geométricas abstratas */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Linhas diagonais sutis */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -rotate-12" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transform rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -rotate-6" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform rotate-6" />
        </div>
        
        {/* Partículas digitais flutuantes - renderizadas apenas no cliente */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
        
        {/* Iluminação neon sutil */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
        
        {/* Grid tecnológico sutil */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Gamer Chamativa */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Brilho externo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
                
                {/* Container da logo */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300">
                  {/* Efeito de brilho interno */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-xl" />
                  
                  {/* Ícone principal - Shield com efeitos */}
                  <Shield className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
                  
                  {/* Estrelas decorativas */}
                  <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" fill="currentColor" />
                  <Flame className="absolute -bottom-1 -left-1 w-3 h-3 text-orange-500 animate-bounce" />
                </div>
              </div>
              
              {/* Texto da logo com efeitos */}
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-400 transition-all duration-300 tracking-tight">
                  GameMarket
                </span>
                <span className="text-[10px] font-bold text-cyan-400/80 tracking-widest uppercase -mt-1">
                  PRO GAMING
                </span>
              </div>
              
              {/* Badge "NEW" ou "HOT" */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-[10px] font-bold text-white shadow-lg shadow-orange-500/50 animate-pulse">
                <Flame className="w-3 h-3" />
                HOT
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                {t('header.marketplace')}
              </Link>
              <Link href="/sell" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                {t('header.sell')}
              </Link>
              <Link href="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                {t('header.howItWorks')}
              </Link>
              <Link href="/support" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">
                {t('header.support')}
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <CurrencySwitcher />
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Link href="/login">
                <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all">
                  <User className="w-4 h-4 mr-2" />
                  {t('header.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30">
                  {t('header.register')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4">
              <nav className="flex flex-col gap-3">
                <Link href="/marketplace" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">
                  {t('header.marketplace')}
                </Link>
                <Link href="/sell" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">
                  {t('header.sell')}
                </Link>
                <Link href="/how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">
                  {t('header.howItWorks')}
                </Link>
                <Link href="/support" className="text-gray-300 hover:text-cyan-400 transition-colors py-2">
                  {t('header.support')}
                </Link>
                <div className="flex gap-2 py-2">
                  <LanguageSwitcher />
                  <CurrencySwitcher />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href="/login">
                    <Button variant="outline" className="border-cyan-500/30 text-cyan-400 w-full">
                      <User className="w-4 h-4 mr-2" />
                      {t('header.login')}
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 w-full">
                      {t('header.register')}
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}{t('hero.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                className="pl-12 pr-4 py-6 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 text-lg focus:border-cyan-400 backdrop-blur-sm"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30">
                {t('hero.searchButton')}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">50k+</div>
              <div className="text-sm text-gray-400">{t('stats.activeProducts')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">25k+</div>
              <div className="text-sm text-gray-400">{t('stats.sellers')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">1M+</div>
              <div className="text-sm text-gray-400">{t('stats.transactions')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">4.9★</div>
              <div className="text-sm text-gray-400">{t('stats.rating')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 border-t border-cyan-500/20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 hover:border-cyan-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/50">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('features.securePayment')}</h3>
            <p className="text-gray-400">
              {t('features.securePaymentDesc')}
            </p>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 hover:border-cyan-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('features.fastDelivery')}</h3>
            <p className="text-gray-400">
              {t('features.fastDeliveryDesc')}
            </p>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 hover:border-cyan-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('features.verifiedSellers')}</h3>
            <p className="text-gray-400">
              {t('features.verifiedSellersDesc')}
            </p>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">{t('categories.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-6 hover:bg-slate-900/70 hover:border-cyan-400/40 transition-all cursor-pointer group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-white font-semibold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count} {t('categories.offers')}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Games */}
      <section className="container mx-auto px-4 py-16 border-t border-cyan-500/20">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">{t('games.topGames')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topGames.map((game, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border-cyan-500/20 p-4 hover:bg-slate-900/70 hover:border-cyan-400/40 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/50">
                  {index + 1}
                </div>
                <div>
                  <div className="text-white font-semibold">{game.name}</div>
                  <div className="text-sm text-gray-400">{game.offers} {t('categories.offers')}</div>
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 border-t border-cyan-500/20">
        <Card className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 border-0 p-12 text-center shadow-2xl shadow-cyan-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 shadow-lg">
                {t('cta.createAccount')}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('cta.learnMore')}
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">GameMarket</span>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.marketplace')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.allGames')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.categories')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.topSellers')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.deals')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.helpCenter')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.howToBuy')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.howToSell')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.contact')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.terms')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.riskNotice')}</Link></li>
                <li><Link href="#" className="hover:text-cyan-400 transition-colors">{t('footer.gdpr')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cyan-500/20 pt-8 text-center text-sm text-gray-400">
            <p>{t('footer.copyright')}</p>
            <p className="mt-2">
              {t('footer.warning')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
