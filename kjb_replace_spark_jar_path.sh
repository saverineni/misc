#!/bin/bash

ENVIRONMENT="$CDS_DATA_ENVIRONMENT"
SPARK_JAR_PATH=""

if [ -z "$ENVIRONMENT" ];
then
    echo " ENVIRONMENT variable 'CDS_DATA_ENVIRONMENT' not set"
else
    APPLICATION_VERSION=$(grep -m1 '<version>' pom.xml | cut -c11- | rev | cut -d"<" -f2  | rev)

    if [ "$ENVIRONMENT" == "local" ]; then
      SPARK_JAR_PATH="file\&#x3a;\&#x2f;\&#x2f;\&#x2f;home\&#x2f;osboxes\&#x2f;cds-workspace\&#x2f;datavault-hash-calculator\&#x2f;target\&#x2f;datavault-hash-calculator-"${APPLICATION_VERSION}
    elif [ "$ENVIRONMENT" == "dev" ]; then
      SPARK_JAR_PATH="\&#x2f;data\&#x2f;apps\&#x2f;cdsdata\&#x2f;pentaho-scripts\&#x2f;dev\&#x2f;datavault-hash-calculator\&#x2f;datavault-hash-calculator-"${APPLICATION_VERSION}
    elif [ "$ENVIRONMENT" == "qa" ]; then
      SPARK_JAR_PATH="\&#x2f;data\&#x2f;apps\&#x2f;cdsdata\&#x2f;pentaho-scripts\&#x2f;qa\&#x2f;datavault-hash-calculator\&#x2f;datavault-hash-calculator-"${APPLICATION_VERSION}
    elif [ "$ENVIRONMENT" == "pre_prod" ]; then
      SPARK_JAR_PATH="\&#x2f;opt\&#x2f;hmrc\&#x2f;dec\&#x2f;epc\&#x2f;exp\&#x2f;alpha\&#x2f;exp_cds\&#x2f;etl\&#x2f;datavault-hash-calculator-"${APPLICATION_VERSION}
    elif [ "$ENVIRONMENT" == "prod" ]; then
      SPARK_JAR_PATH="\&#x2f;opt\&#x2f;hmrc\&#x2f;capgemini\&#x2f;epc\&#x2f;exp\&#x2f;beta\&#x2f;exp_cds\&#x2f;etl\&#x2f;datavault-hash-calculator-"${APPLICATION_VERSION}
    fi


    echo "Environment : $ENVIRONMENT"
    echo "Application version : $APPLICATION_VERSION"
    echo "Spark jar file path : $SPARK_JAR_PATH"

    touch MAIN_populate_Landing_Hashes.bak.xml

    sed -e "s@REPLACEABLE_SPARK_JAR_PATH@${SPARK_JAR_PATH}@g" <"MAIN_populate_Landing_Hashes.xml" >> "MAIN_populate_Landing_Hashes.bak.xml"

    mv MAIN_populate_Landing_Hashes.bak.xml MAIN_populate_Landing_Hashes.xml

fi