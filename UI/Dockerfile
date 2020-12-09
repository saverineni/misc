 FROM artifactory.dataengineering.apps.hmrci:8000/nginx:1.12.2-alpine

COPY dist /usr/share/nginx/html
COPY nginx/conf.d/ /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/entrypoint.sh /entrypoint.sh

ARG VERSION
ARG IMAGE_NAME
ENV VERSION_ENV=$VERSION
COPY nginx/manage/ /usr/share/nginx/manage/
COPY nginx/templates/default.template /etc/nginx/default.template

RUN echo "{\"build\":{\"version\":\"$VERSION\",\"artifact\":\"$IMAGE_NAME\"}}" > /usr/share/nginx/manage/info.json

#RUN chown -R nginx:nginx /usr/share/nginx/manage
#RUN chown -R nginx:nginx /etc/nginx/conf.d
#RUN chown -R nginx:nginx /entrypoint.sh

#RUN touch /var/run/nginx.pid \
#    && chown -R nginx:nginx /var/run/nginx.pid

#USER nginx

# doesn't work on 443 if not running as root
EXPOSE 1443 8081

ENTRYPOINT ["/entrypoint.sh"]
