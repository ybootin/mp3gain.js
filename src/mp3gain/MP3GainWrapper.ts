/// <reference path="../../node_modules/emloader/src/emloader/Emloader.ts" />
/// <reference path="../../typings/index.d.ts" />
/// <reference path="./model.ts" />

interface Window {
  Worker: any
}
declare var window: Window

namespace mp3gain {
  export const ON_STDERROR: string =  'onstderror'
  export const ON_STDOUT: string = 'onstdout'
  export const ON_PROGRESS: string = 'onprogress'

  export const ANALYSING: string = 'analysing'
  export const PROCESSING: string = 'processing'
  export const ERROR: string = 'error'
  export const WARNING: string = 'warning'

  /**
   * MP3 path inside emscripten FS
   */
  export const mp3Path: string = '/mp3'

	export class MP3GainWrapper extends emloader.event.EventEmiter {
    /**
     * Holds files to process on run, not mutable
     */
    private files: Array<emloader.IFile> = []

    /**
     * @param binpath specify the mp3gain js compiled file to use
     */
		constructor(protected binpath: string) {
      super()
    }

    /**
     * add an IFile or an mp3 as url into mp3gain
     * @param fileOrUrl an IFile object or a valid MP3 url accessible with CORS
     */
		public addFile(fileOrUrl: emloader.IFile|string): Promise<emloader.IFile> {
      if (typeof fileOrUrl === 'string') {
        return emloader.helper.FileLoader.loadFile(fileOrUrl, fileOrUrl.split('/').reverse()[0]).then((file) => {
          this.files.push(file)
          return file
        })
      } else {
        this.files.push(fileOrUrl)
        return Promise.resolve(fileOrUrl)
      }
    }

    /**
     * add multiple IFile or an mp3 as url into mp3gain
     */
		public addFiles(filesOrUrls: Array<emloader.IFile|string>): Promise<emloader.IFile[]> {
			return Promise.all(filesOrUrls.map((file) => this.addFile(file)))
    }

    /**
     * remove file from mp3gain.
     */
    public removeFile(file: emloader.IFile): boolean {
      const index = this.files.indexOf(file)
      if (index > -1) {
        this.files.splice(index, 1)
        return true
      }

      return false
    }

    /**
     * remove files from mp3gain.
     */
    public removeFiles(): Array<emloader.IFile> {
      return this.files.splice(0, this.files.length)
    }

    /**
     * retrieve all the added files
     */
    public getFiles(): Array<emloader.IFile> {
      return this.files
    }

    /**
     * run the normalization, and return the processed files
     */
    public run(args: Array<string>|string): Promise<emloader.IFile[]> {
      if (window.Worker) {
        return this.runAsWorker(args)
      } else {
        return this.runWithEmloader(args)
      }
    }

		public runWithEmloader(args: Array<string>|string): Promise<emloader.IFile[]> {
      return emloader.loadHeadless(this.binpath).then((loader) => {
        const safeArgs = Array.isArray(args) ? args : args.trim().split(' ')

        loader.FS.mkdir(mp3Path)

        this.files.forEach((file) => {
          loader.addFile(file, mp3Path)
          safeArgs.push(mp3Path + '/' + file.name)
        })

        loader.on(emloader.Emloader.ON_STDOUT, (output: string) => {
          this.emit(ON_STDOUT, output)
        })
        loader.on(emloader.Emloader.ON_STDERROR, (error: string) => {
          this.emit(ON_STDERROR, error)
        })

        return loader.run(safeArgs).then(() => {
          return loader.FS.readdir(mp3Path).filter((filename) => {
            return !!this.files.find((file) => file.name === filename)
          }).map((filename): emloader.IFile => {
            return {
              name: filename,
              data: loader.FS.readFile(mp3Path + '/' + filename, {
                encoding: 'binary',
              }),
            }
          })
        })
      })
    }

    public runAsWorker(args: Array<string>|string): Promise<emloader.IFile[]> {
      return new Promise((resolve, reject) => {
        // clone array to avoid mutations during run
        const files = Array.from(this.files)

        const arrayArgs = typeof args === 'string' ? args.trim().split(' ') : args
        const stringArgs = Array.isArray(args) ? args : args.split(' ')

        // holds files during processing
        const analysed: Array<emloader.IFile> = []
        const processed: Array<emloader.IFile> = []

        const parseStd = (msg: string, error: boolean): void => {
          const applyed = files.filter((file) => {
            return msg.indexOf(file.name) > -1
          }).map((file) => {
            // the first message containing a filename is always analysis, except if disable
            // -g or -l arg disable analysis
            if (!error && analysed.indexOf(file) === -1 && ['-g', '-l'].filter((arg) => arrayArgs.indexOf(arg) === -1).length === 2) {
              analysed.push(file)
              this.emit(ANALYSING, file)
            }
            // the second message containing a filename is the processing, except if disabled
            // -s s arg disable processing
            else if (!error && processed.indexOf(file) === -1 && stringArgs.indexOf('-s s') === -1) {
              processed.push(file)
              this.emit(PROCESSING, file)
            }
            // file error parsing
            else if (error) {
              this.emit(ERROR, {
                message: msg,
                file: file
              })
            }
          })

          // other sterr parsing
          if (applyed.length === 0 && error) {
            const skip: boolean = ['-h', '-v'].filter((arg) => arrayArgs.indexOf(arg) === -1).length === 2
            if (msg.indexOf('WARNING') > -1) {
              this.emit(WARNING, msg)
            }
            // avoid error on -h -v args
            else if (!skip || (processed.length === files.length || analysed.length === files.length)) {
              // @TODO handle others errors
            }
          }
        }

        const worker = new Worker(this.binpath)
        worker.onmessage = (evt: IPostMessageResponse) => {
          if (Array.isArray(evt.data)) {
            worker.terminate()
            resolve(evt.data)
          } else {
            const msg = evt.data.stderr || evt.data.stdout
            const evtName = evt.data.stderr ? ON_STDERROR : ON_STDOUT
            this.emit(evtName, msg)
            parseStd(msg, evtName === ON_STDERROR)
          }
        }

        worker.postMessage({
          files: files,
          arguments: arrayArgs,
        })
      })
    }
  }
}
