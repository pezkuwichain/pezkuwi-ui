// Copyright 2017-2025 @pezkuwi/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringSectionOption } from './types.js';

import { isUndefined } from '@pezkuwi/util';

export function createOptionItem (address: string, _name?: string): KeyringSectionOption {
  const name = isUndefined(_name)
    ? (
      (address.length > 15)
        ? `${address.slice(0, 6)}…${address.slice(-6)}`
        : address
    )
    : _name;

  return {
    key: address,
    name,
    value: address
  };
}
