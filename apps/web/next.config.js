//@ts-check
const { composePlugins, withNx } = require('@nx/next');
const createNextIntlPlugin = require('next-intl/plugin');

const path = require('path');
const fs = require('fs');

// Handle dynamic path resolution for Nx graph (root) vs Next build (app dir)
const appRelativePath = './src/i18n.ts';
const rootRelativePath = './apps/web/src/i18n.ts';
const isAppRoot = fs.existsSync(path.join(process.cwd(), 'src/i18n.ts'));

const withNextIntl = createNextIntlPlugin(isAppRoot ? appRelativePath : rootRelativePath);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  // Fix for Nx internal resolution issues in Next.js 15+ / Turbopack
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
    config.resolve.alias = {
      ...config.resolve.alias,
      '@nx/key': false, // Bỏ qua module này
    };
    return config;
  },
};

module.exports = composePlugins(withNx, withNextIntl)(nextConfig);
