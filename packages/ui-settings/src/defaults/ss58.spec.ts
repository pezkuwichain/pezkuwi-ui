// Copyright 2017-2026 @pezkuwi/ui-settings authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { PREFIXES, prefixOptions } from './ss58.js';

describe('ss58 prefix options', (): void => {
  it('gives each prefix one option, naming every network that uses it', (): void => {
    expect(prefixOptions([
      { displayName: 'Pezkuwi Relay Chain', network: 'pezkuwi', prefix: 42 },
      { displayName: 'Zagros Relay Chain', network: 'zagros', prefix: 42 },
      { displayName: 'Other', network: 'other', prefix: 7 },
      { displayName: 'Bizinikiwi', network: 'bizinikiwi', prefix: 42 }
    ])).toEqual([
      { info: 'pezkuwi', text: 'Pezkuwi Relay Chain / Zagros Relay Chain / Bizinikiwi', value: 42 },
      { info: 'other', text: 'Other', value: 7 }
    ]);
  });

  it('has no two options with the same value', (): void => {
    const values = PREFIXES.map(({ value }) => value);

    expect(new Set(values).size).toEqual(values.length);
  });
});
