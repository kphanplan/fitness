APP_NAME=fitted-fhysiques-server

cd ..

while IFS='=' read -r key value; do
  if [ ! -z "$key" ]; then
    export "$key=$value"
    heroku config:set "$key=$value" -a "$APP_NAME"
  fi
done < .env