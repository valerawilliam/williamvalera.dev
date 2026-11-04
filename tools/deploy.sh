#!/bin/bash
# Publica williamvalera.dev en el hosting (detrás de Cloudflare).
# Sube SOLO los ficheros de tools/deploy-files.txt (lista blanca) y renueva ?v= para saltar la caché de Cloudflare.
#   bash tools/deploy.sh          → sube y comprueba
#   bash tools/deploy.sh --dry    → muestra qué subiría, sin subir nada
# La conexión (HOST, PORT, DEST) se lee de tools/deploy.env, que es privado y no está en el repositorio.
set -euo pipefail
cd "$(dirname "$0")/.."

ENV=tools/deploy.env
[[ -f "$ENV" ]] || { echo "Falta $ENV (HOST=usuario@servidor, PORT=22, DEST=ruta/)"; exit 1; }
# shellcheck disable=SC1090
source "$ENV"
: "${HOST:?}" "${PORT:?}" "${DEST:?}"
LIST=tools/deploy-files.txt

if [[ "${1:-}" == "--dry" ]]; then
  rsync -an --itemize-changes --files-from="$LIST" -e "ssh -o BatchMode=yes -p $PORT" ./ "$HOST:$DEST"
  exit 0
fi

# Versión de los assets: index.html y blackbox/index.html
V=$(date +%Y%m%d%H%M)
sed -i '' -E "s/\?v=[0-9]{12}/?v=$V/g" index.html blackbox/index.html

rsync -a --files-from="$LIST" -e "ssh -o BatchMode=yes -p $PORT" ./ "$HOST:$DEST"
echo "Publicado · v=$V"

# Comprobación en vivo
for u in "" blackbox/ cv/William-Valera-CV-ES.pdf .well-known/security.txt sitemap.xml; do
  curl -s -o /dev/null -w "%{http_code}  /$u\n" "https://williamvalera.dev/$u?check=$V"
done
curl -s "https://williamvalera.dev/?check=$V" | grep -q "site.js?v=$V" && echo "OK · la portada sirve v=$V" || echo "AVISO · la portada aún no sirve v=$V (caché)"
