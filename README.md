# misc
RUN \
  apk --no-cache update \
  && apk add --no-cache --upgrade apk-tools \
  && apk upgrade --no-cache --available \
  && apk add --no-cache --virtual .build-deps \
    gifsicle pngcrush optipng libjpeg-turbo-utils \
    udev ttf-freefont  \
  && rm -rf /var/cache/apk/* /tmp/*


RUN apk add --no-cache openjdk8 maven py-pip procps
RUN pip install --trusted-host pypi.python.org docker-compose

RUN mvn --version
