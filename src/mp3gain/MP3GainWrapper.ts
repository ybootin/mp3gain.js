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

	export class MP3GainWrapper extends emloader.event.EventEmiter {
    /**
     * Holds files to process on run
     */
    private files: Array<emloader.IFile> = []

    /**
     * MP3 path inside emscripten FS
     */
    private mp3Path: string = '/mp3'

		constructor(protected binpath: string) {
      super()
    }

		public addFile(file: emloader.IFile): void {
			this.files.push(file)
		}

		public addFiles(files: Array<emloader.IFile>): void {
			files.forEach((file) => this.addFile(file))
    }

    public removeFile(file: emloader.IFile): void {
      const index = this.files.indexOf(file)
      if (index > -1) {
        this.files.splice(index, 1)
      }
    }

    public removeFiles() {
      this.files.forEach((file) => {
        this.removeFile(file)
      })
    }

    public getOriginalFiles(): Array<emloader.IFile> {
      return this.files
    }

		public loadFile(name, url): Promise<emloader.IFile> {
			return emloader.helper.FileLoader.loadFile(url, name).then((file) => {
        this.files.push(file)

        return file
      })
    }

    public loadFiles(files: Array<string>): Promise<emloader.IFile[]> {
      return Promise.all(files.map((file) => {
        return this.loadFile(file.split('/').reverse()[0], file)
      }))
    }

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

        loader.FS.mkdir(this.mp3Path)

        this.files.forEach((file) => {
          loader.addFile(file, this.mp3Path)
          safeArgs.push(this.mp3Path + '/' + file.name)
        })

        loader.on(emloader.Emloader.ON_STDOUT, (output: string) => {
          this.emit(ON_STDOUT, output)
        })
        loader.on(emloader.Emloader.ON_STDERROR, (error: string) => {
          this.emit(ON_STDERROR, error)
        })

        return loader.run(safeArgs).then(() => {
          return loader.FS.readdir(this.mp3Path).filter((filename) => {
            return !!this.files.find((file) => file.name === filename)
          }).map((filename): emloader.IFile => {
            return {
              name: filename,
              data: loader.FS.readFile(this.mp3Path + '/' + filename, {
                encoding: 'binary',
              }),
            }
          })
        })
      })
    }

    public runAsWorker(args: Array<string>|string): Promise<emloader.IFile[]> {
      return new Promise((resolve, reject) => {
        const worker = new Worker(this.binpath)

        worker.onmessage = (evt: IPostMessageResponse) => {
          if (Array.isArray(evt.data)) {
            worker.terminate()
            resolve(evt.data)
          } else {
            this.emit(evt.data.stderr ? ON_STDERROR : ON_STDOUT, evt.data.stderr || evt.data.stdout)
          }
        }

        worker.postMessage({
          binpath: this.binpath,
          files: this.files,
          arguments: typeof args === 'string' ? args.trim().split(' ') : args,
        })
      })
    }
  }
}
