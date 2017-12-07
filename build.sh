#!/bin/bash

trap "exit" INT

########## ENV VARS ##############

OUTPUT_PATH="dist/"
OUTPUT_BINARY_FILENAME="mp3gain-bin.js"
OUTPUT_WORKER_FILENAME="mp3gain-worker.js"
MP3GAIN_PATH="$(pwd)/mp3gain"

# Docker Emscripten compiler
DOCKER_IMAGE="apiaryio/emcc:latest"
EMMAKE_PATH="emmake"

# emmake command inside the docker machine
EMMAKE_CMD="docker run --rm -v $MP3GAIN_PATH:/build -w /build $DOCKER_IMAGE $EMMAKE_PATH"

# build as a binary
$EMMAKE_CMD make mp3gain OUTPUTNAME=$OUTPUT_BINARY_FILENAME TARGETOPTIONS="-O3 --memory-init-file 0 -s BUILD_AS_WORKER=0"
cp "$MP3GAIN_PATH/$OUTPUT_BINARY_FILENAME" "$OUTPUT_PATH"
$EMMAKE_CMD make clean OUTPUTNAME=$OUTPUT_BINARY_FILENAME

# build as a worker
cp dist/worker.js "$MP3GAIN_PATH"
$EMMAKE_CMD make mp3gain OUTPUTNAME=$OUTPUT_WORKER_FILENAME TARGETOPTIONS="-O3 --memory-init-file 0 -s BUILD_AS_WORKER=1 --pre-js worker.js"
cp "$MP3GAIN_PATH/$OUTPUT_WORKER_FILENAME" "$OUTPUT_PATH"
$EMMAKE_CMD make clean OUTPUTNAME=$OUTPUT_WORKER_FILENAME
rm -f "$MP3GAIN_PATH/worker.js"


