# @pezkuwi/ui

Basic browser and framework agnostic UI components for creating apps using the PezkuwiChain libraries.

**Developed by Dijital Kurdistan Tech Institute**

## Overview

This package provides UI components for building applications on PezkuwiChain.

## Packages

### UI Components

- [react-identicon](packages/react-identicon/) - React identity icon generator with address as input
- [reactnative-identicon](packages/reactnative-identicon/) - React Native identity icon generator with address as input
- [vue-identicon](packages/vue-identicon/) - Vue identity icon generator with address as input
- [react-qr](packages/react-qr/) - QR code generator/reader for PezkuwiChain

### Shared Libraries

- [ui-keyring](packages/ui-keyring/) - A browser-specific wrapper around [@pezkuwi/keyring](https://github.com/pezkuwichain/pezkuwi-common/)
- [ui-settings](packages/ui-settings/) - A browser local storage wrapper for app settings
- [ui-shared](packages/ui-shared/) - Shared logic used across UI components (e.g., icon generation)

## Installation

```bash
# Using npm
npm install @pezkuwi/react-identicon

# Using yarn
yarn add @pezkuwi/react-identicon
```

## Usage

```javascript
import Identicon from '@pezkuwi/react-identicon';

function App() {
  return (
    <Identicon
      value="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
      size={64}
      theme="polkadot"
    />
  );
}
```

## Development

### Prerequisites

- Node.js >= 18.14
- Yarn 4.x (via corepack)

### Building

```bash
corepack enable
yarn install
yarn build
```

## Links

- Website: https://pezkuwichain.io
- Documentation: https://docs.pezkuwichain.io
- GitHub: https://github.com/pezkuwichain
- API Docs: https://js.pezkuwichain.app

## License

Apache-2.0

## Author

Dijital Kurdistan Tech Institute
