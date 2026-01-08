// Copyright 2017-2025 @pezkuwi/vue-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VNode } from 'vue';

import { defineComponent, h } from 'vue';

import { pezkuwiIcon } from '@pezkuwi/ui-shared';

import { adaptVNodeAttrs } from '../util.js';

interface propsType {
  address: string;
  isAlternative: boolean;
  size: number;
}

/**
 * @name Pezkuwi
 * @description The Pezkuwi default identicon
 */
export const Pezkuwi = defineComponent({
  props: ['address', 'isAlternative', 'size'],
  render (): VNode {
    const { address, isAlternative, size } = this.$props as propsType;
    const circles = pezkuwiIcon(address, { isAlternative }).map(({ cx, cy, fill, r }) =>
      h('circle', { ...adaptVNodeAttrs({ cx, cy, fill, r }) }, [])
    );

    return h('svg', {
      ...adaptVNodeAttrs({
        height: size,
        viewBox: '0 0 64 64',
        width: size
      })
    }, circles);
  }
});
