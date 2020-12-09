#!/bin/sh

set -e

envsubst '${DEPLOYMENT_ENVIRONMENT},${VERSION_ENV},${NAME_RESOLVER},${API_HOST}' < /etc/nginx/default.template > /etc/nginx/conf.d/default.conf 

exec nginx -g 'daemon off;'
