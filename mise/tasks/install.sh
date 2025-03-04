#!/usr/bin/env bash
#MISE description="Install the project dependencies"

pnpm install
mkdir -p bin/ && cp $(which tuist) bin/
