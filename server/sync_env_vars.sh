APP_NAME=fitted-fhysiques-server

while IFS='=' read -r key value; do
  if [ ! -z "$key" ]; then
    heroku config:set "$key=$value" -a "$APP_NAME"
  fi
done < .env