// @ts-check

const config = {
  title: 'SigmaGrid',
  tagline: 'Institutional fundamentals for 24/7 synthetic-equity perpetuals',
  url: 'https://sigmagrid.app',
  baseUrl: '/',
  favicon: 'img/logo-mark.svg',
  organizationName: 'sigmagrid', // adjust if needed
  projectName: 'sigmagrid-docs',

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: false
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'SigmaGrid',
        logo: {
          alt: 'SigmaGrid Logo',
          src: 'img/logo-mark.svg',
        },
        items: [
          { to: '/docs/intro', label: 'Docs', position: 'left' },
          { to: '/docs/api-reference', label: 'API Reference', position: 'left' },
          { to: '/docs/pricing', label: 'Pricing', position: 'left' },
          {
            href: 'https://sigmagrid.app',
            label: 'Main Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              { label: 'Overview', to: '/docs/intro' },
              { label: 'API Reference', to: '/docs/api-reference' }
            ],
          },
          {
            title: 'Developers',
            items: [
              { label: 'Quickstart', to: '/docs/intro' },
              { label: 'Fields', to: '/docs/fields' },
              { label: 'For Agents', to: '/docs/agents' }
            ],
          },
          {
            title: 'Meta',
            items: [
              { label: 'llms.txt', href: 'pathname:///llms.txt' },
              { label: 'mcp.json', href: 'pathname:///mcp.json' },
              { label: 'OpenAPI', href: 'pathname:///openapi.json' },
              { label: 'AI Plugin', href: 'pathname:///.well-known/ai-plugin.json' }
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} SigmaGrid. All rights reserved.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.dracula,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['json']
      },
      metadata: [
        {
          name: 'description',
          content:
            'Traditional equity markets close at 4pm. Crypto synthetic equity perps trade 24/7. Get institutional-grade fair value when Bloomberg terminals go dark. Trusted by AI trading bots, market makers, and crypto hedge funds.'
        },
        { name: 'og:title', content: 'SigmaGrid — Institutional Fair Value for Crypto Perpetual Markets' },
        { name: 'og:image', content: 'img/social-card.svg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'img/social-card.svg' },
      ],
    }),
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebAPI',
        name: 'SigmaGrid',
        description: 'Institutional fair value for crypto perpetual markets. Traditional equity markets close at 4pm. Crypto synthetic equity perps trade 24/7. Get institutional-grade fair value when Bloomberg terminals go dark.',
        url: 'https://sigmagrid.app',
        documentation: 'https://sigmagrid.app/docs',
        provider: {
          '@type': 'Organization',
          name: 'SigmaGrid',
          url: 'https://sigmagrid.app'
        },
        apiVersion: '0.1.0',
        serviceType: 'REST API',
        areaServed: 'Worldwide',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: 'https://api.sigmagrid.app',
          availableLanguage: 'en'
        }
      })
    }
  ],
};

module.exports = config;

