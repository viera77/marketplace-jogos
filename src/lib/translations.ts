type Language = "pt" | "en" | "es";

const translations = {
  pt: {
    header: {
      marketplace: "Marketplace",
      sell: "Vender",
      howItWorks: "Como Funciona",
      support: "Suporte",
      login: "Entrar",
      register: "Cadastrar",
    },
    hero: {
      title: "Compre e Venda",
      titleHighlight: "Itens de Jogos",
      subtitle: "O marketplace mais seguro para transações de itens virtuais",
      searchPlaceholder: "Buscar jogos, moedas, contas...",
      searchButton: "Buscar",
    },
    stats: {
      activeProducts: "Produtos Ativos",
      sellers: "Vendedores",
      transactions: "Transações",
      rating: "Avaliação",
    },
    features: {
      securePayment: "Pagamento Seguro",
      securePaymentDesc: "Sistema de pagamento protegido com garantia de reembolso",
      fastDelivery: "Entrega Rápida",
      fastDeliveryDesc: "Receba seus itens em minutos após a compra",
      verifiedSellers: "Vendedores Verificados",
      verifiedSellersDesc: "Todos os vendedores são verificados e avaliados",
    },
    categories: {
      title: "Categorias Populares",
      gameCurrency: "Moedas de Jogo",
      gameAccounts: "Contas de Jogo",
      boosting: "Boosting/Rank",
      virtualItems: "Itens Virtuais",
      giftCards: "Gift Cards",
      coaching: "Coaching",
      offers: "ofertas",
    },
    games: {
      topGames: "Jogos em Alta",
    },
    cta: {
      title: "Pronto para começar?",
      subtitle: "Junte-se a milhares de jogadores que já confiam no GameMarket",
      createAccount: "Criar Conta Grátis",
      learnMore: "Saiba Mais",
    },
    footer: {
      description: "O marketplace mais seguro para compra e venda de itens virtuais",
      marketplace: "Marketplace",
      allGames: "Todos os Jogos",
      categories: "Categorias",
      topSellers: "Top Vendedores",
      deals: "Ofertas",
      support: "Suporte",
      helpCenter: "Central de Ajuda",
      howToBuy: "Como Comprar",
      howToSell: "Como Vender",
      contact: "Contato",
      legal: "Legal",
      terms: "Termos de Uso",
      privacy: "Política de Privacidade",
      riskNotice: "Aviso de Risco",
      gdpr: "GDPR",
      copyright: "© 2024 GameMarket. Todos os direitos reservados.",
      warning: "Aviso: A compra e venda de itens virtuais pode violar os termos de serviço de alguns jogos.",
    },
  },
  en: {
    header: {
      marketplace: "Marketplace",
      sell: "Sell",
      howItWorks: "How It Works",
      support: "Support",
      login: "Login",
      register: "Sign Up",
    },
    hero: {
      title: "Buy and Sell",
      titleHighlight: "Game Items",
      subtitle: "The safest marketplace for virtual items transactions",
      searchPlaceholder: "Search games, currency, accounts...",
      searchButton: "Search",
    },
    stats: {
      activeProducts: "Active Products",
      sellers: "Sellers",
      transactions: "Transactions",
      rating: "Rating",
    },
    features: {
      securePayment: "Secure Payment",
      securePaymentDesc: "Protected payment system with refund guarantee",
      fastDelivery: "Fast Delivery",
      fastDeliveryDesc: "Receive your items within minutes after purchase",
      verifiedSellers: "Verified Sellers",
      verifiedSellersDesc: "All sellers are verified and rated",
    },
    categories: {
      title: "Popular Categories",
      gameCurrency: "Game Currency",
      gameAccounts: "Game Accounts",
      boosting: "Boosting/Rank",
      virtualItems: "Virtual Items",
      giftCards: "Gift Cards",
      coaching: "Coaching",
      offers: "offers",
    },
    games: {
      topGames: "Trending Games",
    },
    cta: {
      title: "Ready to start?",
      subtitle: "Join thousands of gamers who already trust GameMarket",
      createAccount: "Create Free Account",
      learnMore: "Learn More",
    },
    footer: {
      description: "The safest marketplace for buying and selling virtual items",
      marketplace: "Marketplace",
      allGames: "All Games",
      categories: "Categories",
      topSellers: "Top Sellers",
      deals: "Deals",
      support: "Support",
      helpCenter: "Help Center",
      howToBuy: "How to Buy",
      howToSell: "How to Sell",
      contact: "Contact",
      legal: "Legal",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      riskNotice: "Risk Notice",
      gdpr: "GDPR",
      copyright: "© 2024 GameMarket. All rights reserved.",
      warning: "Warning: Buying and selling virtual items may violate some games' terms of service.",
    },
  },
  es: {
    header: {
      marketplace: "Mercado",
      sell: "Vender",
      howItWorks: "Cómo Funciona",
      support: "Soporte",
      login: "Iniciar Sesión",
      register: "Registrarse",
    },
    hero: {
      title: "Compra y Vende",
      titleHighlight: "Artículos de Juegos",
      subtitle: "El mercado más seguro para transacciones de artículos virtuales",
      searchPlaceholder: "Buscar juegos, monedas, cuentas...",
      searchButton: "Buscar",
    },
    stats: {
      activeProducts: "Productos Activos",
      sellers: "Vendedores",
      transactions: "Transacciones",
      rating: "Calificación",
    },
    features: {
      securePayment: "Pago Seguro",
      securePaymentDesc: "Sistema de pago protegido con garantía de reembolso",
      fastDelivery: "Entrega Rápida",
      fastDeliveryDesc: "Recibe tus artículos en minutos después de la compra",
      verifiedSellers: "Vendedores Verificados",
      verifiedSellersDesc: "Todos los vendedores están verificados y calificados",
    },
    categories: {
      title: "Categorías Populares",
      gameCurrency: "Moneda de Juego",
      gameAccounts: "Cuentas de Juego",
      boosting: "Boosting/Rango",
      virtualItems: "Artículos Virtuales",
      giftCards: "Tarjetas de Regalo",
      coaching: "Coaching",
      offers: "ofertas",
    },
    games: {
      topGames: "Juegos Populares",
    },
    cta: {
      title: "¿Listo para comenzar?",
      subtitle: "Únete a miles de jugadores que ya confían en GameMarket",
      createAccount: "Crear Cuenta Gratis",
      learnMore: "Saber Más",
    },
    footer: {
      description: "El mercado más seguro para comprar y vender artículos virtuales",
      marketplace: "Mercado",
      allGames: "Todos los Juegos",
      categories: "Categorías",
      topSellers: "Mejores Vendedores",
      deals: "Ofertas",
      support: "Soporte",
      helpCenter: "Centro de Ayuda",
      howToBuy: "Cómo Comprar",
      howToSell: "Cómo Vender",
      contact: "Contacto",
      legal: "Legal",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      riskNotice: "Aviso de Riesgo",
      gdpr: "GDPR",
      copyright: "© 2024 GameMarket. Todos los derechos reservados.",
      warning: "Advertencia: La compra y venta de artículos virtuales puede violar los términos de servicio de algunos juegos.",
    },
  },
};

export function useTranslation(language: Language) {
  return {
    t: (key: string) => {
      const keys = key.split(".");
      let value: any = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    },
  };
}
