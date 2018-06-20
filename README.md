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


<dependencies>
        <dependency>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-all</artifactId>
            <version>2.4.12</version>
        </dependency>
        <dependency>
            <groupId>org.spockframework</groupId>
            <artifactId>spock-core</artifactId>
            <version>1.1-groovy-2.4</version>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.codehaus.groovy</groupId>
                    <artifactId>groovy-all</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.gebish</groupId>
            <artifactId>geb-spock</artifactId>
            <version>1.1.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-firefox-driver</artifactId>
            <version>3.7.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-chrome-driver</artifactId>
            <version>3.7.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-support</artifactId>
            <version>3.7.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>3.7.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>commons-lang</groupId>
            <artifactId>commons-lang</artifactId>
            <version>2.6</version>
        </dependency>
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>3.7.0</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.3</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.24</version>
        </dependency>
        <dependency>
            <groupId>com.codeborne</groupId>
            <artifactId>phantomjsdriver</artifactId>
            <version>1.4.0</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.athaydes</groupId>
            <artifactId>spock-reports</artifactId>
            <version>1.3.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
