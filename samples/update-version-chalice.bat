call sed -i "s/\"APP_VERSION\": \"(\d+).(\d+).(\d+)\"/\"APP_VERSION\": \"$1.$2.${$3+1}\"/" .chalice\config.json
call sed -i "s/\"DEPLOYED_AT\": \".*\"/\"DEPLOYED_AT\": \"${utcnow}\"/" .chalice\config.json
