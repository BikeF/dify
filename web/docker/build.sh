#!/bin/bash
set -e

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DBUILD_CONTEXT="${DIR}/.."
echo ${DIR}
echo ${DBUILD_CONTEXT}

source ${DIR}/build.env

cmd="rm -rf ../.next/ && yarn build"
eval ${cmd}

cmd="docker build -f Dockerfile -t ${IMAGE_NAME} ${DBUILD_CONTEXT}"
echo ${cmd}
eval ${cmd}

cmd="docker push ${IMAGE_NAME}"
eval ${cmd}

echo ${IMAGE_NAME}