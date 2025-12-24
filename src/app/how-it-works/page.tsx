"use client";

import Link from "next/link";
import { Shield, ArrowLeft, ShoppingCart, Package, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

export default function HowItWorksPage() {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const buyerSteps = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: t('howItWorks.buyerStep1'),
      description: t('howItWorks.buyerStep1Desc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('howItWorks.buyerStep2'),
      description: t('howItWorks.buyerStep2Desc')
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: t('howItWorks.buyerStep3'),
      description: t('howItWorks.buyerStep3Desc')
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('howItWorks.buyerStep4'),
      description: t('howItWorks.buyerStep4Desc')
    }
  ];

  const sellerSteps = [
    {
      icon: <Package className="w-8 h-8" />,
      title: t('howItWorks.sellerStep1'),
      description: t('howItWorks.sellerStep1Desc')
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: t('howItWorks.sellerStep2'),
      description: t('howItWorks.sellerStep2Desc')
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('howItWorks.sellerStep3'),
      description: t('howItWorks.sellerStep3Desc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('howItWorks.sellerStep4'),
      description: t('howItWorks.sellerStep4Desc')
    }
  ];

  const safetyTips = [
    t('howItWorks.safety1'),
    t('howItWorks.safety2'),
    t('howItWorks.safety3'),
    t('howItWorks.safety4'),
    t('howItWorks.safety5'),
    t('howItWorks.safety6')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                GameMarket
              </span>
            </Link>

            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              {t('common.getStarted')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('common.backToHome')}
        </Link>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('howItWorks.title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {t('howItWorks.titleHighlight')}
            </span>
            {" "}{t('howItWorks.titleEnd')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Tabs for Buyer/Seller */}
        <Tabs defaultValue="buyer" className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="buyer">{t('howItWorks.forBuyers')}</TabsTrigger>
            <TabsTrigger value="seller">{t('howItWorks.forSellers')}</TabsTrigger>
          </TabsList>

          <TabsContent value="buyer">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buyerSteps.map((step, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 p-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 text-white">
                    {step.icon}
                  </div>
                  <div className="absolute top-6 right-6 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seller">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellerSteps.map((step, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 p-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 text-white">
                    {step.icon}
                  </div>
                  <div className="absolute top-6 right-6 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Escrow System */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t('howItWorks.escrowTitle')}</h2>
                <p className="text-gray-400">{t('howItWorks.escrowSubtitle')}</p>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">{t('howItWorks.escrow1Title')}</p>
                  <p>{t('howItWorks.escrow1Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">{t('howItWorks.escrow2Title')}</p>
                  <p>{t('howItWorks.escrow2Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">{t('howItWorks.escrow3Title')}</p>
                  <p>{t('howItWorks.escrow3Desc')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">{t('howItWorks.escrow4Title')}</p>
                  <p>{t('howItWorks.escrow4Desc')}</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Safety Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('howItWorks.safetyTitle')}</h2>
          <Card className="bg-slate-800/50 border-slate-700 p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">{t('howItWorks.safetySubtitle')}</h3>
            </div>
            <ul className="space-y-3">
              {safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('howItWorks.ctaTitle')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {t('howItWorks.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                {t('howItWorks.ctaButton1')}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {t('howItWorks.ctaButton2')}
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
