# Tuist for JavaScript

> [!WARNING]
> This project is a work in progress and is not yet ready for production use.

An extension of the [Tuist](https://tuist.io) toolchain to integrate it into JavaScript-based mobile development stacks like React Native.

## Overview

This package provides a Node.js CLI wrapper for Tuist, enabling seamless integration with JavaScript-based mobile development workflows. It automatically downloads and manages the Tuist binary, storing it in an XDG-compliant directory.

## Installation

```bash
npm install tuist
```

## Usage

Once installed, you can use the `tuist` command directly:

```bash
npx tuist init
npx tuist build
npx tuist version
```

The CLI will automatically download and install the appropriate Tuist binary on first use.

## Development

### Prerequisites

- Node.js 18 or later
- [mise](https://mise.jdx.dev/) (optional, for managing Node version)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/tuist/js.git
   cd js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Install Node using mise:
   ```bash
   mise install
   ```

### Running Tests

```bash
npm test
```

The test suite includes both unit tests and integration tests that verify the installation and execution of Tuist.

### Project Structure

```
.
├── bin/           # Executable entry point
├── src/           # Source code
│   ├── installer.js  # Installation logic
│   └── paths.js      # XDG path utilities
└── test/          # Test files
    ├── installer.test.js
    └── paths.test.js
```

## How It Works

1. When you run the `tuist` command, the CLI checks if Tuist is already installed in the XDG data directory (`~/.local/share/tuist` by default)
2. If not installed, it downloads the specified version from GitHub releases
3. The binary is extracted and made executable
4. All subsequent commands are proxied to the installed Tuist binary

## License

MIT
