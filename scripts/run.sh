#!/usr/bin/env bash

colorize_output() {
  while IFS= read -r line; do
    if echo "$line" | grep -qi "error"; then
      echo -e "\033[31mERROR:\033[0m $line"
    elif echo "$line" | grep -qi "warning"; then
      echo -e "\033[33mWARNING:\033[0m $line"
    else
      echo "$line"
    fi
  done
}

echo -e "\033[34m==> Iniciando build do Next.js...\033[0m"

npm run build 2>&1 | colorize_output

if [ "${PIPESTATUS[0]}" -ne 0 ]; then
  echo -e "\033[31mBuild falhou. Abortando.\033[0m"
  exit 1
fi

echo -e "\033[32mBuild concluído com sucesso!\033[0m"
echo ""

echo -e "\033[34m==> Iniciando o servidor (yarn dev)...\033[0m"

yarn dev 2>&1 | colorize_output
