// Copyright 2017-2026 @pezkuwi/react-qr authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useMemo, useState } from 'react';

import { xxhashAsHex } from '@pezkuwi/util-crypto';

import { qrcode } from './qrcode.js';
import { styled } from './styled.js';
import { createFrames, createImgSize } from './util.js';

interface Props {
  className?: string | undefined;
  size?: string | number | undefined;
  skipEncoding?: boolean;
  style?: React.CSSProperties | undefined;
  timerDelay?: number | undefined;
  value: Uint8Array;
}

interface Shown {
  frameIdx: number;
  frames: Uint8Array[];
  skipEncoding: boolean;
  valueHash: string;
}

const DEFAULT_FRAME_DELAY = 2750;
const TIMER_INC = 500;

function getDataUrl (value: Uint8Array): string {
  const qr = qrcode(0, 'M');

  // HACK See our qrcode stringToBytes override as used internally. This
  // will only work for the case where we actually pass `Bytes` in here
  qr.addData(value as unknown as string, 'Byte');
  qr.make();

  return qr.createDataURL(16, 0);
}

function encode (value: Uint8Array, skipEncoding: boolean, valueHash: string): Shown {
  return {
    frameIdx: 0,
    frames: skipEncoding
      ? [value]
      : createFrames(value),
    skipEncoding,
    valueHash
  };
}

function Display ({ className = '', size, skipEncoding = false, style = {}, timerDelay = DEFAULT_FRAME_DELAY, value }: Props): React.ReactElement<Props> | null {
  // The frames follow the content of value (by hash), not the identity of the
  // array, so a new array with the same bytes does not restart the display.
  const valueHash = useMemo(() => xxhashAsHex(value), [value]);
  const [shown, setShown] = useState<Shown>(() => encode(value, skipEncoding, valueHash));

  // A new value (or encoding) starts again at its first frame. Adjusting state
  // while rendering, as React documents for state that follows props, rather
  // than in an effect, which renders the stale frame once more first.
  if (shown.valueHash !== valueHash || shown.skipEncoding !== skipEncoding) {
    setShown(encode(value, skipEncoding, valueHash));
  }

  const containerStyle = useMemo(
    () => createImgSize(size),
    [size]
  );

  // Frames are encoded on demand, not up front: for a large payload that
  // keeps the first frame quick.
  const image = useMemo(
    () => getDataUrl(shown.frames[shown.frameIdx]),
    [shown]
  );

  // Step through the frames of the current value. Each full cycle slows the
  // display a little. A single frame needs no timer; a new set of frames gets
  // a new one, so the display animates whenever the value has several frames.
  useEffect((): (() => void) | undefined => {
    const frames = shown.frames;

    if (frames.length <= 1) {
      return undefined;
    }

    let frameIdx = 0;
    let delay = timerDelay;
    let timerId: ReturnType<typeof setTimeout>;

    const nextFrame = (): void => {
      frameIdx = frameIdx + 1;

      if (frameIdx === frames.length) {
        frameIdx = 0;
        delay = delay + TIMER_INC;
      }

      setShown((state) =>
        state.frames === frames
          ? { ...state, frameIdx }
          : state
      );
      timerId = setTimeout(nextFrame, delay);
    };

    timerId = setTimeout(nextFrame, delay);

    return (): void => {
      clearTimeout(timerId);
    };
  }, [shown.frames, timerDelay]);

  if (!image) {
    return null;
  }

  return (
    <StyledDiv
      className={className}
      style={containerStyle}
    >
      <div
        className='ui--qr-Display'
        style={style}
      >
        <img src={image} />
      </div>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  .ui--qr-Display {
    height: 100%;
    width: 100%;

    img,
    svg {
      background: white;
      height: auto !important;
      max-height: 100%;
      max-width: 100%;
      width: auto !important;
    }
  }
`;

export const QrDisplay = React.memo(Display);
