// Copyright 2018-2025 @pezkuwi/react-identicon authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Originally from: https://github.com/paritytech/oo7/tree/master/packages/polkadot-identicon
// Copyright 2018 Paritytech - Adapted for PezkuwiChain ecosystem

import type { Circle } from '@pezkuwi/ui-shared/icons/types';
import type { Props } from '../types.js';

import React, { useMemo } from 'react';

import { pezkuwiIcon } from '@pezkuwi/ui-shared';

function renderCircle ({ cx, cy, fill, r }: Circle, key: number): React.ReactNode {
  return (
    <circle
      cx={cx}
      cy={cy}
      fill={fill}
      key={key}
      r={r}
    />
  );
}

function Identicon ({ address, className = '', isAlternative = false, size, style = {} }: Props): React.ReactElement<Props> {
  const circles = useMemo(
    () => pezkuwiIcon(address, { isAlternative }),
    [address, isAlternative]
  );

  return (
    <svg
      className={className}
      height={size}
      id={address}
      name={address}
      style={style}
      viewBox='0 0 64 64'
      width={size}
    >
      {circles.map(renderCircle)}
    </svg>
  );
}

export const Pezkuwi = React.memo(Identicon);
