//@ts-check
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const path = require('path');
const fs = require('fs');

// Xử lý đường dẫn động cho file i18n
const appRelativePath = './src/i18n.ts';
const rootRelativePath = './apps/web/src/i18n.ts';
const isAppRoot = fs.existsSync(path.join(process.cwd(), 'src/i18n.ts'));

const withNextIntl = createNextIntlPlugin(isAppRoot ? appRelativePath : rootRelativePath);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  // Fix lỗi resolution của Nx trong Next.js 15+ / Turbopack
  serverExternalPackages: [
    'nx',
    '@nx/key',
    '@nx/powerpack-license',
    '@swc/wasm',
    '@angular-devkit/architect',
    '@angular-devkit/core',
    '@angular-devkit/schematics',
    '@nx/devkit',
    '@nx/react',
    '@nx/next',
  ],
  webpack: (config) => {
    config.resolve.alias['@nx/key'] = false;
    config.resolve.alias['@nx/powerpack-license'] = false;
    return config;
  },
  output: 'standalone',
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);