#!/bin/bash

DIR=$(cd `dirname $0` && pwd)

args="sh"

if [ $# -eq 1 ]
  then
    args=$1
fi

docker run \
  -v $DIR:/home/builder \
  --network=host \
  -it \
  --rm \
  artifactory.dataengineering.apps.hmrci:8001/cdsdar/angular-cli:1.7.4_6 sh -c "$args"
