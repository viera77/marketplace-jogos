"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, MessageCircle, Mail, Phone, Clock, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const faqs = [
    {
      question: t('support.faq1Q'),
      answer: t('support.faq1A')
    },
    {
      question: t('support.faq2Q'),
      answer: t('support.faq2A')
    },
    {
      question: t('support.faq3Q'),
      answer: t('support.faq3A')
    },
    {
      question: t('support.faq4Q'),
      answer: t('support.faq4A')
    },
    {
      question: t('support.faq5Q'),
      answer: t('support.faq5A')
    },
    {
      question: t('support.faq6Q'),
      answer: t('support.faq6A')
    },
    {
      question: t('support.faq7Q'),
      answer: t('support.faq7A')
    },
    {
      question: t('support.faq8Q'),
      answer: t('support.faq8A')
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: t('support.liveChat'),
      description: t('support.liveChatDesc'),
      action: t('support.liveChatAction'),
      available: t('support.liveChatAvailable')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('support.email'),
      description: t('support.emailDesc'),
      action: t('support.emailAction'),
      available: t('support.emailAvailable')
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('support.phone'),
      description: t('support.phoneDesc'),
      action: t('support.phoneAction'),
      available: t('support.phoneAvailable')
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
              {t('common.contactSupport')}
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
            {t('support.title')}{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {t('support.titleHighlight')}
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            {t('support.subtitle')}
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('support.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('support.contactUs')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 text-white">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-4">{method.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{method.available}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                  {method.action}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('support.faqTitle')}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700 p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">{t('support.formTitle')}</h2>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">{t('support.formName')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('support.formNamePlaceholder')}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">{t('support.formEmail')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('support.formEmailPlaceholder')}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-white">{t('support.formSubject')}</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder={t('support.formSubjectPlaceholder')}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">{t('support.formMessage')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('support.formMessagePlaceholder')}
                  rows={6}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                {t('support.formSubmit')}
              </Button>
            </form>
          </Card>
        </section>
      </div>
    </div>
  );
}
