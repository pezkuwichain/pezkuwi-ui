// Copyright 2017-2026 @pezkuwi/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

import { QrDisplay } from './Display.js';

// Bytes, so that a payload of this size is split into several QR frames.
const MULTI = new Uint8Array(4096).map((_, i) => i % 256);
const SINGLE = new Uint8Array([1, 2, 3, 4]);
const DELAY = 40;

function sleep (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setup () {
  (globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

  const el = document.createElement('div');
  const root = createRoot(el);
  const src = (): string | null => el.querySelector('img')?.getAttribute('src') ?? null;

  return { el, root, src };
}

/** Every distinct image shown while waiting `ms`. */
async function imagesDuring (src: () => string | null, ms: number): Promise<Set<string>> {
  const seen = new Set<string>();

  for (let t = 0; t < ms; t += DELAY / 2) {
    await act(async () => {
      await sleep(DELAY / 2);
    });

    const s = src();

    s && seen.add(s);
  }

  return seen;
}

describe('QrDisplay', (): void => {
  it('shows a single frame and keeps it', async (): Promise<void> => {
    const { root, src } = setup();

    act(() => {
      root.render(
        <QrDisplay
          timerDelay={DELAY}
          value={SINGLE}
        />
      );
    });

    expect({ image: src()?.startsWith('data:image/'), test: 'single' }).toEqual({ image: true, test: 'single' });
    expect({ frames: (await imagesDuring(src, DELAY * 4)).size, test: 'single' }).toEqual({ frames: 1, test: 'single' });

    act(() => {
      root.unmount();
    });
  });

  it('cycles through the frames of a multi-frame payload', async (): Promise<void> => {
    const { root, src } = setup();

    act(() => {
      root.render(
        <QrDisplay
          skipEncoding={false}
          timerDelay={DELAY}
          value={MULTI}
        />
      );
    });

    expect({ cycles: (await imagesDuring(src, DELAY * 6)).size > 1, test: 'multi' }).toEqual({ cycles: true, test: 'multi' });

    act(() => {
      root.unmount();
    });
  });

  it('starts cycling when a single-frame value becomes a multi-frame one', async (): Promise<void> => {
    const { root, src } = setup();

    act(() => {
      root.render(
        <QrDisplay
          timerDelay={DELAY}
          value={SINGLE}
        />
      );
    });
    await imagesDuring(src, DELAY * 3);
    act(() => {
      root.render(
        <QrDisplay
          timerDelay={DELAY}
          value={MULTI}
        />
      );
    });

    expect({ cycles: (await imagesDuring(src, DELAY * 6)).size > 1, test: 'single-to-multi' }).toEqual({ cycles: true, test: 'single-to-multi' });

    act(() => {
      root.unmount();
    });
  });

  it('stops its timer on unmount', async (): Promise<void> => {
    const { el, root } = setup();

    act(() => {
      root.render(
        <QrDisplay
          timerDelay={DELAY}
          value={MULTI}
        />
      );
    });
    act(() => {
      root.unmount();
    });
    // a timer left running would render into the unmounted root and throw
    await sleep(DELAY * 3);

    expect(el.querySelector('img')).toEqual(null);
  });
});
