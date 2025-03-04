#!/usr/bin/env bash
#MISE description="Install the project dependencies"

set -eo pipefail

pnpm install
mkdir -p bin/ && cp $(which tuist) bin/
