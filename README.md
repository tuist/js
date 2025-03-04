# Tuist JS

[![Tuist](https://github.com/tuist/js/actions/workflows/tuist.yml/badge.svg)](https://github.com/tuist/js/actions/workflows/tuist.yml)

This repository contains an NPM package with a two-fold goal:

1. Allow technologies (e.g. React Native) that use JavaScript packages such as NPM to resolve Tuist through them.
2. Extend or configure the native CLI to work with technologies like React Native.

## Development

### Setup

1. Clone the repository: `git clone git@github.com:tuist/js.git`.
2. Install dependencies: `mise install`.


## Releasing

The versioning scheme of this package aligns with the versioning of the [CLI](https://github.com/tuist/tuist).
A background process periodically checks if there's a new version of the CLI, and if there is, it creates a new release pushing it to the NPM registry.
