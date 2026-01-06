// Copyright 2017-2025 @pezkuwi/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@pezkuwi/dev/config/rollup';

const pkgs = [
  '@pezkuwi/react-identicon',
  '@pezkuwi/react-qr',
  '@pezkuwi/ui-keyring',
  '@pezkuwi/ui-settings',
  '@pezkuwi/vue-identicon'
];

const external = [
  ...pkgs,
  '@pezkuwi/hw-ledger',
  '@pezkuwi/keyring',
  '@pezkuwi/util',
  '@pezkuwi/util-crypto',
  'react',
  'react-dom',
  'vue',
  'vue-router'
];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  vue: 'Vue',
  'vue-router': 'VueRouter'
};

const entries = ['ui-shared'].reduce((all, p) => ({
  ...all,
  [`@pezkuwi/${p}`]: path.resolve(process.cwd(), `packages/${p}/build`)
}), {
  // re-exported in @pezkuwi/util-crypto, map directly
  '@pezkuwi/networks': '@pezkuwi/util-crypto'
});

const overrides = {};

export default pkgs.map((pkg) => {
  const override = (overrides[pkg] || {});

  return createBundle({
    external,
    globals,
    pkg,
    ...override,
    entries: {
      ...entries,
      ...(override.entries || {})
    }
  });
});
