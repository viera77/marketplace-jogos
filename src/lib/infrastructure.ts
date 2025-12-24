// 🌐 Sistema de Hospedagem e Infraestrutura Global

export interface CDNConfig {
  provider: string;
  regions: string[];
  features: string[];
  pricing: string;
}

export interface HostingConfig {
  provider: string;
  type: 'serverless' | 'container' | 'vm';
  regions: string[];
  autoScaling: boolean;
  features: string[];
}

// 🌍 Configurações de CDN (Content Delivery Network)
export const CDN_PROVIDERS: CDNConfig[] = [
  {
    provider: 'Cloudflare',
    regions: ['Global', '200+ cidades'],
    features: [
      'Cache automático',
      'DDoS protection',
      'SSL/TLS gratuito',
      'Web Application Firewall',
      'Bot protection',
      'Image optimization',
      'Workers (edge computing)'
    ],
    pricing: 'Gratuito até 100k requests/dia'
  },
  
  {
    provider: 'AWS CloudFront',
    regions: ['Global', '400+ pontos de presença'],
    features: [
      'Integração com AWS',
      'Lambda@Edge',
      'Shield DDoS protection',
      'Real-time logs',
      'Custom SSL certificates',
      'Geo-restriction'
    ],
    pricing: 'Pay-as-you-go'
  },
  
  {
    provider: 'Vercel Edge Network',
    regions: ['Global', '70+ regiões'],
    features: [
      'Otimizado para Next.js',
      'Deploy automático',
      'Preview deployments',
      'Edge Functions',
      'Image optimization',
      'Analytics integrado'
    ],
    pricing: 'Gratuito para hobby, Pro a partir de $20/mês'
  }
];

// 🖥️ Configurações de Hospedagem
export const HOSTING_PROVIDERS: HostingConfig[] = [
  {
    provider: 'Vercel',
    type: 'serverless',
    regions: ['Global', 'Edge Network'],
    autoScaling: true,
    features: [
      'Deploy automático via Git',
      'Preview URLs',
      'Serverless Functions',
      'Edge Functions',
      'Analytics',
      'Otimizado para Next.js',
      'Zero config',
      'HTTPS automático'
    ]
  },
  
  {
    provider: 'AWS (Elastic Beanstalk + Lambda)',
    type: 'serverless',
    regions: ['33 regiões globais'],
    autoScaling: true,
    features: [
      'Alta disponibilidade',
      'Auto-scaling',
      'Load balancing',
      'RDS para banco de dados',
      'S3 para storage',
      'CloudWatch monitoring',
      'Multi-region deployment'
    ]
  },
  
  {
    provider: 'Google Cloud Platform',
    type: 'serverless',
    regions: ['35 regiões globais'],
    autoScaling: true,
    features: [
      'Cloud Run (containers)',
      'Cloud Functions',
      'Firebase Hosting',
      'Cloud SQL',
      'Cloud Storage',
      'Global load balancing',
      'Stackdriver monitoring'
    ]
  },
  
  {
    provider: 'Railway',
    type: 'container',
    regions: ['US, EU, Asia'],
    autoScaling: true,
    features: [
      'Deploy via Git',
      'Databases incluídos',
      'Preview environments',
      'Logs em tempo real',
      'Metrics dashboard',
      'Fácil configuração'
    ]
  }
];

// 🗄️ Banco de Dados Global
export interface DatabaseConfig {
  provider: string;
  type: 'sql' | 'nosql' | 'graph';
  regions: string[];
  features: string[];
  replication: boolean;
}

export const DATABASE_PROVIDERS: DatabaseConfig[] = [
  {
    provider: 'Supabase',
    type: 'sql',
    regions: ['Global', 'Multi-region'],
    features: [
      'PostgreSQL',
      'Real-time subscriptions',
      'Auth integrado',
      'Storage de arquivos',
      'Edge Functions',
      'RESTful API automática',
      'Row Level Security'
    ],
    replication: true
  },
  
  {
    provider: 'PlanetScale',
    type: 'sql',
    regions: ['Global', 'Multi-region'],
    features: [
      'MySQL compatível',
      'Branching (como Git)',
      'Auto-scaling',
      'Zero downtime migrations',
      'Query insights',
      'Connection pooling'
    ],
    replication: true
  },
  
  {
    provider: 'MongoDB Atlas',
    type: 'nosql',
    regions: ['100+ regiões AWS/GCP/Azure'],
    features: [
      'Document database',
      'Auto-scaling',
      'Multi-region clusters',
      'Full-text search',
      'Time series',
      'Charts e analytics'
    ],
    replication: true
  },
  
  {
    provider: 'AWS RDS',
    type: 'sql',
    regions: ['33 regiões globais'],
    features: [
      'PostgreSQL, MySQL, MariaDB',
      'Automated backups',
      'Multi-AZ deployment',
      'Read replicas',
      'Performance Insights',
      'Encryption at rest'
    ],
    replication: true
  }
];

// 📊 Monitoramento e Analytics
export interface MonitoringConfig {
  provider: string;
  features: string[];
  realTime: boolean;
}

