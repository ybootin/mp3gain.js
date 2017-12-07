#!/bin/bash

trap "exit" INT

########## ENV VARS ##############

OUTPUT_PATH="dist/"
OUTPUT_FILENAME="mp3gain-bin.js"
MP3GAIN_PATH="$(pwd)/mp3gain"

# Docker Emscripten compiler
DOCKER_IMAGE="apiaryio/emcc:latest"
EMMAKE_PATH="emmake"

# emmake command inside the docker machine
EMMAKE_CMD="docker run --rm -v $MP3GAIN_PATH:/build -w /build $DOCKER_IMAGE $EMMAKE_PATH"

$EMMAKE_CMD make mp3gain OUTPUTNAME=$OUTPUT_FILENAME

cp "$MP3GAIN_PATH/$OUTPUT_FILENAME" "$OUTPUT_PATH"
# type dist/worker.js > dist/mp3gain-worker.js
# type dist/mp3gain-bin.js >> dist/mp3gain-worker.js

# finally, clean project
$EMMAKE_CMD make clean OUTPUTNAME=$OUTPUT_FILENAME
