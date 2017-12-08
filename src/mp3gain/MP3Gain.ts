/// <reference path="./MP3GainWrapper.ts" />

/**
 * The all in one embed version of MP3gain
 * Binary and worker are substitue after build
 */

namespace mp3gain {
  const binary: string = '%MP3GAINBINARY%'
  const worker: string = '%MP3GAINWORKER%'

  export class MP3Gain extends MP3GainWrapper {
    constructor() {
      // no need to defined in constructor as are redefine on runAsWorker and runWithEmloader
      super('undefined')
    }

    public runAsWorker(args: Array<string>|string): Promise<emloader.IFile[]> {
      // include the worker code before append the binary code in order to init postMessage API
      this.binpath = 'data:text/javascript;base64,' + btoa(atob(worker) + atob(binary))

      return super.runAsWorker(args)
    }

    public runWithEmloader(args: Array<string>|string): Promise<emloader.IFile[]> {
      this.binpath = 'data:text/javascript;base64,' + binary

      return super.runAsWorker(args)
    }
  }

  export function getInstance(): MP3Gain {
    return new MP3Gain()
  }
}

