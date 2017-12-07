/// <reference path="../../node_modules/emloader/dist/emloader.d.ts" />
/// <reference path="./model.ts" />

const mp3path = '/mp3'

const Module  = <emloader.IModule><any>{
  noInitialRun: true,
  print: (text: string): void => postMessage({stdout: text}, '*'),
  printErr: (err: string): void => postMessage({stderr: err}, '*')
}

function writeFile(filename, data) {
  FS.writeFile(filename, data, {
    encoding: 'binary'
  })
}

function run(args: Array<string>|string, files: Array<emloader.IFile>): void {
  const safeArgs = Array.isArray(args) ? args : args.trim().split(' ')
  files.forEach((file) => {
    safeArgs.push(mp3path + '/' + file.name)
  })
  Module.callMain(safeArgs)
}

function response(files: Array<emloader.IFile>) {
  postMessage(files.map((file) => {
    return {
      name: file.name,
      data: FS.readFile(mp3path + '/' + file.name, {
        encoding: 'binary',
      })
    }
  }), '*')
}

onmessage = (evt: mp3gain.IMessageEvent) => {
  // write files into FS
  FS.mkdir(mp3path)
  evt.data.files.forEach((file) => {
    writeFile(mp3path + '/' + file.name, file.data)
  })

  // exec binary
  run(evt.data.arguments, evt.data.files)

  // send response
  response(evt.data.files)
}

