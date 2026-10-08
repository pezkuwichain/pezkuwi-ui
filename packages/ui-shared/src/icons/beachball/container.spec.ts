// Copyright 2017-2026 @pezkuwi/ui-shared authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@pezkuwi/dev-test/globals.d.ts" />

import { container } from './container.js';

describe('container', (): void => {
  // Read through the public CSSStyleDeclaration accessors; the private _values
  // store these tests used to read is laid out differently by each cssstyle release.
  const styles = ({ style }: HTMLElement) => ({
    background: style.background,
    borderRadius: style.borderRadius,
    display: style.display,
    height: style.height,
    margin: style.margin,
    overflow: style.overflow,
    padding: style.padding,
    width: style.width
  });

  it('applies default styles', (): void => {
    expect(styles(container(100))).toEqual({
      background: 'white',
      borderRadius: '50px',
      display: 'inline-block',
      height: '100px',
      margin: '0px',
      overflow: 'hidden',
      padding: '0px',
      width: '100px'
    });
  });

  it('overrides with supplied styles', (): void => {
    expect(styles(container(50, 'black', '', { display: 'block' }))).toEqual({
      background: 'black',
      borderRadius: '25px',
      display: 'block',
      height: '50px',
      margin: '0px',
      overflow: 'hidden',
      padding: '0px',
      width: '50px'
    });
  });

  it('applies the specified className', (): void => {
    expect(
      container(100, 'blue', 'testClass').className
    ).toEqual('testClass');
  });
});
