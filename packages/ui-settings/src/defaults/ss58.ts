// Copyright 2017-2026 @pezkuwi/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Network } from '@pezkuwi/networks/types';
import type { Option } from '../types.js';

import { availableNetworks } from '@pezkuwi/networks';

export const PREFIX_DEFAULT = -1;

const defaultNetwork: Option = {
  info: 'default',
  text: 'Default for the connected node',
  value: -1
};

/**
 * One option per address format. The value of an option is the ss58 prefix,
 * so networks that share a prefix (Pezkuwi, Zagros and Bizinikiwi all use 42)
 * are the same choice; they are listed together in its text instead of
 * appearing as separate options with the same value.
 */
export function prefixOptions (networks: Pick<Network, 'displayName' | 'network' | 'prefix'>[]): Option[] {
  const byPrefix = new Map<number, Option>();

  for (const { displayName, network, prefix } of networks) {
    const existing = byPrefix.get(prefix);

    if (existing) {
      existing.text = `${existing.text} / ${displayName}`;
    } else {
      byPrefix.set(prefix, { info: network, text: displayName, value: prefix });
    }
  }

  return [...byPrefix.values()];
}

export const PREFIXES: Option[] = [defaultNetwork, ...prefixOptions(availableNetworks)];
