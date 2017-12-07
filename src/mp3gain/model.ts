/// <reference path="../../node_modules/emloader/src/emloader/model/IFile.ts" />

namespace mp3gain {
  export interface IPostmessageData {
    files: Array<emloader.IFile>,
    arguments: Array<string>
  }

  export interface IMessageEvent {
    data: IPostmessageData
  }

  export interface IPostMessageResponse extends MessageEvent {
    data: any //emloader.IFile[]|{stderr: string}|{stdout: string}
  }

  export interface IModule {
    arguments: Array<string>
    screenIsReadOnly: boolean
    print: Function
    printErr: Function
    canvas: any
    noInitialRun: boolean
    preInit?: Function
    callMain?: {(arguments: Array<string>): void}
    addOnExit?: Function
    requestAnimationFrame?: any
    locateFile?: {(file: string): string}
  }
}
