"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ShoppingCart, User, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTranslation } from "@/lib/translations";
import { formatPrice } from "@/lib/i18n";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const { t } = useTranslation(language);

  const products = [
    {
      id: 1,
      game: "League of Legends",
      title: "10.000 RP - Riot Points",
      price: 89.99,
      seller: "ProGamer123",
      rating: 4.9,
      sales: 1250,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 2,
      game: "Valorant",
      title: "Conta Imortal 3 - Todas Skins",
      price: 450.00,
      seller: "AccountKing",
      rating: 5.0,
      sales: 890,
      delivery: `1-2 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 3,
      game: "CS:GO",
      title: "Boosting para Global Elite",
      price: 120.00,
      seller: "BoostMaster",
      rating: 4.8,
      sales: 2100,
      delivery: `3-5 ${t('common.days')}`,
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop",
      category: "boosting"
    },
    {
      id: 4,
      game: "Genshin Impact",
      title: "50.000 Primogems",
      price: 199.99,
      seller: "GenshinPro",
      rating: 4.9,
      sales: 750,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 5,
      game: "World of Warcraft",
      title: "500.000 Gold - Azralon",
      price: 75.00,
      seller: "WoWGoldKing",
      rating: 5.0,
      sales: 3200,
      delivery: `30 ${t('common.minutes')}`,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 6,
      game: "Fortnite",
      title: "13.500 V-Bucks",
      price: 95.00,
      seller: "FortnitePro",
      rating: 4.7,
      sales: 1680,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1589241062272-c0a000072d9e?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 7,
      game: "Apex Legends",
      title: "20.000 Apex Coins",
      price: 149.99,
      seller: "ApexMaster",
      rating: 4.8,
      sales: 980,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 8,
      game: "Rocket League",
      title: "10.000 Credits",
      price: 79.99,
      seller: "RocketPro",
      rating: 4.9,
      sales: 1450,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 9,
      game: "League of Legends",
      title: "Conta Desafiante - 150+ Skins",
      price: 850.00,
      seller: "EliteAccounts",
      rating: 5.0,
      sales: 420,
      delivery: `1-3 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 10,
      game: "Valorant",
      title: "8.000 VP - Valorant Points",
      price: 75.00,
      seller: "ValorantKing",
      rating: 4.9,
      sales: 1890,
      delivery: t('common.instant'),
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      category: "currency"
    },
    {
      id: 11,
      game: "CS:GO",
      title: "Conta Global Elite - Faceit Level 10",
      price: 650.00,
      seller: "CSGOElite",
      rating: 4.8,
      sales: 340,
      delivery: `2-4 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 12,
      game: "Genshin Impact",
      title: "Conta AR 60 - Todos 5 Estrelas",
      price: 1200.00,
      seller: "GenshinElite",
      rating: 5.0,
      sales: 180,
      delivery: `1-2 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 13,
      game: "Fortnite",
      title: "Conta com Renegade Raider + 200 Skins",
      price: 950.00,
      seller: "FortniteRare",
      rating: 4.9,
      sales: 290,
      delivery: `1-3 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1589241062272-c0a000072d9e?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 14,
      game: "Apex Legends",
      title: "Conta Predador - Todas Heirlooms",
      price: 780.00,
      seller: "ApexPredator",
      rating: 5.0,
      sales: 210,
      delivery: `2-4 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
      category: "account"
    },
    {
      id: 15,
      game: "World of Warcraft",
      title: "Boosting Mythic+ 20 - Todas Dungeons",
      price: 250.00,
      seller: "WoWBooster",
      rating: 4.8,
      sales: 890,
      delivery: `1-2 ${t('common.days')}`,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=300&fit=crop",
      category: "boosting"
    },
    {
      id: 16,
      game: "Rocket League",
      title: "Conta Grand Champion - Todas Temporadas",
      price: 420.00,
      seller: "RLChampion",
      rating: 4.9,
      sales: 310,
      delivery: `1-2 ${t('common.hours')}`,
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop",
      category: "account"
    }
  ];

  const games = [
    "League of Legends",
    "Valorant",
    "CS:GO",
    "Genshin Impact",
    "World of Warcraft",
    "Fortnite",
    "Apex Legends",
    "Rocket League"
  ];

  const categories = [
    { value: "currency", label: t('categories.gameCurrency') },
    { value: "account", label: t('categories.gameAccounts') },
    { value: "boosting", label: t('categories.boosting') },
    { value: "items", label: t('categories.virtualItems') },
    { value: "giftcards", label: t('categories.giftCards') },
    { value: "coaching", label: t('categories.coaching') }
  ];

  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === "all" || product.game.toLowerCase().replace(/\s+/g, '-') === selectedGame;
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesGame && matchesCategory;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background futurista inspirado no G2G.com com imagem de fundo */}
      <div className="fixed inset-0 -z-10">
        {/* Imagem de fundo - Gaming Monitors Setup */}
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
        
        {/* Partículas digitais flutuantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                GameMarket
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Link href="/login">
                <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all">
                  <User className="w-4 h-4 mr-2" />
                  {t('header.login')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToHome')}
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
            {t('marketplace.title')}
          </h1>
          <p className="text-gray-400">{t('marketplace.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-400 backdrop-blur-sm"
              />
            </div>
          </div>

          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white backdrop-blur-sm">
              <SelectValue placeholder={t('marketplace.selectGame')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('marketplace.allGames')}</SelectItem>
              {games.map((game) => (
                <SelectItem key={game} value={game.toLowerCase().replace(/\s+/g, '-')}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-slate-900/50 border-cyan-500/30 text-white backdrop-blur-sm">
              <SelectValue placeholder={t('marketplace.category')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('marketplace.allCategories')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-slate-900/50 border-cyan-500/20 overflow-hidden hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group backdrop-blur-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <Badge className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/50">
                  {product.delivery}
                </Badge>
              </div>
              <div className="p-4">
                <div className="text-sm text-cyan-400 mb-1 font-semibold">{product.game}</div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {formatPrice(product.price, 'USD', currency)}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="text-sm">★</span>
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                  <div className="text-sm text-gray-400">
                    {t('products.by')} <span className="text-cyan-400">{product.seller}</span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 shadow-lg shadow-cyan-500/30">
                    {t('products.buy')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              {language === 'pt-BR' ? 'Nenhum produto encontrado' : 
               language === 'es-ES' ? 'No se encontraron productos' : 
               'No products found'}
            </div>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedGame("all");
                setSelectedCategory("all");
              }}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
            >
              {language === 'pt-BR' ? 'Limpar Filtros' : 
               language === 'es-ES' ? 'Limpiar Filtros' : 
               'Clear Filters'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
