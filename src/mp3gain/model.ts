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
}
