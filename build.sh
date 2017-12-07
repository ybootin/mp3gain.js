#!/bin/bash

trap "exit" INT

########## ENV VARS ##############

OUTPUT_PATH="dist/"
OUTPUT_FILENAME="mp3gain-bin.js"
MP3GAIN_PATH="$(pwd)/mp3gain"

# Docker env var (ybootin/mamejs-compiler:latest on dockerhub)
DOCKER_IMAGE_NAME="mamejs-compiler:latest"
DOCKER_IMAGE="ybootin/$DOCKER_IMAGE_NAME"

# emmake command inside the docker machine
EMMAKE_CMD="docker run --rm -v $MP3GAIN_PATH:/build -w /build $DOCKER_IMAGE /emsdk_portable/emscripten/master/emmake"

$EMMAKE_CMD make mp3gain OUTPUTNAME=$OUTPUT_FILENAME

cp "$MP3GAIN_PATH/$OUTPUT_FILENAME" "$OUTPUT_PATH"
type dist/worker.js > dist/mp3gain-worker.js
type dist/mp3gain-bin.js >> dist/mp3gain-worker.js

# finally, clean project
$EMMAKE_CMD make clean OUTPUTNAME=$OUTPUT_FILENAME
