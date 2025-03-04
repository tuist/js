#!/usr/bin/env bash
#MISE description="Test the project"

set -eo pipefail

node --test "src/**/*.test.js"
