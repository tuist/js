#!/usr/bin/env bash
#MISE description="Install the project dependencies"

pnpm install
mkdir -p native/ && cp $(which tuist) bin/