export const MONITORING_PROVIDERS: MonitoringConfig[] = [
  {
    provider: 'Vercel Analytics',
    features: [
      'Web Vitals',
      'Real User Monitoring',
      'Performance insights',
      'Audience analytics',
      'Privacy-friendly'
    ],
    realTime: true
  },
  
  {
    provider: 'Google Analytics 4',
    features: [
      'User behavior tracking',
      'Conversion tracking',
      'Custom events',
      'Audience segmentation',
      'Predictive metrics'
    ],
    realTime: true
  },
  
  {
    provider: 'Sentry',
    features: [
      'Error tracking',
      'Performance monitoring',
      'Release tracking',
      'User feedback',
      'Source maps'
    ],
    realTime: true
  },
  
  {
    provider: 'LogRocket',
    features: [
      'Session replay',
      'Error tracking',
      'Performance monitoring',
      'User analytics',
      'Console logs'
    ],
    realTime: true
  }
];

// 🔐 Segurança e Proteção
export interface SecurityConfig {
  feature: string;
  provider: string;
  description: string;
}

export const SECURITY_FEATURES: SecurityConfig[] = [
  {
    feature: 'DDoS Protection',
    provider: 'Cloudflare',
    description: 'Proteção contra ataques distribuídos de negação de serviço'
  },
  {
    feature: 'Web Application Firewall (WAF)',
    provider: 'Cloudflare / AWS WAF',
    description: 'Filtragem de tráfego malicioso e proteção contra vulnerabilidades'
  },
  {
    feature: 'SSL/TLS Certificates',
    provider: 'Let\'s Encrypt / Cloudflare',
    description: 'Criptografia HTTPS automática e gratuita'
  },
  {
    feature: 'Rate Limiting',
    provider: 'Cloudflare / Vercel',
    description: 'Limita requisições para prevenir abuso'
  },
  {
    feature: 'Bot Protection',
    provider: 'Cloudflare Turnstile',
    description: 'Proteção contra bots sem CAPTCHA intrusivo'
  },
  {
    feature: 'Data Encryption',
    provider: 'AWS KMS / Supabase',
    description: 'Criptografia de dados em repouso e em trânsito'
  }
];

// 🌐 Estratégia de Deploy Multi-Região
export interface DeploymentStrategy {
  region: string;
  primaryDatacenter: string;
  backupDatacenters: string[];
  latency: string;
  coverage: string[];
}

export const DEPLOYMENT_REGIONS: DeploymentStrategy[] = [
  {
    region: 'Americas',
    primaryDatacenter: 'US East (Virginia)',
    backupDatacenters: ['US West (Oregon)', 'São Paulo'],
    latency: '< 50ms',
    coverage: ['North America', 'South America']
  },
  {
    region: 'Europe',
    primaryDatacenter: 'EU West (Ireland)',
    backupDatacenters: ['EU Central (Frankfurt)', 'London'],
    latency: '< 30ms',
    coverage: ['Western Europe', 'Eastern Europe', 'Middle East']
  },
  {
    region: 'Asia Pacific',
    primaryDatacenter: 'AP Southeast (Singapore)',
    backupDatacenters: ['Tokyo', 'Sydney'],
    latency: '< 40ms',
    coverage: ['Southeast Asia', 'East Asia', 'Oceania']
  }
];

// 📈 Escalabilidade Automática
export interface AutoScalingConfig {
  metric: string;
  threshold: number;
  action: string;
  cooldown: number; // segundos
}

export const AUTO_SCALING_RULES: AutoScalingConfig[] = [
  {
    metric: 'CPU Usage',
    threshold: 70,
    action: 'Scale up (adicionar instâncias)',
    cooldown: 300
  },
  {
    metric: 'Memory Usage',
    threshold: 80,
    action: 'Scale up (adicionar instâncias)',
    cooldown: 300
  },
  {
    metric: 'Request Count',
    threshold: 1000,
    action: 'Scale up (adicionar instâncias)',
    cooldown: 180
  },
  {
    metric: 'Response Time',
    threshold: 500,
    action: 'Scale up (adicionar instâncias)',
    cooldown: 300
  }
];

// 💾 Backup e Disaster Recovery
export interface BackupStrategy {
  frequency: string;
  retention: string;
  location: string;
  automated: boolean;
}

export const BACKUP_STRATEGY: BackupStrategy = {
  frequency: 'Diário (automated snapshots)',
  retention: '30 dias (rolling)',
  location: 'Multi-region (3+ localizações)',
  automated: true
};

// 🚀 Recomendação de Stack Completo
export const RECOMMENDED_STACK = {
  frontend: {
    framework: 'Next.js 15',
    hosting: 'Vercel',
    cdn: 'Vercel Edge Network / Cloudflare'
  },
  backend: {
    api: 'Next.js API Routes / Serverless Functions',
    database: 'Supabase (PostgreSQL)',
    storage: 'Supabase Storage / AWS S3'
  },
  payments: {
    primary: 'Stripe',
    alternatives: ['PayPal', 'Mercado Pago (LATAM)', 'Alipay (Asia)']
  },
  monitoring: {
    analytics: 'Vercel Analytics + Google Analytics 4',
    errors: 'Sentry',
    performance: 'Vercel Speed Insights'
  },
  security: {
    ddos: 'Cloudflare',
    waf: 'Cloudflare WAF',
    ssl: 'Automatic (Vercel/Cloudflare)',
    auth: 'Supabase Auth'
  }
};
