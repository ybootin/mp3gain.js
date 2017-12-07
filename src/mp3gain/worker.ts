/// <reference path="../../node_modules/typescript/lib/lib.es5.d.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.webworker.d.ts" />
/// <reference path="../../node_modules/emloader/src/emloader/model/FS.ts" />
/// <reference path="./model.ts" />

const mp3path = '/mp3'
const prefix = 'MP3GAIN - Webworker : '

const Module  = <mp3gain.IModule><any>{
  noInitialRun: true,
  print: (stdout: string): void => {
    postMessage({stdout: stdout})
  },
  printErr: (err: string): void => {
    postMessage({stderr: err})
  }
}

function writeFile(filename, data): string {
  const path = mp3path + '/' + filename
  FS.writeFile(path, data, {
    encoding: 'binary'
  })

  return path
}

function readFile(filename): Uint8Array {
  return FS.readFile(mp3path + '/' + filename, {
    encoding: 'binary',
  })
}

function runWithArgs(args: Array<string>): void {
  Module.callMain(args)
}

function response(files: Array<emloader.IFile>) {
  postMessage(files.map((file) => {
    return {
      name: file.name,
      data: readFile(file.name),
    }
  }))
}

onmessage = (evt: mp3gain.IMessageEvent) => {
  const args = evt.data.arguments

  // write files into FS and update arguments
  FS.mkdir(mp3path)
  evt.data.files.forEach((file) => {
    args.push(writeFile(file.name, file.data))
  })

  // exec binary
  runWithArgs(args)

  // send response
  response(evt.data.files)
}

