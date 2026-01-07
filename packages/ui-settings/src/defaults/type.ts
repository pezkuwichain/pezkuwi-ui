// Copyright 2017-2025 @pezkuwi/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

// matches https://pezkuwichain.io & https://*.pezkuwichain.io
export const isPezkuwi = typeof window !== 'undefined' && window.location.host.includes('pezkuwi');

// Backward compatibility alias
export const isPolkadot = isPezkuwi;
