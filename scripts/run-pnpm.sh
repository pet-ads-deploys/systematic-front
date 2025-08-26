#!/usr/bin/env bash
set -e

colorize_output() {
  while IFS= read -r line; do
    case "$line" in
      *[Ee]rror*)   echo -e "\033[31mERROR:\033[0m $line" ;;
      *[Ww]arning*) echo -e "\033[33mWARNING:\033[0m $line" ;;
      *)            echo "$line" ;;
    esac
  done
}

if [ ! -d "node_modules" ]; then
  echo -e "\033[34m==> Installing dependencies with pnpm...\033[0m"
  pnpm install 2>&1 | colorize_output
fi

echo -e "\033[34m==> Initializing build...\033[0m"
pnpm build 2>&1 | colorize_output
echo -e "\033[32mBuild complete!\033[0m\n"

echo -e "\033[34m==> Running development server (pnpm dev)...\033[0m"
pnpm dev 2>&1 | colorize_output
